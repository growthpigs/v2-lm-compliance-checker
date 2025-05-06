"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComplianceSection;
const jsx_runtime_1 = require("react/jsx-runtime");
// Simple implementation of ComplianceItemStatus
function ComplianceItemStatus({ status }) {
    if (status === "missing") {
        return (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-red-600 dark:text-red-400", children: "Missing" });
    }
    else if (status === "warning") {
        return (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-amber-600 dark:text-amber-400", children: "Warning" });
    }
    else {
        return (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-green-600 dark:text-green-400", children: "Present" });
    }
}
// Simple implementation of ComplianceItemInfoButton
function ComplianceItemInfoButton({ info, className = "" }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `relative ${className}`, title: info, children: (0, jsx_runtime_1.jsx)("button", { className: "w-4 h-4 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs hover:bg-gray-200", "aria-label": "More information", children: "i" }) }));
}
function ComplianceSection({ title, score, items, className = "", }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: `bg-white dark:bg-gray-800 rounded-lg shadow-sm ${className}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 px-3 py-1 rounded-md text-sm font-medium", children: ["Score: ", score] })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-4", children: items.map((item) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: `h-5 w-5 rounded-full mr-3 flex items-center justify-center ${item.status === "missing"
                                        ? "bg-red-100 dark:bg-red-900/30"
                                        : item.status === "warning"
                                            ? "bg-amber-100 dark:bg-amber-900/30"
                                            : "bg-green-100 dark:bg-green-900/30"}`, children: (0, jsx_runtime_1.jsx)("div", { className: `h-2 w-2 rounded-full ${item.status === "missing"
                                            ? "bg-red-600 dark:bg-red-400"
                                            : item.status === "warning"
                                                ? "bg-amber-600 dark:bg-amber-400"
                                                : "bg-green-600 dark:bg-green-400"}` }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-medium flex items-center", children: [item.title, item.info && ((0, jsx_runtime_1.jsx)(ComplianceItemInfoButton, { info: item.info, className: "ml-2" }))] })] }), (0, jsx_runtime_1.jsx)(ComplianceItemStatus, { status: item.status })] }, item.id))) })] }));
}
