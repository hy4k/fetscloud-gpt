import { NextResponse } from "next/server";
import { analyzePerformance } from "@/app/lib/adaptive-engine";
import { generateStudyPlan } from "@/app/lib/study-plan";

export async function GET() {
    // Example mock data — replace with actual saved results
    const mockQuestions = [
        { id: 1, section: "A. External Financial Reporting Decisions", correct_answer: "A" },
        { id: 2, section: "D. Cost Management", correct_answer: "C" },
        { id: 3, section: "D. Cost Management", correct_answer: "A" },
    ];

    const mockAnswers = {
        1: "B",
        2: "C",
        3: "B",
    };

    const sections = analyzePerformance(mockAnswers, mockQuestions);

    const studyPlan = await generateStudyPlan(sections);

    return NextResponse.json({
        sections,
        studyPlan,
    });
}
