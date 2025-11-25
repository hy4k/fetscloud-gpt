"use client";

import { useState } from "react";

export default function TutorDrawer({
    open,
    onClose,
    question,
    number
}: {
    open: boolean;
    onClose: () => void;
    question: any;
    number: number;
}) {
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState("");

    const askAI = async () => {
        setLoading(true);

        const q = `
CMA EXAM QUESTION #${number}

Question:
${question.text}

Options:
${question.options.map((o: string, i: number) => String.fromCharCode(65 + i) + ". " + o).join("\n")}
`;

        const res = await fetch("/api/cma-tutor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: q }),
        });

        const data = await res.json();
        setReply(data.answer);
        setLoading(false);

        // Speak it
        const utter = new SpeechSynthesisUtterance(data.answer);
        window.speechSynthesis.speak(utter);
    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl transform transition-all duration-300 border-l border-gray-300 z-50 ${open ? "translate-x-0" : "translate-x-full"
                }`}
        >
            {/* HEADER */}
            <div className="pm-header p-4 flex justify-between items-center text-white text-lg">
                <div>AI Tutor</div>
                <button onClick={onClose} className="text-white text-2xl">×</button>
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-5 overflow-y-auto h-[85vh]">

                {/* QUESTION */}
                <div className="border p-4 rounded-md bg-gray-50 shadow-inner">
                    <h3 className="font-semibold mb-2">
                        Q{number}. {question.text}
                    </h3>

                    <div className="space-y-2 text-sm">
                        {question.options.map((o: string, i: number) => (
                            <div key={i}>
                                <strong>{String.fromCharCode(65 + i)}.</strong> {o}
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Button */}
                <button
                    onClick={askAI}
                    className="pm-btn pm-btn-green w-full"
                >
                    {loading ? "Thinking..." : "Ask AI for Explanation"}
                </button>

                {/* AI ANSWER BOX */}
                {reply && (
                    <div className="backdrop-blur-xl bg-white/40 p-4 rounded-2xl border shadow-lg">
                        <pre className="whitespace-pre-wrap text-sm">{reply}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}
