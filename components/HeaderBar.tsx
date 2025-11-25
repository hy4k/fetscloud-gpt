export default function HeaderBar({
    title,
    time,
    progress,
    onFinish
}: {
    title: string;
    time: string;
    progress: number;
    onFinish: () => void;
}) {
    return (
        <div className="pm-header rounded-md px-6 py-4 flex justify-between items-center text-white text-sm">
            <div className="font-semibold text-lg">{title}</div>

            <div className="flex items-center gap-4">
                <div>
                    <div className="font-semibold">Section Time Remaining:</div>
                    <div className="text-right">{time}</div>
                </div>

                <div className="w-32 bg-gray-300 h-2 rounded">
                    <div
                        className="bg-[#D8D546] h-2 rounded"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <button className="pm-btn pm-btn-green" onClick={onFinish}>
                Finish Section
            </button>
        </div>
    );
}
