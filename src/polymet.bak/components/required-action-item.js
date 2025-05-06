"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RequiredActionItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("../../components/ui/button");
function RequiredActionItem({ title, description, severity, onGetHelp = () => { }, className = "", }) {
    // Define styling based on severity
    const getSeverityConfig = () => {
        switch (severity) {
            case "high":
                return {
                    icon: ((0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-red-600 dark:text-red-400", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("polygon", { points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" }), (0, jsx_runtime_1.jsx)("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), (0, jsx_runtime_1.jsx)("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })] })),
                    borderColor: "border-l-red-600 dark:border-l-red-500",
                };
            case "medium":
                return {
                    icon: ((0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-amber-600 dark:text-amber-400", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }), (0, jsx_runtime_1.jsx)("line", { x1: "12", y1: "9", x2: "12", y2: "13" }), (0, jsx_runtime_1.jsx)("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })] })),
                    borderColor: "border-l-amber-600 dark:border-l-amber-500",
                };
            case "low":
            default:
                return {
                    icon: ((0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-blue-600 dark:text-blue-400", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "10" }), (0, jsx_runtime_1.jsx)("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), (0, jsx_runtime_1.jsx)("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })] })),
                    borderColor: "border-l-blue-600 dark:border-l-blue-500",
                };
        }
    };
    const { icon, borderColor } = getSeverityConfig();
    return ((0, jsx_runtime_1.jsxs)("div", { className: `flex items-start p-4 border-l-4 bg-white dark:bg-gray-800 rounded-md shadow-sm ${borderColor} ${className}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "mr-4", children: icon }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-base font-semibold mb-1", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: description })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", onClick: onGetHelp, className: "whitespace-nowrap ml-4", children: "Get help" })] }));
}
