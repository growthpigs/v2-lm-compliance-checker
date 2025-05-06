"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ActionButtons;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
function ActionButtons({ onFixProblems, onGetReport, className = "", }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: `flex flex-col sm:flex-row gap-4 ${className}`, children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: onFixProblems, className: "flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6", children: ["Fix These Problems ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRightIcon, { className: "ml-2 h-5 w-5" })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: onGetReport, className: "flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 py-6", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileTextIcon, { className: "mr-2 h-5 w-5" }), "Get Free Report"] })] }));
}
