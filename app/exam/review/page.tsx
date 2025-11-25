export default function ReviewPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h1 className="text-3xl font-bold mb-2">Exam Review</h1>
                <p className="text-gray-600 mb-8">Please review your answers before submitting. Once submitted, you cannot change your answers.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                        <div className="text-4xl font-bold text-blue-600 mb-1">85</div>
                        <div className="text-blue-800 font-medium">Answered</div>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                        <div className="text-4xl font-bold text-yellow-600 mb-1">5</div>
                        <div className="text-yellow-800 font-medium">Flagged</div>
                    </div>
                    <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                        <div className="text-4xl font-bold text-red-600 mb-1">10</div>
                        <div className="text-red-800 font-medium">Unanswered</div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t">
                    <button className="text-gray-600 font-semibold hover:text-black">
                        ← Return to Test
                    </button>
                    <button className="bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-700 transition shadow-lg">
                        Submit Exam
                    </button>
                </div>
            </div>
        </div>
    );
}
