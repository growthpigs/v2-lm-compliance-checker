"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetFreeInstructionsSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("../../components/ui/button");
function GetFreeInstructionsSection({ onFixProblems = () => { }, className = "", }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: `bg-green-50 dark:bg-green-900/20 rounded-lg p-5 ${className}`, children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-2", children: "Get Free Instructions" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-4", children: "Get clear, step-by-step guidance on how to fix your compliance issues instantly. No strings attached - access all solutions immediately without registration." }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: onFixProblems, className: "bg-green-600 hover:bg-green-700 text-white", children: ["Fix These Problems", (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "ml-2 h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: (0, jsx_runtime_1.jsx)("path", { d: "M5 12h14M12 5l7 7-7 7" }) })] })] }));
}
