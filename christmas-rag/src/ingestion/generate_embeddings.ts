import {
  ElasticVectorSearch,
  type ElasticClientArgs,
} from "@langchain/community/vectorstores/elasticsearch";

import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { Document } from "@langchain/core/documents";
import {
  RecursiveCharacterTextSplitter,
  TextSplitter,
} from "langchain/text_splitter";

import { OllamaEmbeddings } from "@langchain/ollama";

import { Client, type ClientOptions } from "@elastic/elasticsearch";

import { lyricsUrls } from "@/ingestion/lyrics-urls";

// Initialize Ollama embeddings
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
    similarity: "cosine",
  },
};

const vectorStore = new ElasticVectorSearch(ollamaEmbeddings, clientArgs);

/**
 * Generate collection of documents from specified JSON file
 * @param pathToJSON file containing movies
 * @returns array of documents
 */
async function generateDocuments(): Promise<Document[]> {
  try {
    let documents: Document[] = [];
    for (const page of lyricsUrls) {
      const loaderWithSelector = new CheerioWebBaseLoader(page.url, {
        selector: ".lyrics-txt > span",
      });

      const docsWithSelector = await loaderWithSelector.load();
      const content = docsWithSelector[0].pageContent;

      // Split text based on overview
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 0,
      });

      const splitDocs: Document[] = await splitContentByOverview(
        textSplitter,
        content,
        page.url,
        page.title
      );
      documents = documents.concat(splitDocs);
    }

    return documents;
  } catch (e) {
    console.log(e);
    return [];
  }
}

/**
 * Chunk content into smaller documents based on overview
 * @param textSplitter
 * @param content
 * @returns Document[] based on split document
 */
async function splitContentByOverview(
  textSplitter: TextSplitter,
  content: string,
  url: string,
  title: string
) {
  const splits = await textSplitter.splitText(content);
  console.log(`Split doc count: ${splits.length}`);

  const splitDocs: Document[] = splits.map((split, index) => {
    return new Document({
      pageContent: split,
      metadata: {
        url: url,
        title: title,
        chunk: index
      },
    });
  });
  return splitDocs;
}

// Ingest document with embedding
async function generateEmbeddings(documents: Document[]): Promise<string[]> {
  try {
    return await vectorStore.addDocuments(documents);
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function main() {
  // Clean up index if it exists
  vectorStore.deleteIfExists();

  // Load data from JSON
  const documents = await generateDocuments();

  // Ingest documents and generate embeddings
  const ids = await generateEmbeddings(documents);
  console.log(`Ingested ${ids.length} documents with embeddings`);
}

main();
