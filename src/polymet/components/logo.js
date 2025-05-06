"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Logo;
const jsx_runtime_1 = require("react/jsx-runtime");
function Logo({ className = "", height = 94 }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: `flex items-center justify-center ${className}`, children: (0, jsx_runtime_1.jsx)("img", { src: "https://p129.p0.n0.cdn.zight.com/items/geuQwwwq/f7d9efe4-ed40-4a90-b537-064700bb38ca.svg?source=client&v=2c15211e8cd072bbfc32794cd20c1ab2", alt: "Legal Moustache Logo", className: "w-auto", style: { height: height ? `${height}px` : "auto" } }) }));
}
