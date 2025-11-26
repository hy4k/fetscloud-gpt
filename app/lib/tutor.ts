import OpenAI from "openai";
import { getContextFromRAG } from "./rag";

const apiKey = process.env.OPENAI_API_KEY || "dummy-key";
const client = new OpenAI({ apiKey });

export async function runCmaTutor(question: string) {
    const context = await getContextFromRAG(question);

    const prompt = `
You are **FETS CMA TUTOR**, a world-class CMA exam specialist.

Use the following CMA knowledge:
${context}

Now answer the student's question:
${question}

Your response MUST include:
1. **Final Answer** (first line only)
2. **Step-by-step CMA reasoning**
3. **Formula(s) used**
4. **Numerical example (if applicable)**
5. **CMA Exam Tip** (very short)
`;

    const completion = await client.chat.completions.create({
        model: "ft:gpt-4o-mini:FETS-CMA-v1", // Your fine-tuned model
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
    });

    return completion.choices[0].message.content;
}
