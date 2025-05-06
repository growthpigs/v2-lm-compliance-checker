"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AIBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
function AIBadge({ className = "" }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `flex items-center justify-center ${className}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 gap-1.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-cyan-400 uppercase tracking-wide", children: "NEW:" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-yellow-400/90 rounded-full h-4 w-4 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.SparklesIcon, { className: "h-3 w-3 text-gray-900" }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-white", children: "AI Content & Plagiarism Check" })] })] }) }));
}
