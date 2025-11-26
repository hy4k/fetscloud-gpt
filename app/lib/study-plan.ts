import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY || "dummy-key";
const client = new OpenAI({ apiKey });

export async function generateStudyPlan(performance: any) {
    const prompt = `
You are FETS CMA Tutor AI.

Create a personalized CMA study plan based on this student performance:

${JSON.stringify(performance, null, 2)}

Include:
- Weak areas
- Strength areas
- Daily tasks
- Weekly tasks
- Suggested MCQs count
- Concepts to revisit
- Formulas to revise
- Real exam strategy advice
`;

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
    });

    return response.choices[0].message.content;
}
