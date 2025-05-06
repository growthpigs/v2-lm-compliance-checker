"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const header_1 = __importDefault(require("@/polymet/components/header"));
const footer_1 = __importDefault(require("@/polymet/components/footer"));
function MainLayout({ children }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen flex flex-col bg-white dark:bg-gray-950", children: [(0, jsx_runtime_1.jsx)(header_1.default, {}), (0, jsx_runtime_1.jsx)("main", { className: "flex-grow", children: children }), (0, jsx_runtime_1.jsx)(footer_1.default, {})] }));
}
