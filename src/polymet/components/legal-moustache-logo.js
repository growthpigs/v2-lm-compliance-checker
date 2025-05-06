"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LegalMoustacheLogo;
const jsx_runtime_1 = require("react/jsx-runtime");
function LegalMoustacheLogo({ className = "", height = 80, type = "stacked", }) {
    const logos = {
        stacked: "https://storage.googleapis.com/legal-moustache/Logo%20Legal%20Moustache%20COLOR.svg",
        long: "https://storage.googleapis.com/legal-moustache/Logolong%20Legal%20Moustache%20COLOR.svg",
        mark: "https://storage.googleapis.com/legal-moustache/Logomark%20Legal%20Moustache.svg",
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: `flex justify-center pt-6 mb-4 ${className}`, children: (0, jsx_runtime_1.jsx)("img", { src: logos[type], alt: "Legal Moustache Logo", height: height, className: "h-auto w-auto max-h-[80px]" }) }));
}
