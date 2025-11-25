"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [performance, setPerformance] = useState<any>(null);

    useEffect(() => {
        fetch("/api/user-performance")
            .then((res) => res.json())
            .then((data) => setPerformance(data));
    }, []);

    if (!performance) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold mb-8">Your Performance Insights</h1>

            <div className="grid grid-cols-2 gap-6">

                {/* SECTION CARDS */}
                {Object.keys(performance.sections).map((sec) => (
                    <div key={sec} className="p-6 bg-white shadow rounded-lg border">
                        <h2 className="font-bold text-lg mb-2">{sec}</h2>

                        <div className="mb-2 text-sm">
                            Correct: {performance.sections[sec].correct}
                        </div>
                        <div className="mb-2 text-sm">
                            Wrong: {performance.sections[sec].wrong}
                        </div>
                        <div className="text-sm text-gray-700">
                            Accuracy:{" "}
                            {Math.round(
                                (performance.sections[sec].correct / performance.sections[sec].total) *
                                100
                            )}
                            %
                        </div>

                        {/* MINI PROGRESS BAR */}
                        <div className="mt-3 h-2 w-full bg-gray-200 rounded">
                            <div
                                className="h-full bg-green-500 rounded"
                                style={{
                                    width: `${(performance.sections[sec].correct / performance.sections[sec].total) *
                                        100
                                        }%`,
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI STUDY PLAN */}
            <div className="mt-10 p-8 bg-white shadow rounded-lg border">
                <h2 className="font-bold text-xl mb-4">Your Personalized AI Study Plan</h2>
                <pre className="whitespace-pre-wrap text-gray-700">{performance.studyPlan}</pre>
            </div>
        </div>
    );
}
