"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuroraBackground;
const jsx_runtime_1 = require("react/jsx-runtime");
function AuroraBackground({ children, showAurora = true, }) {
    // style for vertical bars
    const barStyle = {
        position: "absolute",
        width: "4vw", // line thickness
        height: "200vh", // extend for smooth blur
        filter: "blur(80px)", // moderate blur
        mixBlendMode: "screen",
        opacity: 0.6,
        top: "-50vh", // center vertically around viewport
    };
    // color palette for bars
    const colors = [
        "#15054A",
        "#001264",
        "#003e7e",
        "#147fcf",
        "#5a24f2",
        "#33f4ff",
        "#ff69b4",
        "#ff8ae8",
        "#a356ff",
        "#66ffff",
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            position: "relative",
            minHeight: "100vh",
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#020024",
        }, children: [(0, jsx_runtime_1.jsx)("style", { jsx: true, global: true, children: `
        @keyframes moveRight {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes moveLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            filter: blur(60px);
          }
          50% {
            filter: blur(100px);
          }
        }
        @keyframes scan {
          0% {
            top: -200px;
          }
          100% {
            top: 100%;
          }
        }
      ` }), showAurora && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: {
                            position: "absolute",
                            top: "-200px",
                            left: 0,
                            width: "100%",
                            height: "200px",
                            background: "linear-gradient(to top, transparent, rgba(255,255,255,0.3))",
                            filter: "blur(12px)",
                            opacity: 0.3,
                            animation: "scan 8s linear infinite",
                            pointerEvents: "none",
                            zIndex: 1,
                        } }), (0, jsx_runtime_1.jsx)("div", { style: {
                            position: "absolute",
                            inset: 0,
                            transform: "rotate(30deg)",
                            transformOrigin: "top center",
                            pointerEvents: "none",
                        }, children: colors.map((color, i) => ((0, jsx_runtime_1.jsx)("div", { style: {
                                ...barStyle,
                                backgroundColor: color,
                                left: `${i * 10}%`,
                                animation: `${i % 2 === 0 ? "moveRight" : "moveLeft"} ${4 + i * 0.5}s linear infinite, pulse 6s ease-in-out infinite alternate`,
                            } }, i))) })] })), (0, jsx_runtime_1.jsx)("div", { style: { position: "relative", zIndex: 10, width: "100%" }, children: children })] }));
}
