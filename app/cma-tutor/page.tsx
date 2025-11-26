"use client";
import { useEffect, useRef, useState } from "react";

export default function CMATutor() {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [input, setInput] = useState("");
    const [listening, setListening] = useState(false);

    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            const recog = new SpeechRecognition();
            recog.continuous = false;
            recog.interimResults = false;
            recog.lang = "en-US";

            recog.onstart = () => setListening(true);
            recog.onend = () => setListening(false);

            recog.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
            };

            recognitionRef.current = recog;
        }
    }, []);

    const startListening = () => {
        if (recognitionRef.current) recognitionRef.current.start();
    };

    const speak = (text: string) => {
        const synth = window.speechSynthesis;
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 1;
        utter.pitch = 1;
        synth.speak(utter);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newUserMsg = { role: "user", content: input };
        setMessages((prev) => [...prev, newUserMsg]);
        setInput("");

        const res = await fetch("/api/cma-tutor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: newUserMsg.content }),
        });

        const data = await res.json();

        const aiMsg = { role: "assistant", content: data.answer };
        setMessages((prev) => [...prev, aiMsg]);

        // Voice output
        speak(data.answer);
    };

    return (
        <div className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-br from-gray-200 to-gray-300">
            <button
                onClick={() => window.location.href = "/exam/test"}
                className="absolute top-6 right-6 px-4 py-2 rounded-lg bg-gray-800 text-white shadow"
            >
                ← Return to Exam
            </button>

            {/* Glass Card */}
            <div className="backdrop-blur-xl bg-white/30 shadow-2xl rounded-3xl border border-white/40 w-full max-w-3xl p-6">

                <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
                    FETS CMA Tutor
                </h1>

                {/* Chat Window */}
                <div className="h-[60vh] overflow-y-auto space-y-4 p-3">
                    {messages.map((m, i) => (
                        <div key={i} className={`p-4 rounded-2xl shadow-md ${m.role === "user"
                            ? "bg-white text-black border border-gray-300"
                            : "bg-[#FFD600]/80 text-black border border-yellow-300"
                            }`}>
                            <pre className="whitespace-pre-wrap text-sm">{m.content}</pre>
                        </div>
                    ))}
                </div>

                {/* Input Field */}
                <div className="mt-6 flex gap-3">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border shadow-inner bg-white/80 backdrop-blur-md focus:ring-2 focus:ring-yellow-400"
                        placeholder="Ask CMA question..."
                    />

                    {/* Voice Input Button */}
                    <button
                        onClick={startListening}
                        className={`px-4 py-3 rounded-xl shadow-lg text-white font-semibold ${listening ? "bg-red-500" : "bg-green-600"
                            }`}
                    >
                        🎤
                    </button>

                    {/* Send Button */}
                    <button
                        onClick={sendMessage}
                        className="px-6 py-3 rounded-xl shadow-lg bg-[#FFD600] text-black font-bold"
                    >
                        ➤
                    </button>
                </div>

            </div>
        </div>
    );
}
