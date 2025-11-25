"use client";

import { useState, useRef, useEffect } from "react";

export default function CmaTutorPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askTutor = async () => {
    if (!question.trim()) return;

    setLoading(true);

    const userMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch("/api/cma-tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();

    const assistantMessage = {
      role: "assistant",
      content: data.answer || "No answer generated"
    };

    setMessages((prev) => [...prev, assistantMessage]);

    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-4">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        <span className="text-black">FETS</span>
        <span className="text-[#FFD600]"> CMA Tutor</span>
      </h1>

      {/* CHAT WINDOW */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-[60vh] overflow-y-auto p-5 mb-6">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-6">
            <div className={`font-semibold ${msg.role === "user" ? "text-black" : "text-[#FFD600]"}`}>
              {msg.role === "user" ? "You:" : "Tutor:"}
            </div>
            <div className="whitespace-pre-wrap text-gray-800 mt-1">
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* INPUT BOX */}
      <div className="flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask any CMA question…"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FFD600]"
        />
        <button
          onClick={askTutor}
          disabled={loading}
          className="bg-[#FFD600] text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
        >
          {loading ? "Thinking…" : "Ask"}
        </button>
      </div>

    </div>
  );
}
