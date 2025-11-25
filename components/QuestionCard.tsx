export default function QuestionCard({
    q,
    answer,
    flagged,
    onAnswer,
    onFlag,
    onHint
}: {
    q: any;
    answer: string | null;
    flagged: boolean;
    onAnswer: (v: string) => void;
    onFlag: () => void;
    onHint: () => void;
}) {
    return (
        <div className="text-gray-800 leading-7">

            {/* Title Row */}
            <div className="flex justify-between mb-4">
                <h3 className="font-semibold text-lg">{q.text}</h3>

                <div className="flex gap-3">
                    {/* Hint */}
                    <button
                        className="px-4 py-2 rounded-md text-sm bg-blue-200 hover:bg-blue-300"
                        onClick={onHint}
                    >
                        💡 Hint
                    </button>

                    {/* Flag */}
                    <button
                        className={`px-4 py-2 rounded-md text-sm ${flagged ? "bg-yellow-400" : "bg-gray-200"
                            }`}
                        onClick={onFlag}
                    >
                        {flagged ? "⚑ Flagged" : "⚐ Flag"}
                    </button>
                </div>
            </div>

            {/* OPTIONS */}
            <div className="space-y-4 mt-6">
                {q.options.map((opt: string, idx: number) => {
                    const letter = ["A", "B", "C", "D"][idx];
                    const selected = answer === letter;

                    return (
                        <button
                            key={idx}
                            onClick={() => onAnswer(letter)}
                            className={`w-full text-left border rounded-md p-4 hover:bg-gray-100 ${selected ? "border-[#8DC641] bg-[#CDEBB3]" : "border-gray-300"
                                }`}
                        >
                            <strong className="mr-4">{letter}.</strong> {opt}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
