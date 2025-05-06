"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const ScanForm_1 = require("./components/ScanForm");
const ScanResults_1 = require("./components/ScanResults");
const ExportResults_1 = require("./components/ExportResults");
const useScanApi_1 = require("./hooks/useScanApi");
const scan_results_1 = __importDefault(require("./polymet/pages/scan-results"));
const landing_page_1 = __importDefault(require("./polymet/pages/landing-page"));
const scan_loading_page_1 = __importDefault(require("./polymet/pages/scan-loading-page"));
const instructions_promo_1 = __importDefault(require("./polymet/pages/instructions-promo"));
const booking_page_1 = __importDefault(require("./polymet/pages/booking-page"));
// Log routing configuration
console.log("[DEBUG] App.tsx is initializing with routes");
function App() {
    const { startScan, isLoading, scanId, error, scanResult, isFetchingResults } = (0, useScanApi_1.useScanApi)();
    console.log("[DEBUG] App rendering with useScanApi state:", {
        isLoading,
        hasScanId: !!scanId,
        hasError: !!error,
        hasResult: !!scanResult
    });
    const handleScanSubmit = async (url) => {
        try {
            console.log("[DEBUG] handleScanSubmit called with URL:", url);
            await startScan(url);
        }
        catch (error) {
            console.error("[ERROR] Error in handleScanSubmit:", error);
            // Error is already handled by the hook
        }
    };
    const renderScanStatus = () => {
        if (error) {
            return ((0, jsx_runtime_1.jsx)("div", { className: "mt-4 bg-red-50 border border-red-200 rounded-md p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0", children: (0, jsx_runtime_1.jsx)("svg", { className: "h-5 w-5 text-red-400", viewBox: "0 0 20 20", fill: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-3", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-medium text-red-800", children: "Error" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 text-sm text-red-700", children: error })] })] }) }));
        }
        if (!scanId)
            return null;
        if (isFetchingResults || scanResult?.status === 'pending') {
            return ((0, jsx_runtime_1.jsx)("div", { className: "mt-4 bg-blue-50 border border-blue-200 rounded-md p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0", children: (0, jsx_runtime_1.jsxs)("svg", { className: "animate-spin h-5 w-5 text-blue-400", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }), (0, jsx_runtime_1.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-3", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-medium text-blue-800", children: "Scan in Progress" }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2 text-sm text-blue-700", children: ["Scan ID: ", scanId, (0, jsx_runtime_1.jsx)("br", {}), "Analyzing website for compliance issues..."] })] })] }) }));
        }
        if (scanResult?.status === 'completed' && scanResult.results) {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "mt-4 space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-green-50 border border-green-200 rounded-md p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0", children: (0, jsx_runtime_1.jsx)("svg", { className: "h-5 w-5 text-green-400", viewBox: "0 0 20 20", fill: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-3", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-medium text-green-800", children: "Scan Completed" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 text-sm text-green-700", children: "All checks have been completed. Review the results below." })] })] }), (0, jsx_runtime_1.jsx)(ExportResults_1.ExportResults, { ...scanResult.results, scanId: scanId, url: scanResult.url, timestamp: scanResult.timestamp })] }) }), (0, jsx_runtime_1.jsx)(ScanResults_1.ScanResults, { ...scanResult.results })] }));
        }
        if (scanResult?.status === 'failed') {
            return ((0, jsx_runtime_1.jsx)("div", { className: "mt-4 bg-red-50 border border-red-200 rounded-md p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0", children: (0, jsx_runtime_1.jsx)("svg", { className: "h-5 w-5 text-red-400", viewBox: "0 0 20 20", fill: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-3", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-sm font-medium text-red-800", children: "Scan Failed" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 text-sm text-red-700", children: scanResult.error || 'An unexpected error occurred during the scan.' })] })] }) }));
        }
        return null;
    };
    const HomePage = () => ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-3xl mx-auto", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-extrabold text-gray-900", children: "Legal Website Compliance Checker" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-gray-600", children: "Enter a website URL to check for legal compliance issues" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-8", children: [(0, jsx_runtime_1.jsx)(ScanForm_1.ScanForm, { onSubmit: handleScanSubmit, isLoading: isLoading }), renderScanStatus()] })] }) }));
    // Log when the component renders routes
    console.log("[DEBUG] App.tsx rendering Routes");
    console.log("[DEBUG] Routes being defined:", [
        { path: "/", component: "LandingPage" },
        { path: "/scan-results", component: "PolymetScanResults" },
        { path: "/scan-loading", component: "ScanLoadingPage" },
        { path: "/instructions-promo", component: "InstructionsPromo" },
        { path: "/booking", component: "BookingPage" }
    ]);
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { basename: "/", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(landing_page_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/scan-results", element: (0, jsx_runtime_1.jsx)(scan_results_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/scan-loading", element: (0, jsx_runtime_1.jsx)(scan_loading_page_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/instructions-promo", element: (0, jsx_runtime_1.jsx)(instructions_promo_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/booking", element: (0, jsx_runtime_1.jsx)(booking_page_1.default, {}) })] }) }));
}
exports.default = App;
