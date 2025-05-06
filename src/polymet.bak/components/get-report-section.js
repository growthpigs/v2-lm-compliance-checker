"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GetReportSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("../../components/ui/button");
function GetReportSection({ onGetReport = () => { }, className = "", }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: `bg-white dark:bg-gray-800 rounded-lg p-5 ${className}`, children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-2", children: "Get the report" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-300 mb-4", children: "View the report and get more info on our remediation solutions" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: onGetReport, className: "border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20", children: [(0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "mr-2 h-4 w-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), (0, jsx_runtime_1.jsx)("polyline", { points: "14 2 14 8 20 8" }), (0, jsx_runtime_1.jsx)("line", { x1: "16", y1: "13", x2: "8", y2: "13" }), (0, jsx_runtime_1.jsx)("line", { x1: "16", y1: "17", x2: "8", y2: "17" }), (0, jsx_runtime_1.jsx)("line", { x1: "10", y1: "9", x2: "8", y2: "9" })] }), "Get Free Report"] })] }));
}
