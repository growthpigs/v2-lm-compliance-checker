"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RequiredActionItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
function RequiredActionItem({ title, description, severity, onGetHelp, className = "", }) {
    // Define styling based on severity
    const getSeverityConfig = () => {
        switch (severity) {
            case "high":
                return {
                    icon: ((0, jsx_runtime_1.jsx)(lucide_react_1.AlertOctagonIcon, { className: "h-5 w-5 text-red-600 dark:text-red-400" })),
                    borderColor: "border-l-red-600 dark:border-l-red-500",
                };
            case "medium":
                return {
                    icon: ((0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangleIcon, { className: "h-5 w-5 text-amber-600 dark:text-amber-400" })),
                    borderColor: "border-l-amber-600 dark:border-l-amber-500",
                };
            case "low":
            default:
                return {
                    icon: ((0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircleIcon, { className: "h-5 w-5 text-blue-600 dark:text-blue-400" })),
                    borderColor: "border-l-blue-600 dark:border-l-blue-500",
                };
        }
    };
    const { icon, borderColor } = getSeverityConfig();
    return ((0, jsx_runtime_1.jsxs)("div", { className: `flex items-start p-4 border-l-4 bg-white dark:bg-gray-800 rounded-md shadow-sm ${borderColor} ${className}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "mr-4", children: icon }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-base font-semibold mb-1", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-300", children: description })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", onClick: onGetHelp, className: "whitespace-nowrap ml-4", children: "Get help" })] }));
}
