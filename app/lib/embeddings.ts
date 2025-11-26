import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY || "dummy-key";
const client = new OpenAI({ apiKey });

export async function generateEmbedding(text: string) {
    const response = await client.embeddings.create({
        model: "text-embedding-3-large",
        input: text
    });

    return response.data[0].embedding;
}
