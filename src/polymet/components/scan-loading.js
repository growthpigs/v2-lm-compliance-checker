"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScanLoading;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const progress_1 = require("@/components/ui/progress");
// Log for debugging
console.log("[DEBUG] Imported Progress component");
function ScanLoading({ url, progress = 0, className = "", }) {
    console.log("[DEBUG] ScanLoading component rendering with progress:", progress);
    const [currentProgress, setCurrentProgress] = react_1.default.useState(progress);
    react_1.default.useEffect(() => {
        // Simulate progress if not provided or at 0
        if (progress === 0) {
            const timer = setTimeout(() => {
                setCurrentProgress((prevProgress) => {
                    // Slow down as we approach 100%
                    if (prevProgress >= 90) {
                        return prevProgress + 0.5;
                    }
                    else if (prevProgress >= 70) {
                        return prevProgress + 1;
                    }
                    else {
                        return prevProgress + 2;
                    }
                });
            }, 200);
            return () => clearTimeout(timer);
        }
        else {
            setCurrentProgress(progress);
        }
    }, [progress, currentProgress]);
    // Calculate which steps are complete
    const steps = [
        { name: "Analyzing website structure", threshold: 20 },
        { name: "Checking accessibility compliance", threshold: 40 },
        { name: "Reviewing legal requirements", threshold: 60 },
        { name: "Scanning for privacy notices", threshold: 80 },
        { name: "Checking AI content & plagiarism", threshold: 95 },
    ];
    const currentStep = steps.findIndex((step) => currentProgress < step.threshold);
    const activeStepIndex = currentStep === -1 ? steps.length - 1 : currentStep;
    return ((0, jsx_runtime_1.jsx)("div", { className: `bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 ${className}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl mx-auto", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-center mb-2", children: "Scanning Your Website" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-gray-600 dark:text-gray-300 text-center mb-8", children: ["We're analyzing ", (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: url }), " for compliance issues"] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: Math.min(currentProgress, 100), className: "h-2 mb-8" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: steps.map((step, index) => ((0, jsx_runtime_1.jsxs)("div", { className: `flex items-center ${index < activeStepIndex
                            ? "text-green-600 dark:text-green-400"
                            : index === activeStepIndex
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-400 dark:text-gray-500"}`, children: [(0, jsx_runtime_1.jsx)("div", { className: `h-6 w-6 rounded-full flex items-center justify-center mr-3 ${index < activeStepIndex
                                    ? "bg-green-100 dark:bg-green-900/30"
                                    : index === activeStepIndex
                                        ? "bg-blue-100 dark:bg-blue-900/30"
                                        : "bg-gray-100 dark:bg-gray-700"}`, children: index < activeStepIndex ? ((0, jsx_runtime_1.jsx)("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) })) : ((0, jsx_runtime_1.jsx)("div", { className: `h-2 w-2 rounded-full ${index === activeStepIndex
                                        ? "bg-blue-600 dark:bg-blue-400"
                                        : "bg-gray-400 dark:bg-gray-500"}` })) }), (0, jsx_runtime_1.jsx)("span", { className: `text-sm ${index < activeStepIndex
                                    ? "font-medium"
                                    : index === activeStepIndex
                                        ? "font-medium"
                                        : "font-normal"}`, children: step.name }), index === activeStepIndex && ((0, jsx_runtime_1.jsx)("div", { className: "ml-2 flex-shrink-0", children: (0, jsx_runtime_1.jsx)("span", { className: "inline-block h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" }) }))] }, index))) }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400 text-center mt-8", children: "This typically takes 20-30 seconds to complete" })] }) }));
}
