export default function ConfirmDetails() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E6EDEB] p-6">
            <div className="exam-card w-[520px] p-10 text-center relative">

                {/* Header */}
                <div className="pm-header p-3 text-left text-lg font-semibold rounded-t-md -mt-10 -mx-10 mb-6">
                    Confirm Details
                    <span className="float-right font-normal text-sm">00:01:54</span>
                </div>

                {/* Candidate Data */}
                <div className="flex justify-center mb-8">
                    <div className="border rounded-md bg-gray-100 p-4 w-[320px] text-left text-sm leading-7">
                        <div><strong>Last Name:</strong> USER</div>
                        <div><strong>First Name:</strong> Demo</div>
                        <div><strong>Test Name:</strong> CMA Exam Simulation</div>
                        <div><strong>Language:</strong> us</div>
                    </div>
                </div>

                <p className="mb-8 text-gray-700">Are the details above correct?</p>

                {/* Buttons */}
                <div className="flex justify-center gap-6">
                    <button className="pm-btn pm-btn-green">✔ Confirm</button>
                    <button className="pm-btn bg-red-500">✖ Cancel</button>
                </div>

                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                    Prometric
                </div>
            </div>
        </div>
    );
}
