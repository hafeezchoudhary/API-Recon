import { FiUploadCloud, FiInbox } from "react-icons/fi";

const Hero = ({ analysis, loading, selectedFile, handleFileChange }) => {
    return (
        <section className="mx-auto px-8 md:px-10 xl:px-38 py-4 bg-[#07111D]">

            {/* Header */}
            <div className="space-y-3 mt-2">

                <h1 className="text-4xl font-semibold text-white">
                    APIRecon
                </h1>

                <h2 className="text-xl text-zinc-200">
                    Analyze Postman Collections and Generate API Security Reports.
                </h2>

                <p className="max-w-5xl text-sm text-zinc-400 leading-7">
                    APIRecon performs automated analysis of Postman collections to identify endpoints, authentication methods, sensitive data exposure, headers, query parameters, and API metadata.
                </p>

            </div>

            {/* Upload + How It Works */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Upload Card */}
                <label className="lg:col-span-3 border border-[#253244] bg-[#0E1827] rounded-xl flex flex-col items-center justify-center text-center min-h-45 cursor-pointer hover:border-[#253244] transition">

                    <FiUploadCloud size={36} className="text-zinc-400 mb-2" />

                    <h3 className="text-xl font-medium text-white">
                        {loading
                            ? "Analyzing Collection..."
                            : selectedFile
                                ? selectedFile.name
                                : "Drop your Postman collection here"}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-400">
                        {loading
                            ? "Please wait while APIRecon analyzes your collection."
                            : selectedFile
                                ? "Your Postman collection has been successfully uploaded and analyzed."
                                : "or click to browse — .json only, uploads automatically"}
                    </p>

                    <input type="file" accept=".json" onChange={handleFileChange} className="hidden"/>

                </label>

                {/* How It Works */}
                <div className="border border-[#253244]  bg-[#0E1827] rounded-xl p-5">
                    <h3 className="text-lg font-medium text-white mb-3">
                        How it works
                    </h3>
                    <div className="space-y-3 text-sm text-zinc-400">
                        <p>1. Export your collection from Postman as JSON (v2.1).</p>
                        <p>2. Drop it into the upload area — analysis runs automatically.</p>
                        <p>3. Review the report and download it as a PDF.</p>
                    </div>
                </div>
            </div>

            {/* Empty State */}

            {!analysis && (
                <div className="mt-6 border border-[#253244] bg-[#0E1827] rounded-xl min-h-55 flex flex-col items-center justify-center text-center px-6 mb-5">

                    <div className="h-14 w-14 rounded-full bg-zinc-800 flex items-center justify-center mb-5">
                        <FiInbox size={24} className="text-zinc-300" />
                    </div>

                    <h3 className="text-2xl font-medium text-white">
                        Upload a Postman Collection
                    </h3>

                    <p className="mt-2 text-sm text-zinc-400">
                        Generate a comprehensive API security report in seconds.
                    </p>

                </div>
            )}

        </section>
    );
};

export default Hero;