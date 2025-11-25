"use client";

import { useEffect, useState } from "react";
import HeaderBar from "@/components/HeaderBar";
import QuestionGrid from "@/components/QuestionGrid";
import DrawerReview from "@/components/DrawerReview";
import NavButtons from "@/components/NavButtons";
import QuestionCard from "@/components/QuestionCard";
import TutorDrawer from "@/components/TutorDrawer";

export default function TestPage() {
    const TOTAL_QUESTIONS = 25;

    // Timer for section (20 minutes = 20 * 60 = 1200s)
    const [timeLeft, setTimeLeft] = useState(20 * 60);

    const [current, setCurrent] = useState(1);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [tutorOpen, setTutorOpen] = useState(false);

    const [hint, setHint] = useState("");

    const [answers, setAnswers] = useState<{ [key: number]: string | null }>(() =>
        Object.fromEntries([...Array(TOTAL_QUESTIONS)].map((_, i) => [i + 1, null]))
    );

    const [flagged, setFlagged] = useState<{ [key: number]: boolean }>(() =>
        Object.fromEntries([...Array(TOTAL_QUESTIONS)].map((_, i) => [i + 1, false]))
    );

    // Dummy sample questions (replace later with CMA dataset)
    const questions = [...Array(TOTAL_QUESTIONS)].map((_, i) => ({
        id: i + 1,
        text: `Sample CMA Question #${i + 1}: What is variance analysis used for?`,
        options: [
            "To analyze cost deviations",
            "To prepare cash budgets",
            "To compute WACC",
            "To evaluate time series trends",
        ],
    }));

    // -------------------------
    // TIMER
    // -------------------------
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    // -------------------------
    // NEXT / PREV QUESTION
    // -------------------------
    const goNext = () => {
        if (current < TOTAL_QUESTIONS) setCurrent(current + 1);
    };
    const goPrev = () => {
        if (current > 1) setCurrent(current - 1);
    };

    // -------------------------
    // HINT MODE
    // -------------------------
    const askHint = async () => {
        const q = questions[current - 1];

        const prompt = `
Give a short CMA exam hint under 20 words.
Do NOT reveal the answer.

Question:
${q.text}

Options:
${q.options.join("\n")}
`;

        const res = await fetch("/api/cma-tutor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: prompt }),
        });

        const data = await res.json();
        setHint(data.answer);
    };

    return (
        <div className="min-h-screen bg-[#E6EDEB] flex">

            {/* LEFT: Question Navigation Grid */}
            <div className="w-[150px] p-4">
                <QuestionGrid
                    total={TOTAL_QUESTIONS}
                    current={current}
                    answers={answers}
                    flagged={flagged}
                    onSelect={(num) => setCurrent(num)}
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 flex flex-col pr-4">

                {/* HEADER */}
                <HeaderBar
                    title="Exam Simulation"
                    time={formatTime(timeLeft)}
                    progress={(current / TOTAL_QUESTIONS) * 100}
                    onFinish={() => alert("Finish Section")}
                />

                {/* QUESTION AREA */}
                <div className="bg-white mt-4 p-6 shadow rounded-md h-[70vh] overflow-y-auto border">
                    <QuestionCard
                        q={questions[current - 1]}
                        answer={answers[current]}
                        flagged={flagged[current]}
                        onAnswer={(val) =>
                            setAnswers({ ...answers, [current]: val })
                        }
                        onFlag={() =>
                            setFlagged({ ...flagged, [current]: !flagged[current] })
                        }
                        onHint={askHint}
                    />

                    {/* HINT DISPLAY */}
                    {hint && (
                        <div className="mt-4 p-3 rounded bg-yellow-100 border border-yellow-400">
                            <strong>Hint:</strong> {hint}
                        </div>
                    )}
                </div>

                {/* BOTTOM CONTROLS */}
                <div className="flex justify-between items-center mt-4">

                    {/* Section Review Button */}
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="p-2 bg-gray-700 text-white rounded shadow"
                    >
                        ☰ Section Review
                    </button>

                    {/* Tutor Button */}
                    <button
                        className="p-2 bg-blue-600 text-white rounded shadow"
                        onClick={() => setTutorOpen(true)}
                    >
                        💡 Ask Tutor
                    </button>

                    {/* NEXT/PREV */}
                    <NavButtons
                        current={current}
                        total={TOTAL_QUESTIONS}
                        onPrev={goPrev}
                        onNext={goNext}
                        onFinish={() => alert("Finish Section")}
                    />
                </div>

            </div>

            {/* REVIEW DRAWER */}
            <DrawerReview
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                answers={answers}
                flagged={flagged}
                onJump={(num) => {
                    setCurrent(num);
                    setDrawerOpen(false);
                }}
            />

            {/* TUTOR DRAWER */}
            <TutorDrawer
                open={tutorOpen}
                onClose={() => setTutorOpen(false)}
                question={questions[current - 1]}
                number={current}
            />
        </div>
    );
}
