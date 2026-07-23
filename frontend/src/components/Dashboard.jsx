import { FiFileText, FiFolder, FiCode, FiAlertCircle, FiDownload, FiActivity, FiLink, FiFilter, FiList, FiAlertTriangle, } from "react-icons/fi";
import { useState } from "react";

const Dashboard = ({ analysis, downloadReport }) => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const itemsPerPage = 7;

    const filteredEndpoints = analysis.endpoints.filter((endpoint) =>
        endpoint.url.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(
        filteredEndpoints.length / itemsPerPage
    );

    const paginatedEndpoints = filteredEndpoints.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <section className="mx-auto px-8 md:px-10 xl:px-38 py-3 bg-[#07111D]">

            {/* Collection Card */}

            <div className="border border-[#253244] bg-[#0E1827] rounded-xl p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ">

                <div className="mx-auto md:mx-0">
                    <h2 className="text-lg font-semibold text-white">
                        {analysis.collection.name}
                    </h2>

                    <p className="text-sm text-zinc-400 mt-1">
                        Analysis complete. {analysis.summary.total_requests} requests scanned.
                    </p>
                </div>

                <button onClick={downloadReport} className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500 text-black hover:bg-cyan-600 rounded-lg text-sm font-medium transition mx-auto md:mx-0">
                    <FiDownload size={16} />
                    Download PDF Report
                </button>

            </div>

            {/* Summary Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
                <div className="border border-[#253244] bg-[#0E1827] rounded-xl px-5 py-4">
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-zinc-400 uppercase tracking-wider">
                            Total Requests
                        </p>
                        <FiFileText size={18} className="text-zinc-400" />
                    </div>

                    <h3 className="text-4xl font-semibold text-white mt-4">
                        {analysis.summary.total_requests}
                    </h3>
                </div>

                <div className="border border-[#253244] bg-[#0E1827] rounded-xl px-5 py-4">
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-zinc-400 uppercase tracking-wider">
                            Total Folders
                        </p>

                        <FiFolder size={18} className="text-zinc-400" />
                    </div>

                    <h3 className="text-4xl font-semibold text-white mt-4">
                        {analysis.summary.total_folders}
                    </h3>
                </div>

                <div className="border border-[#253244] bg-[#0E1827] rounded-xl px-5 py-4">
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-zinc-400 uppercase tracking-wider">
                            Variables
                        </p>

                        <FiCode size={18} className="text-zinc-400" />
                    </div>

                    <h3 className="text-4xl font-semibold text-white mt-4">
                        {analysis.variables.count}
                    </h3>
                </div>

                <div className="border border-[#253244] bg-[#0E1827] rounded-xl px-5 py-4">
                    <div className="flex justify-between items-center">
                        <p className="text-xs text-zinc-400 uppercase tracking-wider">
                            Sensitive Data
                        </p>

                        <FiAlertCircle size={18} className="text-zinc-400" />
                    </div>

                    <h3 className="text-4xl font-semibold text-white mt-4">
                        {analysis.sensitive_data.length}
                    </h3>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
                {/* HTTP Methods */}
                <div className="border border-[#253244] bg-[#0E1827] rounded-xl">

                    <div className="p-5 border-b border-[#253244]">
                        <h2 className="text-lg text-white font-medium">HTTP Methods</h2>
                        <p className="text-sm text-zinc-400 mt-1">
                            Distribution across all requests
                        </p>
                    </div>

                    <div className="p-5 space-y-5">
                        {Object.entries(analysis.methods).map(([method, count]) => {

                            const percentage = (count / analysis.summary.total_requests) * 100;

                            const colors = {
                                GET: "bg-blue-500",
                                POST: "bg-emerald-500",
                                PUT: "bg-amber-500",
                                DELETE: "bg-red-500",
                                PATCH: "bg-violet-500",
                            };

                            return (
                                <div key={method}>
                                    <div className="flex justify-between mb-2">
                                        <p className="text-sm text-white">{method}</p>

                                        <p className="text-sm text-zinc-400">{count} · {Math.round(percentage)}%</p>
                                    </div>

                                    <div className="w-full h-1.5 bg-zinc-800 rounded-full">
                                        <div className={`h-1.5 rounded-full ${colors[method]}`} style={{ width: `${percentage}%` }}/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Authentication */}

                <div className="border border-[#253244] bg-[#0E1827] rounded-xl">
                    <div className="p-5 border-b border-[#253244]">
                        <h2 className="text-lg text-white font-medium"> Authentication Types</h2>

                        <p className="text-sm text-zinc-400 mt-1">
                            Auth strategy per request
                        </p>
                    </div>

                    <div className="p-5 space-y-5">
                        {Object.entries(analysis.authentication).map(([auth, count]) => {

                            const percentage = (count / analysis.summary.total_requests) * 100;

                            return (
                                <div key={auth}>
                                    <div className="flex justify-between mb-2">
                                        <p className="text-sm text-white capitalize">
                                            {auth}
                                        </p>
                                        <p className="text-sm text-zinc-400">
                                            {count} · {Math.round(percentage)}%
                                        </p>
                                    </div>

                                    <div className="w-full h-1.5 bg-zinc-800 rounded-full">
                                        <div className="h-1.5 rounded-full bg-zinc-400" style={{ width: `${percentage}%` }}/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

                {/* Headers */}
                <div className="border border-[#253244] bg-[#0E1827] rounded-xl">

                    <div className="p-5 border-b border-[#253244] flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-medium text-white">Headers</h2>
                            <p className="text-sm text-zinc-400 mt-1">
                                Most used request headers
                            </p>
                        </div>
                        <FiFilter size={18} className="text-zinc-500" />
                    </div>

                    <div className="p-5 space-y-4">

                        {Object.entries(analysis.headers).map(([header, count]) => (
                            <div key={header} className="flex items-center justify-between border-b border-[#253244] pb-4">
                                <p className="text-sm text-white">
                                    {header}
                                </p>

                                <span className="bg-violet-950/40 text-violet-300 text-sm px-3 py-1 rounded-md border border-violet-900/50">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Query Parameters */}

                <div className="border border-[#253244] bg-[#0E1827] rounded-xl">
                    <div className="p-5 border-b border-[#253244] flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-medium text-white">
                                Query Parameters
                            </h2>

                            <p className="text-sm text-zinc-400 mt-1">
                                Aggregated across endpoints
                            </p>
                        </div>

                        <FiList size={18} className="text-zinc-500" />
                    </div>

                    <div className="p-5 space-y-4">

                        {Object.entries(analysis.query_parameters).map(([query, count]) => (
                            <div key={query} className="flex items-center justify-between border-b border-[#253244] pb-4">
                                <p className="text-sm text-white">
                                    {query}
                                </p>

                                <span className="bg-cyan-950/40 text-cyan-300 text-sm px-3 py-1 rounded-md border border-cyan-900/50">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Response Analysis */}

                <div className="border border-[#253244] bg-[#0E1827] rounded-xl">
                    <div className="p-5 border-b border-[#253244] flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-medium text-white">
                                Response Analysis
                            </h2>

                            <p className="text-sm text-zinc-400 mt-1">
                                Saved example responses by status code
                            </p>
                        </div>

                        <FiActivity size={18} className="text-zinc-500" />
                    </div>

                    <div className="p-5">
                        <div className="rounded-lg overflow-hidden border border-[#253244]">
                            <div className="grid grid-cols-3 bg-zinc-800/30 px-4 py-3 text-xs uppercase tracking-wider text-zinc-400">
                                <p>Code</p>
                                <p>Status</p>
                                <p className="text-right">Count</p>
                            </div>

                            {analysis.response.map((response, index) => (
                                <div key={index} className="grid grid-cols-3 px-4 py-4 border-t border-[#253244] text-sm">
                                    
                                    <p className="text-white">{response.code}</p>

                                    <p className="text-white">{response.status}</p>

                                    <p className="text-right text-zinc-400"> 1 </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Variables */}

                <div className="border border-[#253244] bg-[#0E1827] rounded-xl">
                    <div className="p-5 border-b border-[#253244] flex items-start justify-between">
                        <div>
                            <h2 className="text-lg font-medium text-white">Variables</h2>

                            <p className="text-sm text-zinc-400 mt-1">Collection-level variables</p>
                        </div>
                        <FiLink size={18} className="text-zinc-500" />
                    </div>

                    <div className="p-5 space-y-4">
                        {analysis.variables.items.map((variable, index) => (
                            <div key={index} className="flex items-center justify-between border-b border-[#253244] pb-4">
                                <p className="text-sm text-white">
                                    {variable.key}
                                </p>

                                <p className="text-sm text-indigo-300 break-all">
                                    {variable.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border border-[#253244] bg-[#0E1827] rounded-xl mt-6">
                <div className="p-4 border-b border-[#253244]">
                    <h2 className="text-lg font-medium text-white">
                        Collection Information
                    </h2>

                    <p className="text-sm text-zinc-400 mt-1">
                        Metadata from the imported file
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                            Collection Name
                        </p>

                        <p className="text-sm text-white wrap-break-word">
                            {analysis.collection.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase font-semibold tracking-wider text-zinc-500 mb-3">
                            Schema
                        </p>

                        <p className="text-sm text-white truncate">
                            {analysis.collection.schema}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase font-semibold tracking-wider text-zinc-500 mb-3">
                            Postman ID
                        </p>

                        <p className="text-sm text-white wrap-break-word">
                            {analysis.collection.postman_id}
                        </p>
                    </div>
                </div>
            </div>

            {/* Endpoints */}

            <div className="border border-[#253244] bg-[#0E1827] rounded-xl mt-6">
                {/* Header */}
                <div className="p-4 border-b border-[#253244]">
                    <h2 className="text-lg font-medium text-white">
                        Endpoints
                    </h2>

                    <p className="text-sm text-zinc-400 mt-1">
                        {analysis.endpoints.length} discovered across the collection
                    </p>

                </div>

                <div className="p-4">
                    {/* Search */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <input type="text" placeholder="Search endpoints" value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="w-full md:w-96 bg-zinc-850 border border-[#253244] rounded-lg px-4 py-2.5 text-sm text-white outline-none"/>

                        <p className="text-sm text-zinc-400">
                            {filteredEndpoints.length} of {analysis.endpoints.length}
                        </p>

                    </div>

                    {/* Table */}
                    <div className="border border-[#253244] rounded-lg overflow-hidden">
                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-[90px_1fr_120px] px-4 py-3 bg-zinc-800/30 text-xs uppercase tracking-wider text-zinc-400">

                            <p>Method</p>
                            <p>Endpoint</p>
                            <p>Auth</p>

                        </div>
                        <div className="md:hidden px-4 py-3 bg-zinc-800/30 text-xs uppercase tracking-wider text-zinc-400">
                            Endpoint Details
                        </div>

                        {/* Rows */}

                        <div className="max-h-107.5 overflow-y-auto">
                            {paginatedEndpoints.map((endpoint, index) => {

                                const colors = {
                                    GET: "border-green-600 text-green-400",
                                    POST: "border-sky-600 text-sky-400",
                                    PUT: "border-yellow-600 text-yellow-400",
                                    DELETE: "border-red-600 text-red-400",
                                    PATCH: "border-purple-600 text-purple-400"
                                };

                                return (
                                    <div key={index}>
                                        {/* Desktop */}
                                        <div className=" hidden md:grid grid-cols-[90px_1fr_120px] px-4 py-3 border-t border-[#253244]">
                                            <div>
                                                <span className={`text-[11px] px-3 py-1 rounded-md border ${colors[endpoint.method]}`}>
                                                    {endpoint.method}
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-sm text-white break-all">
                                                    {endpoint.url}
                                                </p>

                                                <p className="text-xs text-zinc-500 mt-1">
                                                    {endpoint.name}
                                                </p>
                                            </div>

                                            <p className="text-sm text-zinc-400">
                                                {endpoint.auth}
                                            </p>
                                        </div>

                                        {/* Mobile */}
                                        <div className=" md:hidden p-4 border-t border-[#253244] space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className={`text-[11px] px-3 py-1 rounded-md border ${colors[endpoint.method]}`}>
                                                    {endpoint.method}
                                                </span>

                                                <span className="text-sm text-zinc-400">
                                                    {endpoint.auth}
                                                </span>

                                            </div>

                                            <div>
                                                <p className="text-sm text-white break-all">
                                                    {endpoint.url}
                                                </p>

                                                <p className="text-xs text-zinc-500 mt-1">
                                                    {endpoint.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
                        <p className="text-sm text-zinc-400">
                            Page {page} of {totalPages}
                        </p>
                        <div className="flex gap-2">

                            <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)} className="px-3 py-2 border border-[#253244] rounded-lg text-sm text-zinc-400 disabled:opacity-40">
                                Previous
                            </button>

                            <button disabled={page === totalPages} onClick={() => setPage((prev) => prev + 1)} className="px-3 py-2 border border-[#253244] rounded-lg text-sm text-zinc-400 disabled:opacity-40">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sensitive Data Findings */}

            <div className="border border-[#253244] bg-[#0E1827] rounded-xl mt-6 mb-5">
                {/* Header */}
                <div className="p-4 border-b border-[#253244]">
                    <h2 className="text-lg font-medium text-white">
                        Sensitive Data Findings
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                        Keys matching known sensitive patterns in headers, query, and body
                    </p>
                </div>

                <div className="p-4">
                    {/* Summary */}
                    <div className="flex flex-wrap gap-3 mb-5">
                        <span className="px-3 py-1 rounded-md border border-red-900 bg-red-950/20 text-red-400 text-sm">
                            High: {
                                analysis.sensitive_data.filter( item => item.severity === "High").length
                            }
                        </span>

                        <span className="px-3 py-1 rounded-md border border-yellow-900 bg-yellow-950/20 text-yellow-400 text-sm">
                            Medium: {
                                analysis.sensitive_data.filter(item => item.severity === "Medium").length
                            }
                        </span>

                        <span className="px-3 py-1 rounded-md border border-zinc-700 text-zinc-400 text-sm">
                            Low: {
                                analysis.sensitive_data.filter(item => item.severity === "Low").length
                            }
                        </span>
                    </div>

                    {/* Findings */}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                        {analysis.sensitive_data.map((item, index) => (
                            <div key={index} className="border border-yellow-900/40 bg-yellow-950/5 rounded-md px-4 py-3 flex flex-col sm:flex-row gap-3 sm:items-start sm:justify-between">

                                <div className="flex gap-3 min-w-0">
                                    <FiAlertTriangle size={18} className={item.severity === "High"? "text-red-500 mt-0.5": "text-yellow-500 mt-0.5"}/>

                                    <div className="min-w-0">
                                        <p className="text-[15px] text-white leading-none">
                                            {item.key}
                                        </p>

                                        <p className="text-[13px] text-zinc-400 mt-2 break-all leading-5">
                                            {item.location}
                                            {" · "}
                                            {item.method}
                                            {" "}
                                            {item.endpoint}

                                        </p>
                                    </div>
                                </div>

                                <span className={`px-2.5 py-1 rounded-md text-xs self-end sm:self-auto ${item.severity === "High"? "bg-red-950 text-red-400": "bg-yellow-950 text-yellow-400"}`}>
                                    {item.severity}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;