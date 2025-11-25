export default function ExamResult() {
    const score = 73; // example
    const weakAreas = ["Cost Management", "Risk Analysis"];
    const strengths = ["Budgeting", "Corporate Finance"];

    return (
        <div className="min-h-screen bg-[#E6EDEB] p-8">

            <div className="exam-card p-8 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Exam Results</h1>

                <div className="mb-4">
                    <div className="text-lg font-semibold">Score: {score}%</div>
                    <div className="text-sm text-gray-600">
                        Passing Score = 72%
                    </div>
                </div>

                {/* Strengths */}
                <div className="mb-6">
                    <h2 className="font-bold text-lg mb-2">Strengths</h2>
                    <ul className="list-disc ml-6 text-gray-700">
                        {strengths.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>

                {/* Weak Areas */}
                <div className="mb-6">
                    <h2 className="font-bold text-lg mb-2">Weak Areas</h2>
                    <ul className="list-disc ml-6 text-gray-700">
                        {weakAreas.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>

                {/* AI Recommendation */}
                <div className="backdrop-blur-xl bg-white/40 border rounded-xl p-6 shadow-xl">
                    <h2 className="font-bold text-lg mb-2">AI Recommendations</h2>
                    <p className="text-gray-700 text-sm">
                        Focus on Cost Management and Variance Analysis.
                        Practice 15 MCQs daily.
                        Use decision-tree logic for marginal analysis.
                        Revise WACC formula and practice NPV drills.
                    </p>
                </div>

            </div>
        </div>
    );
}
