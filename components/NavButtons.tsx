export default function NavButtons({
    current,
    total,
    onPrev,
    onNext,
    onFinish,
}: {
    current: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
    onFinish: () => void;
}) {
    return (
        <div className="flex gap-4">
            <button
                className="pm-btn pm-btn-gray"
                disabled={current === 1}
                onClick={onPrev}
            >
                ◀ Previous
            </button>

            {current < total ? (
                <button className="pm-btn pm-btn-green" onClick={onNext}>
                    Next ▶
                </button>
            ) : (
                <button className="pm-btn bg-red-500" onClick={onFinish}>
                    Finish Test
                </button>
            )}
        </div>
    );
}
