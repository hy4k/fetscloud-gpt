"use client";

import { useRouter } from "next/navigation";

export default function Intro() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#E6EDEB] px-8 py-6">
            <div className="exam-card p-10 max-w-5xl mx-auto">

                {/* Header */}
                <div className="pm-header p-4 -mt-10 -mx-10 mb-6 flex justify-between items-center text-white">
                    <div>
                        <div className="text-sm">Page: 1</div>
                        <div className="font-semibold">Section: Introduction</div>
                    </div>
                    <div>
                        Introduction Time Remaining: <strong>00:14:52</strong>
                        <div className="w-40 bg-gray-300 h-2 mt-2">
                            <div className="bg-[#D8D546] h-2 w-[10%]"></div>
                        </div>
                    </div>
                    <button className="pm-btn pm-btn-green">Finish Test</button>
                </div>

                <h2 className="text-xl font-bold mb-4">CMA Exam Simulation</h2>

                <div className="text-gray-800 leading-7 mb-10">
                    <p>Exam Structure...</p>
                    <p>Content Section 1: ...</p>
                    <p>Content Section 2: ...</p>
                </div>

                <div className="flex justify-end gap-4">
                    <button className="pm-btn pm-btn-gray">◀ Previous</button>
                    <button className="pm-btn pm-btn-green" onClick={() => router.push("/exam/test")}>
                        Start the Test ▶
                    </button>
                </div>

            </div>
        </div>
    );
}
