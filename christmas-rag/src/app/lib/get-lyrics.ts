import {
  ElasticVectorSearch,
  type ElasticClientArgs,
} from "@langchain/community/vectorstores/elasticsearch";

import { Ollama, OllamaEmbeddings } from "@langchain/ollama";
import {
  ChatPromptTemplate
} from "@langchain/core/prompts";

import { Client, type ClientOptions } from "@elastic/elasticsearch";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Initialize Ollama embeddings for the query
const ollamaEmbeddings = new OllamaEmbeddings({
  model: "mxbai-embed-large", // Default value
  //baseUrl: "http://localhost:11434", // Default value
});

// Initialize Langchain and Elasticsearch
const config: ClientOptions = {
  node: process.env.ELASTIC_DEPLOYMENT,
};

if (process.env.ELASTIC_API_KEY) {
  config.auth = {
    apiKey: process.env.ELASTIC_API_KEY,
  };
}

const clientArgs: ElasticClientArgs = {
  client: new Client(config),
  indexName: process.env.INDEX_NAME,
  vectorSearchOptions: {
    engine: "hnsw",
    similarity: "cosine", //Default cosine
  },
};

const vectorStore = new ElasticVectorSearch(ollamaEmbeddings, clientArgs);

// Initialise LLM and prompt
const template = `You are a Christmas song generator that takes user input and generates a song in the style of the provided song. 
      Check your knowledge base before generating any songs.

      If no relevant information is found in the context, respond, "Merry Christmas, everyone!"

      Ensure that the following criteria is included in the song:

      <userCriteria>
      {userCriteria}
      </userCriteria>
      
      Please use the below context in your answer:
      <context>
      {context}
      </context>
      
      Please only return the generated song lyrics.`;

const prompt = ChatPromptTemplate.fromTemplate(template);

const llm = new Ollama({
  model: "llama3", // Default: "llama3",
  temperature: 0,
  maxRetries: 3,
});

/**
 * Example search function to find relevant lyrics
 * @param text: prompt to be used for similarity search
 * @returns
 */
export async function getLyricsFromUserPrompt(
  userPrompt: string
): Promise<ReadableStream> {
  const promptParts = userPrompt.split("Use the provided lyrics from the song");
  const userCriteria = promptParts[0];
  const songTitle = promptParts[1];
  
  const retriever = vectorStore.asRetriever(3);
  const context = await retriever.invoke(songTitle);

  const customRagChain = await createStuffDocumentsChain({
    llm: llm,
    prompt: prompt,
    outputParser: new StringOutputParser(),
  });

  const stream = await customRagChain.stream({
    question: userPrompt,
    userCriteria,
    context
  });

  return stream;
}
