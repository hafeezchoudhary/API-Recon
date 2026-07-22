import { RiShieldCheckLine } from "react-icons/ri";

const Navbar = () => {
    return (
        <nav className="w-full border-b border-[] bg-[#101C2C]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="h-16 flex items-center justify-between">

                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg border border-zinc-700 bg-cyan-500 flex items-center justify-center">
                            <RiShieldCheckLine size={22} className="text-black" />
                        </div>

                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold text-white">
                                APIRecon
                            </h1>

                            <span className="flex items-center px-3 py-1 mt-1 rounded-md bg-gray-700 border border-zinc-700 text-zinc-400 text-xs font-medium tracking-wide">
                                SECURITY
                            </span>
                        </div>
                    </div>

                    <div className="hidden sm:block">
                        <p className="text-sm text-zinc-400">
                            Postman Collection Security Analyzer
                        </p>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;