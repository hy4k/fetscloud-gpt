export default function QuestionGrid({
    total,
    current,
    answers,
    flagged,
    onSelect
}: {
    total: number;
    current: number;
    answers: any;
    flagged: any;
    onSelect: (num: number) => void;
}) {
    return (
        <div className="grid grid-cols-1 gap-2">
            {[...Array(total)].map((_, i) => {
                const num = i + 1;
                const isCurrent = num === current;
                const hasAnswered = answers[num] !== null;
                const isFlagged = flagged[num];

                return (
                    <button
                        key={num}
                        className={`w-12 py-2 rounded text-sm border shadow ${isCurrent
                                ? "bg-[#8DC641] text-white border-[#7AB434]"
                                : hasAnswered
                                    ? "bg-[#CDEBB3] text-black"
                                    : "bg-white text-black"
                            } ${isFlagged && "border-4 border-yellow-400"}`}
                        onClick={() => onSelect(num)}
                    >
                        {num}
                    </button>
                );
            })}
        </div>
    );
}
