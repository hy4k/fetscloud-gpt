export default function DrawerReview({
    open,
    onClose,
    answers,
    flagged,
    onJump
}: {
    open: boolean;
    onClose: () => void;
    answers: any;
    flagged: any;
    onJump: (n: number) => void;
}) {
    return (
        <div
            className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-xl transform transition-all duration-300 border-r border-gray-300 ${open ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold text-lg">Section Review</h3>
                <button onClick={onClose} className="text-xl">×</button>
            </div>

            <div className="p-4 border-b text-sm leading-6">
                <div className="mb-2">
                    <input type="checkbox" /> Unattempted
                </div>
                <div className="mb-2">
                    <input type="checkbox" /> Attempted
                </div>
                <div className="mb-4">
                    <input type="checkbox" /> Flagged
                </div>
                <button className="pm-btn pm-btn-gray w-full">Clear</button>
            </div>

            <div className="p-4 grid grid-cols-4 gap-3 text-sm">
                {[...Array(25)].map((_, i) => {
                    const num = i + 1;
                    const hasAnswer = answers[num] !== null;
                    const isFlagged = flagged[num];

                    return (
                        <button
                            key={num}
                            onClick={() => onJump(num)}
                            className={`p-2 rounded border ${hasAnswer
                                    ? "bg-[#CDEBB3]"
                                    : "bg-white"
                                } ${isFlagged && "border-4 border-yellow-400"}`}
                        >
                            {num}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
