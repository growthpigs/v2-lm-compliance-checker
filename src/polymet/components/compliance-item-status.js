"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComplianceItemStatus;
exports.ComplianceItemInfoButton = ComplianceItemInfoButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
function ComplianceItemStatus({ status, className = "", }) {
    // Define styling and icon based on status
    const getStatusConfig = () => {
        switch (status) {
            case "present":
                return {
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.CheckIcon, { className: "h-4 w-4" }),
                    text: "Present",
                    textColor: "text-green-600 dark:text-green-400",
                    bgColor: "bg-green-100 dark:bg-green-900/30",
                };
            case "specified":
                return {
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.CheckIcon, { className: "h-4 w-4" }),
                    text: "Specified",
                    textColor: "text-green-600 dark:text-green-400",
                    bgColor: "bg-green-100 dark:bg-green-900/30",
                };
            case "warning":
                return {
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircleIcon, { className: "h-4 w-4" }),
                    text: "Warning",
                    textColor: "text-amber-600 dark:text-amber-400",
                    bgColor: "bg-amber-100 dark:bg-amber-900/30",
                };
            case "missing":
            default:
                return {
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.XIcon, { className: "h-4 w-4" }),
                    text: "Missing",
                    textColor: "text-red-600 dark:text-red-400",
                    bgColor: "bg-red-100 dark:bg-red-900/30",
                };
        }
    };
    const { icon, text, textColor, bgColor } = getStatusConfig();
    return ((0, jsx_runtime_1.jsxs)("div", { className: `inline-flex items-center px-2 py-1 rounded-md ${bgColor} ${textColor} ${className}`, children: [icon, (0, jsx_runtime_1.jsx)("span", { className: "ml-1 text-sm font-medium", children: text })] }));
}
function ComplianceItemInfoButton({ info, className = "", }) {
    if (!info)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { className: `relative group ${className}`, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.HelpCircleIcon, { className: "h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg", children: info })] }));
}
