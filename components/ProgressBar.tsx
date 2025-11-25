export default function ProgressBar({ progress = 0 }: { progress?: number }) {
    return (
        <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div
                className="bg-[#FFD600] h-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}
