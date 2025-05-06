"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetReportSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
function GetReportSection({ onGetReport, className = "", }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: `bg-white dark:bg-gray-800 rounded-lg p-5 ${className}`, children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-2", children: "Get the report" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-4", children: "View the report and get more info on our remediation solutions" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: onGetReport, className: "border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileTextIcon, { className: "mr-2 h-4 w-4" }), "Get Free Report"] })] }));
}
