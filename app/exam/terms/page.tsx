"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Terms() {
    const [checked, setChecked] = useState(false);
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#E6EDEB] px-10 py-8">
            <div className="exam-card p-10 max-w-4xl mx-auto">

                <div className="pm-header p-4 text-xl font-semibold -mt-10 -mx-10 mb-8">
                    Terms & Conditions
                </div>

                <p className="text-center text-gray-700 mb-4">
                    Please ensure you scroll down to read and accept the organisation’s Terms.
                </p>

                <div className="border border-[#D8D546] p-4 rounded-md h-[300px] overflow-y-scroll text-gray-700 leading-7 mb-6 bg-white">
                    {/* LONG PROMETRIC TERMS — EXAMPLE TEXT */}
                    <p>I hereby attest that I will not remove any examination materials...</p>
                    <p>Cheating includes copying answers…</p>
                    <p>Copyright © IMA</p>
                </div>

                <label className="flex items-center gap-3 mb-8">
                    <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                    <span className="text-gray-700">I accept these terms.</span>
                </label>

                <div className="flex justify-center gap-6">
                    <button className="pm-btn bg-red-500">✖ Exit</button>
                    <button
                        disabled={!checked}
                        className={`pm-btn pm-btn-green ${!checked && "opacity-50"}`}
                        onClick={() => router.push("/exam/intro")}
                    >
                        ✔ Continue
                    </button>
                </div>

            </div>
        </div>
    );
}
