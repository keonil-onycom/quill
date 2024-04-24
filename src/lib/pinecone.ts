import { Pinecone } from "@pinecone-database/pinecone";

export const getPineconeClient = async () => {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  await pc.createIndex({
    name: "quill",
    dimension: 1536,
    metric: "cosine",
    spec: {
      serverless: {
        cloud: "aws",
        region: "us-east-1",
      },
    },
  });
  return pc;
};
