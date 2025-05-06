"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FeatureChecklist;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
function FeatureChecklist({ features, className = "", }) {
    return ((0, jsx_runtime_1.jsx)("ul", { className: `space-y-2 ${className}`, children: features.map((feature, index) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckIcon, { className: "h-5 w-5 text-green-500 mr-2 flex-shrink-0", strokeWidth: 3 }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm md:text-base text-gray-100", children: feature })] }, index))) }));
}
