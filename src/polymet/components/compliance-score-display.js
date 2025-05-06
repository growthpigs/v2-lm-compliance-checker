"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComplianceScoreDisplay;
const jsx_runtime_1 = require("react/jsx-runtime");
function ComplianceScoreDisplay({ score, className = "", }) {
    // Determine color based on score
    const getScoreColor = () => {
        if (score < 40)
            return "text-red-500";
        if (score < 70)
            return "text-amber-500";
        return "text-green-500";
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: `flex items-baseline ${className}`, children: [(0, jsx_runtime_1.jsxs)("span", { className: `text-5xl font-bold ${getScoreColor()}`, children: [score, "%"] }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-xl text-gray-600 dark:text-gray-300", children: "Compliance Score" })] }));
}
