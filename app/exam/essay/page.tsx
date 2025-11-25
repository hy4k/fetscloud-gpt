"use client";

import { useState } from "react";

export default function EssayPage() {
    const [answer, setAnswer] = useState("");
    const [wordCount, setWordCount] = useState(0);

    const essayScenario = `
You are the CFO...
(Your full CMA scenario goes here)
`;

    const handleChange = (e: any) => {
        const text = e.target.value;
        setAnswer(text);
        setWordCount(text.split(/\s+/).filter(Boolean).length);
    };

    return (
        <div className="min-h-screen bg-[#E6EDEB] p-4 flex gap-4">

            {/* LEFT PANE */}
            <div className="w-1/2 bg-white border shadow p-6 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-3">Essay Scenario</h2>
                <pre className="whitespace-pre-wrap text-gray-700">{essayScenario}</pre>
            </div>

            {/* RIGHT PANE */}
            <div className="w-1/2 bg-white border shadow p-6 flex flex-col">
                <textarea
                    value={answer}
                    onChange={handleChange}
                    className="flex-1 border p-4 rounded resize-none focus:outline-none"
                    placeholder="Type your response here..."
                />

                <div className="text-right text-sm text-gray-600 mt-2">
                    Word Count: {wordCount}
                </div>

                <button className="pm-btn pm-btn-green mt-4">
                    Submit Essay
                </button>
            </div>

        </div>
    );
}
