# Elasticsearch Ollama Christmas Song Generator

## Overview

This project contains an example Christmas Song generator leveraging Elasticsearch and LangChain with the OpenAI LLM. This sample is adapted from the [24th December entry of the 2023 Elastic Advent Calendar](https://discuss.elastic.co/t/dec-24th-2023-en-generating-the-ultimate-christmas-song-with-elasticsearch-and-llms/347313), combined with learning from the [Grounding AI Applications with React, JavaScript, Langchain and Elasticsearch workshop](https://github.com/carlyrichmond/grounding-rag-applications-workshop) presented at React Day Berlin 2024.

![Elastic Christmas Song Generator](./public/images/christmas-song-generator-screenshot.png)

## Architecture

As shown in the below diagram, this is a simple 3-tier web application:

![Elastic Christmas Song Generator Architecture](./public/images/song-generator-architecture.png)

It comprises of: 

1. A simple Next.js UI leveraging Langchain, Ollama and AI SDK. 
2. Typescript ingestion script managing the ingestion of Christmas songs.
3. Elasticsearch data store, containing song lyrics from [http://www.christmassongs.net/song-lyrics](http://www.christmassongs.net/song-lyrics).

## How to run

### Prerequisites

Please ensure you have the following tools installed:

1. [Node.js](https://nodejs.org/en)
2. [npm](https://www.npmjs.com/)
3. [tsx](https://www.npmjs.com/package/tsx)
4. [Ollama](https://ollama.com/)
 
To check you have Node.js and npm installed, run the following commands:

```bash
node -v
npm -v
```

If you don't have tsx and ollama installed please make sure you have a global install configured by running the below commands:

```zsh
npm install -g tsx
brew install ollama
```

To help you get started, a very simple web application is included in this repository under the `christmas-rag` folder. To initialize the application, please follow the below commands in a terminal to start the application. 

```bash
cd christmas-rag
npm install
npm run start
```

Your local .env file (or shell environment variables) requires configuration that looks a bit like this:

```zsh
ELASTIC_DEPLOYMENT=https://my-random-elastic-deployment:123
ELASTIC_API_KEY=ARandomKey!
INDEX_NAME="movies"
```

### Running

The application, accessible at `http://localhost:3000/`, can be started using the below command:

```bash
cd christmas-rag
npm install
npm run start
```

## Sources

Llama image credit: https://pixels.com/featured/funny-llama-with-santa-hat-cute-christmas-hat-llama-eq-designs.html?product=greeting-card

## Resources

Check out the relevant resources used in this project:

1. [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) and the [Elasticsearch JavaScript client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)
2. [Langchain JS](https://js.langchain.com/docs/introduction/)
3. [Ollama](https://ollama.com/)
4. [AI by Vercel SDK, including the UI SDK](https://sdk.vercel.ai/)
5. [React](https://react.dev/), specifically [Next.js](https://nextjs.org/)
