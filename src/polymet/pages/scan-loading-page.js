"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScanLoadingPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const aurora_background_1 = __importDefault(require("@/polymet/components/aurora-background"));
const scan_loading_1 = __importDefault(require("@/polymet/components/scan-loading"));
const scan_results_1 = require("./scan-results");
function ScanLoadingPage() {
    const [searchParams] = (0, react_router_dom_1.useSearchParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [progress, setProgress] = (0, react_1.useState)(0);
    const [isComplete, setIsComplete] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [scanStatus, setScanStatus] = (0, react_1.useState)(null);
    // Extract URL from query params or session storage
    const urlParam = searchParams.get("url") || "";
    const url = urlParam || sessionStorage.getItem('currentScanUrl') || "smithjohnsonlaw.com";
    // Get scanId from session storage if it exists
    const scanId = sessionStorage.getItem('currentScanId');
    // Handler for canceling scan
    const handleCancelScan = () => {
        console.log("[DEBUG] Canceling scan");
        (0, scan_results_1.clearScanSessionData)();
        navigate('/');
    };
    (0, react_1.useEffect)(() => {
        console.log("[DEBUG] ScanLoadingPage mounted with URL:", url);
        console.log("[DEBUG] ScanId from sessionStorage:", scanId);
        if (!scanId) {
            console.log("[WARN] No scanId found in sessionStorage");
            // Continue with simulated progress since we don't have a real scan
        }
        // Track progress
        let timeoutId;
        let progressValue = 0;
        const updateProgress = () => {
            // Increment progress at different rates based on current value
            const increment = progressValue >= 90 ? 0.5 : progressValue >= 70 ? 1 : 2;
            progressValue = Math.min(progressValue + increment, 100);
            setProgress(progressValue);
            // Check scan status if we have a scanId
            if (scanId && (progressValue % 10 === 0 || progressValue >= 95)) {
                checkScanStatus(scanId);
            }
            // Continue updating until we reach 100% or scan is complete
            if (progressValue < 100 && !isComplete) {
                timeoutId = window.setTimeout(updateProgress, 200);
            }
            else if (progressValue >= 100 && !isComplete && !scanId) {
                // If we have no scanId, complete after reaching 100%
                setTimeout(() => setIsComplete(true), 500);
            }
        };
        // Function to check scan status from API
        const checkScanStatus = async (id) => {
            try {
                console.log(`[DEBUG] Checking scan status for ID: ${id}`);
                const response = await fetch(`/api/v1/scans/${id}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error(`[ERROR] Failed to fetch scan status: ${errorData.error || 'Unknown error'}`);
                    setError(errorData.error || 'Failed to fetch scan status');
                    return;
                }
                const result = await response.json();
                console.log(`[DEBUG] Scan status: ${result.status}`);
                console.log(`[DEBUG] Full result: ${JSON.stringify(result)}`);
                setScanStatus(result.status);
                if (result.status === 'completed') {
                    console.log('[DEBUG] Scan completed, storing results');
                    // Store scan results in sessionStorage for the results page
                    sessionStorage.setItem('scanResults', JSON.stringify(result));
                    setProgress(100);
                    setTimeout(() => setIsComplete(true), 500);
                }
                else if (result.status === 'failed') {
                    console.error('[ERROR] Scan failed:', result.error);
                    setError(result.error || 'Scan failed');
                }
            }
            catch (error) {
                console.error('[ERROR] Error checking scan status:', error);
                setError('Network error while checking scan status. Please try again.');
            }
        };
        // Start progress updates
        updateProgress();
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [url, scanId]);
    // Use Navigate component for redirection when scan is complete
    if (isComplete) {
        console.log('[DEBUG] Scan complete, navigating to results page');
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/scan-results", replace: true });
    }
    // Show error state if applicable
    if (error) {
        return ((0, jsx_runtime_1.jsx)(aurora_background_1.default, { children: (0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-4 py-8 max-w-7xl", children: (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mb-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-center mb-4 text-red-600", children: "Scan Error" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700 dark:text-gray-300 text-center mb-6", children: error }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full", children: "Try Again" }) })] }) }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(aurora_background_1.default, { children: (0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-4 py-8 max-w-7xl", children: (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mb-8", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl w-full", children: [(0, jsx_runtime_1.jsx)(scan_loading_1.default, { url: url, progress: progress }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mt-4", children: (0, jsx_runtime_1.jsx)("button", { onClick: handleCancelScan, className: "text-white hover:text-blue-200 text-sm underline", children: "Cancel Scan" }) })] }) }) }) }));
}
