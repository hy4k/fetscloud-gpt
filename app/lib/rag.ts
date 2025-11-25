import { supabase } from "./supabase";
import { generateEmbedding } from "./embeddings";

export async function getContextFromRAG(query: string, topK = 5) {
    const embedding = await generateEmbedding(query);

    const { data, error } = await supabase.rpc("match_cma_vectors", {
        query_embedding: embedding,
        match_count: topK
    });

    if (error) {
        console.error("RAG ERROR:", error);
        return "";
    }

    return data.map((x: any) => x.content).join("\n\n---\n\n");
}
