"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComplianceStatusBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const badge_1 = require("@/components/ui/badge");
function ComplianceStatusBadge({ status, issuesCount, className = "", }) {
    // Determine badge styling based on status
    const getBadgeStyles = () => {
        switch (status) {
            case "compliant":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            case "partially-compliant":
                return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
            case "non-compliant":
            default:
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
        }
    };
    // Get appropriate icon based on status
    const getIcon = () => {
        switch (status) {
            case "compliant":
                return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckIcon, { className: "h-5 w-5 mr-1" });
            default:
                return (0, jsx_runtime_1.jsx)(lucide_react_1.XIcon, { className: "h-5 w-5 mr-1" });
        }
    };
    // Format status text for display
    const getStatusText = () => {
        return status
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("-");
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: `flex flex-col items-start ${className}`, children: [(0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "outline", className: `flex items-center px-3 py-1.5 text-sm font-medium rounded-full ${getBadgeStyles()}`, children: [getIcon(), getStatusText()] }), issuesCount !== undefined && status !== "compliant" && ((0, jsx_runtime_1.jsxs)("span", { className: "mt-1 text-sm text-red-600 dark:text-red-400 font-medium", children: [issuesCount, " compliance ", issuesCount === 1 ? "issue" : "issues", " ", "identified"] }))] }));
}
