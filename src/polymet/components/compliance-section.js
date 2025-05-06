"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComplianceSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const compliance_item_status_1 = __importStar(require("@/polymet/components/compliance-item-status"));
function ComplianceSection({ title, score, items, className = "", }) {
    // Ensure items is an array, even if undefined or null
    const safeItems = Array.isArray(items) ? items : [];
    return ((0, jsx_runtime_1.jsxs)("div", { className: `bg-white dark:bg-gray-800 rounded-lg shadow-sm ${className}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 px-3 py-1 rounded-md text-sm font-medium", children: ["Score: ", score] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-4", children: [safeItems.length === 0 && ((0, jsx_runtime_1.jsx)("div", { className: "text-gray-500 text-sm text-center py-4", children: "No items to display" })), safeItems.map((item, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: `h-5 w-5 rounded-full mr-3 flex items-center justify-center ${item.status === "missing"
                                            ? "bg-red-100 dark:bg-red-900/30"
                                            : item.status === "warning"
                                                ? "bg-amber-100 dark:bg-amber-900/30"
                                                : "bg-green-100 dark:bg-green-900/30"}`, children: (0, jsx_runtime_1.jsx)("div", { className: `h-2 w-2 rounded-full ${item.status === "missing"
                                                ? "bg-red-600 dark:bg-red-400"
                                                : item.status === "warning"
                                                    ? "bg-amber-600 dark:bg-amber-400"
                                                    : "bg-green-600 dark:bg-green-400"}` }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-medium flex items-center", children: [item.title, item.info && ((0, jsx_runtime_1.jsx)(compliance_item_status_1.ComplianceItemInfoButton, { info: item.info, className: "ml-2" }))] })] }), (0, jsx_runtime_1.jsx)(compliance_item_status_1.default, { status: item.status })] }, item.id || `item-${index}`)))] })] }));
}
