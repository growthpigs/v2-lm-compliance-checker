"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UrlScanForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const lucide_react_1 = require("lucide-react");
function UrlScanForm({ className = "" }) {
    const [url, setUrl] = (0, react_1.useState)("");
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url)
            return;
        // Simulate loading state
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            // In a real app, you would handle the form submission here
            console.log("Scanning URL:", url);
        }, 1500);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: `w-full max-w-2xl ${className}`, children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "relative", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-white text-sm md:text-base mb-2", children: "Enter your website URL to start your free compliance scan:" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "relative flex-grow", children: (0, jsx_runtime_1.jsx)(input_1.Input, { type: "url", placeholder: "Enter your website URL", value: url, onChange: (e) => setUrl(e.target.value), className: "w-full h-12 pl-4 pr-4 text-base bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800", required: true }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: isLoading || !url, className: "h-12 px-6 font-bold tracking-wider bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center", children: isLoading ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" }), (0, jsx_runtime_1.jsx)("span", { children: "SCANNING..." })] })) : ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center", children: ["SCAN NOW", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRightIcon, { className: "ml-2 h-4 w-4" })] })) })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-300 text-xs mt-2", children: "Scan typically takes 20\u201330 seconds to complete" })] }) }));
}
