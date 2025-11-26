export function analyzePerformance(answers: any, questions: any[]) {
    const sections: any = {};

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const studentAns = answers[q.id];

        const section = q.section || "Unknown";

        if (!sections[section]) {
            sections[section] = { correct: 0, wrong: 0, total: 0 };
        }

        sections[section].total++;

        if (studentAns === q.correct_answer) {
            sections[section].correct++;
        } else {
            sections[section].wrong++;
        }
    }

    return sections;
}
