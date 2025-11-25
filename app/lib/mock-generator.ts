import fs from "fs";
import path from "path";

export function createMockExam() {
    const file = path.join(process.cwd(), "public/data/fets_cma_dataset.jsonl");

    const lines = fs.readFileSync(file, "utf-8").trim().split("\n");
    const parsed = lines.map((l) => JSON.parse(l));

    const mcqs = parsed.filter((q) => q.type === "MCQ");

    const shuffled = mcqs.sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 100); // 100 MCQs like actual CMA
}
