"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LandingPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const aurora_background_1 = __importDefault(require("@/polymet/components/aurora-background"));
const stats_section_1 = __importDefault(require("@/polymet/components/stats-section"));
const why_compliance_section_1 = __importDefault(require("@/polymet/components/why-compliance-section"));
const ai_badge_1 = __importDefault(require("@/polymet/components/ai-badge"));
const scan_results_1 = require("./scan-results");
function LandingPage() {
    const [url, setUrl] = (0, react_1.useState)("");
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url)
            return;
        // Ensure URL has http/https prefix
        let formattedUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            formattedUrl = `https://${url}`;
        }
        console.log("[DEBUG] Form submitted with URL:", formattedUrl);
        // Clear any previous scan data to ensure fresh results
        (0, scan_results_1.clearScanSessionData)();
        setIsLoading(true);
        setError(null);
        try {
            console.log(`[DEBUG] Submitting scan for URL: ${formattedUrl}`);
            
            // Log API base URL
            const apiBaseUrl = import.meta.env.VITE_API_URL || '';
            console.log(`[DEBUG] API base URL: ${apiBaseUrl}`);
            
            // Using relative or absolute URL based on environment
            const fetchUrl = apiBaseUrl ? `${apiBaseUrl}/api/v1/scans` : '/api/v1/scans';
            console.log(`[DEBUG] Fetch URL: ${fetchUrl}`);
            
            // Make the POST request to start scan
            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: formattedUrl }),
            });
            
            console.log(`[DEBUG] Scan response status: ${response.status}`);
            
            // Handle non-OK responses
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[ERROR] Scan request failed: ${errorText}`);
                throw new Error(`Scan request failed: ${response.status} ${errorText}`);
            }
            
            // Parse response JSON
            let data;
            try {
                data = await response.json();
                console.log(`[DEBUG] Scan response data:`, data);
            } catch (jsonError) {
                console.error(`[ERROR] Failed to parse response JSON:`, jsonError);
                throw new Error('Invalid response from server');
            }
            
            // Make sure we have a scanId
            if (!data.id && !data.scanId) {
                console.error(`[ERROR] No scan ID in response:`, data);
                throw new Error('No scan ID received from server');
            }
            
            // Extract scan ID (handle both formats)
            const scanId = data.scanId || data.id;
            console.log(`[DEBUG] Started scan with ID: ${scanId}`);
            
            // Store scanId in sessionStorage for the loading page to use
            sessionStorage.setItem('currentScanId', scanId);
            sessionStorage.setItem('currentScanUrl', formattedUrl);
            // Navigate to the loading page with URL as query parameter
            console.log('[DEBUG] Navigating to loading page');
            navigate(`/scan-loading?id=${scanId}`);
        }
        catch (error) {
            console.error('[ERROR] Error starting scan:', error);
            setError(error.message || 'Failed to start scan. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(aurora_background_1.default, { children: (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-5 sm:px-8 md:px-12", children: [(0, jsx_runtime_1.jsx)("div", { className: "pt-8 sm:pt-12 md:pt-16 mb-3 flex justify-center", children: (0, jsx_runtime_1.jsx)("img", { src: "https://p129.p0.n0.cdn.zight.com/items/geuQwwwq/f7d9efe4-ed40-4a90-b537-064700bb38ca.svg?source=client&v=2c15211e8cd072bbfc32794cd20c1ab2", alt: "Legal Moustache Logo", className: "w-[70px] sm:w-[90px] md:w-[110px] lg:w-[90px] h-auto max-w-[80%]" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center mb-6 md:mb-8", children: [(0, jsx_runtime_1.jsx)("h1", { className: "font-bold text-white mb-3 md:mb-4\n              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl\n            ", children: "Is Your Law Firm Website Compliant?" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl sm:text-xl md:text-2xl lg:text-3xl font-medium text-blue-200 mb-4 max-w-3xl mx-auto px-4 leading-tight sm:leading-snug md:leading-tight", children: "Free Instant Legal & Accessibility Compliance Scan \u2013 Now with AI-powered Plagiarism Detection" }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mb-2", children: (0, jsx_runtime_1.jsx)(ai_badge_1.default, {}) })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full max-w-xl mx-auto mb-12", children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "bg-[#4169e1]/20 backdrop-blur-sm p-6 rounded-xl border border-[#4169e1]/30 shadow-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-2 mb-2", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Enter your website URL", className: "flex-1 px-4 py-2 rounded-md border border-blue-800/50 bg-white/10 text-white", value: url, onChange: (e) => setUrl(e.target.value), required: true }), (0, jsx_runtime_1.jsxs)("button", { type: "submit", disabled: isLoading || !url, className: `bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center ${isLoading || !url ? 'opacity-70 cursor-not-allowed' : ''}`, children: [isLoading ? 'SCANNING...' : 'SCAN & FIX', " ", (0, jsx_runtime_1.jsx)("span", { className: "ml-1", children: "\u2192" })] })] }), error && ((0, jsx_runtime_1.jsx)("div", { className: "text-red-300 text-sm mt-2", children: error })), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-blue-200 text-left pl-1", children: "Scan typically takes 20\u201330 seconds to complete. No email required. We provide solutions instantly with no strings attached." })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-center mb-8 mt-0", children: (0, jsx_runtime_1.jsx)("p", { className: "text-gray-200 max-w-[840px] mx-auto text-sm md:text-base mb-8", children: "Non-compliant websites pose significant risks. Bar associations are scrutinizing digital marketing more closely, while ADA-related lawsuits are increasing. The rise of AI-generated content also raises issues of originality and potential plagiarism. Our advanced scanner tackles these challenges directly." }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mb-12 mt-0 gap-x-12", children: (0, jsx_runtime_1.jsx)("table", { className: "border-collapse text-sm max-w-xl", children: (0, jsx_runtime_1.jsxs)("tbody", { children: [(0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { className: "pb-1.5 pr-6 align-top", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-green-400 mr-2 flex-shrink-0", children: (0, jsx_runtime_1.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: (0, jsx_runtime_1.jsx)("path", { d: "M4 8L7 11L12 5", stroke: "#4ADE80", strokeWidth: "2", strokeLinecap: "square" }) }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-white", children: "ABA Model Rules 7.1\u20137.5" })] }) }), (0, jsx_runtime_1.jsx)("td", { className: "pb-1.5 align-top", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-green-400 mr-2 flex-shrink-0", children: (0, jsx_runtime_1.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: (0, jsx_runtime_1.jsx)("path", { d: "M4 8L7 11L12 5", stroke: "#4ADE80", strokeWidth: "2", strokeLinecap: "square" }) }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-white", children: "ADA & WCAG accessibility standards" })] }) })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { className: "pb-1.5 pr-6 align-top", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-green-400 mr-2 flex-shrink-0", children: (0, jsx_runtime_1.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: (0, jsx_runtime_1.jsx)("path", { d: "M4 8L7 11L12 5", stroke: "#4ADE80", strokeWidth: "2", strokeLinecap: "square" }) }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-white", children: "FTC advertising guidelines" })] }) }), (0, jsx_runtime_1.jsx)("td", { className: "pb-1.5 align-top", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-green-400 mr-2 flex-shrink-0", children: (0, jsx_runtime_1.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: (0, jsx_runtime_1.jsx)("path", { d: "M4 8L7 11L12 5", stroke: "#4ADE80", strokeWidth: "2", strokeLinecap: "square" }) }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-white", children: "Privacy compliance requirements" })] }) })] }), (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { className: "pb-1.5 pr-6 align-top", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-green-400 mr-2 flex-shrink-0", children: (0, jsx_runtime_1.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: (0, jsx_runtime_1.jsx)("path", { d: "M4 8L7 11L12 5", stroke: "#4ADE80", strokeWidth: "2", strokeLinecap: "square" }) }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-white", children: "State bar advertising regulations" })] }) }), (0, jsx_runtime_1.jsx)("td", { className: "pb-1.5 align-top", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-green-400 mr-2 flex-shrink-0", children: (0, jsx_runtime_1.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: (0, jsx_runtime_1.jsx)("path", { d: "M4 8L7 11L12 5", stroke: "#4ADE80", strokeWidth: "2", strokeLinecap: "square" }) }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-white", children: "AI-generated and plagiarized content detection" })] }) })] })] }) }) })] }) }), (0, jsx_runtime_1.jsx)(stats_section_1.default, {}), (0, jsx_runtime_1.jsx)(why_compliance_section_1.default, {})] }));
}
