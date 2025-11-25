[
    {
        role: "user",
        content: `You are FETS CMA Tutor. Provide structured explanation:

Final Answer:
Steps:
Formula:
Example:
Exam Tip:

${prompt}`
    }
]

import { NextResponse } from "next/server";
import { runCmaTutor } from "@/app/lib/tutor";

export async function POST(req: Request) {
    try {
        const { question } = await req.json();

        if (!question) {
            return NextResponse.json(
                { error: "Missing 'question' in request body" },
                { status: 400 }
            );
        }

        const answer = await runCmaTutor(question);

        return NextResponse.json({
            ok: true,
            question,
            answer
        });
    } catch (err: any) {
        return NextResponse.json(
            { ok: false, error: err.message ?? "Unknown error" },
            { status: 500 }
        );
    }
}
