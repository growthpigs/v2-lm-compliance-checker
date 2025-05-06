"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LandingPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const aurora_background_1 = __importDefault(require("../components/aurora-background"));
function LandingPage() {
    const [url, setUrl] = (0, react_1.useState)('');
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Simulate a scan process
            const scanResult = {
                url: url.toLowerCase().replace(/^https?:\/\//, ''),
                summary: {
                    totalIssues: 7,
                    jurisdiction: "California, United States"
                },
                screenshot: "https://picsum.photos/seed/lawfirm/800/600",
                issues: [
                    {
                        id: "1",
                        severity: "Critical",
                        title: "Missing Privacy Policy",
                        description: "California law requires a comprehensive privacy policy - CCPA Violation"
                    },
                    {
                        id: "2",
                        severity: "Critical",
                        title: "No Cookie Consent Banner",
                        description: "GDPR and CCPA require explicit cookie consent"
                    },
                    {
                        id: "3",
                        severity: "Serious",
                        title: "Incomplete Contact Information",
                        description: "Bar association rules require complete contact details"
                    },
                    {
                        id: "4",
                        severity: "Serious",
                        title: "Missing Disclaimer",
                        description: "Legal advertising disclaimer required by state bar"
                    }
                ]
            };
            // Store the scan result
            sessionStorage.setItem('scanResults', JSON.stringify(scanResult));
            // Navigate to results page
            navigate('/scan-results');
        }
        catch (error) {
            console.error('Scan failed:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)(aurora_background_1.default, { children: (0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen flex flex-col items-center justify-center px-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-8", children: (0, jsx_runtime_1.jsx)("img", { src: "https://storage.googleapis.com/legal-moustache/Logomark%20Legal%20Moustache.svg", alt: "Legal Moustache Logo", className: "w-16 h-16" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl w-full text-center", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-4xl sm:text-5xl font-bold text-white mb-4", children: "Is your law firm website compliant?" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xl text-white/80 mb-8", children: "Check your website for legal compliance issues in seconds" }), (0, jsx_runtime_1.jsx)("form", { onSubmit: handleSubmit, className: "max-w-xl mx-auto", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-4", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: url, onChange: (e) => setUrl(e.target.value), placeholder: "Enter your website URL", className: "flex-1 px-6 py-3 rounded-full text-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30", required: true }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: isLoading || !url, className: `px-8 py-3 rounded-full text-lg font-semibold transition
                  ${isLoading || !url
                                            ? 'bg-blue-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'} text-white`, children: isLoading ? 'Scanning...' : 'Scan & Fix' })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white", children: [(0, jsx_runtime_1.jsxs)("div", { className: "backdrop-blur-sm bg-white/10 rounded-xl p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold mb-2", children: "Quick Scan" }), (0, jsx_runtime_1.jsx)("p", { className: "text-white/70", children: "Comprehensive compliance check in under 60 seconds" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "backdrop-blur-sm bg-white/10 rounded-xl p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold mb-2", children: "Expert Analysis" }), (0, jsx_runtime_1.jsx)("p", { className: "text-white/70", children: "Professional compliance recommendations" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "backdrop-blur-sm bg-white/10 rounded-xl p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold mb-2", children: "Fix Issues" }), (0, jsx_runtime_1.jsx)("p", { className: "text-white/70", children: "Step-by-step guidance to resolve compliance issues" })] })] })] })] }) }));
}
