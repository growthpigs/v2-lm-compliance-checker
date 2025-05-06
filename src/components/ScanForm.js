"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScanForm = ScanForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function ScanForm({ onSubmit, isLoading = false }) {
    const [url, setUrl] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)(null);
    const validateUrl = (url) => {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }
        if (!validateUrl(url)) {
            setError('Please enter a valid URL (e.g., https://example.com)');
            return;
        }
        try {
            await onSubmit(url);
            setUrl(''); // Clear form on success
        }
        catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to start scan');
        }
    };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "url", className: "block text-sm font-medium text-gray-700", children: "Website URL" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-1 relative rounded-md shadow-sm", children: (0, jsx_runtime_1.jsx)("input", { type: "text", id: "url", name: "url", value: url, onChange: (e) => setUrl(e.target.value), placeholder: "https://example.com", className: `block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none ${error
                                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`, disabled: isLoading }) }), error && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-red-600", role: "alert", children: error }))] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: isLoading, className: `w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`, children: isLoading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), (0, jsx_runtime_1.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Scanning..."] })) : ('Start Scan') })] }));
}
