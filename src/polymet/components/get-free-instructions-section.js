"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetFreeInstructionsSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
function GetFreeInstructionsSection({ onFixProblems, className = "", }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: `bg-green-50 dark:bg-green-900/20 rounded-lg p-5 ${className}`, children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-2", children: "Get Free Instructions" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-4", children: "Get clear, step-by-step guidance on how to fix your compliance issues instantly. No strings attached - access all solutions immediately without registration." }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: onFixProblems, className: "bg-green-600 hover:bg-green-700 text-white", children: ["Fix These Problems ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRightIcon, { className: "ml-2 h-4 w-4" })] })] }));
}
