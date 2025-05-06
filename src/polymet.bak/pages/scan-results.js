"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScanResults;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const aurora_background_1 = __importDefault(require("../components/aurora-background"));
const website_screenshot_preview_1 = __importDefault(require("../components/website-screenshot-preview"));
const get_free_instructions_section_1 = __importDefault(require("../components/get-free-instructions-section"));
const get_report_section_1 = __importDefault(require("../components/get-report-section"));
const required_action_item_1 = __importDefault(require("../components/required-action-item"));
const compliance_section_1 = __importDefault(require("../components/compliance-section"));
// Get scan results from sessionStorage
const stored = sessionStorage.getItem('scanResults');
const scanResult = stored ? JSON.parse(stored) : null;
function ScanResults() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    // Destructure all fields with fallbacks
    const { url = '', jurisdiction = 'Not specified', summary = { totalIssues: 0 }, screenshot = '', issues = [], barAssociation = 'Not specified' } = scanResult || {};
    if (!scanResult) {
        return ((0, jsx_runtime_1.jsxs)("section", { className: "text-center py-8", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-red-600 mb-4", children: "No Scan Results Found" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => navigate("/"), className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600", children: "Start New Scan" })] }));
    }
    const score = Math.max(0, 100 - summary.totalIssues * 10);
    const issuesCount = summary.totalIssues;
    const complianceLabel = score === 100 ? "Compliant" : score >= 60 ? "Partially compliant" : "Non-compliant";
    // Group issues by type for compliance sections
    const sections = [
        {
            id: "critical",
            title: "Critical Issues",
            score: score,
            items: issues.filter(issue => issue.severity === "Critical").map(issue => ({
                id: issue.id,
                title: issue.title,
                status: "missing",
                info: issue.description
            }))
        },
        {
            id: "serious",
            title: "Serious Issues",
            score: score,
            items: issues.filter(issue => issue.severity === "Serious").map(issue => ({
                id: issue.id,
                title: issue.title,
                status: "missing",
                info: issue.description
            }))
        }
    ];
    // Required actions from critical and serious issues
    const requiredActions = {
        score: score,
        items: issues
            .filter(issue => ["Critical", "Serious"].includes(issue.severity))
            .map(issue => ({
            id: issue.id,
            title: issue.title,
            description: issue.description,
            severity: issue.severity === "Critical" ? "high" : "medium"
        }))
    };
    return ((0, jsx_runtime_1.jsx)(aurora_background_1.default, { children: (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-4 right-8 z-20", children: (0, jsx_runtime_1.jsx)("img", { src: "https://storage.googleapis.com/legal-moustache/Logomark%20Legal%20Moustache.svg", alt: "Legal Moustache Logomark", className: "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-2 sm:px-4 md:px-8 max-w-7xl", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mt-8 mb-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-white w-8 h-8 rounded-full flex items-center justify-center mr-2 text-blue-900 font-bold", children: url[0]?.toUpperCase() || 'W' }), (0, jsx_runtime_1.jsx)("span", { className: "text-white font-medium text-base sm:text-lg", children: url })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-start mb-2", children: (0, jsx_runtime_1.jsxs)("h1", { className: "text-2xl sm:text-3xl font-bold text-red-500 ml-5", children: [score, "% ", (0, jsx_runtime_1.jsx)("span", { className: "text-lg sm:text-xl", children: "Compliance Score" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-12", children: [screenshot && ((0, jsx_runtime_1.jsx)("div", { className: "w-full md:w-5/12", children: (0, jsx_runtime_1.jsx)(website_screenshot_preview_1.default, { url: url, screenshot: screenshot, altText: `Screenshot of ${url}` }) })), (0, jsx_runtime_1.jsx)("div", { className: "w-full md:w-7/12 flex flex-col justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center md:items-start justify-center h-full", children: [(0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center px-5 py-2 mb-2 rounded-full bg-red-50 border border-red-200", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-red-600 font-semibold text-lg mr-2", children: complianceLabel }), (0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5 text-red-500 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-red-500 text-base font-medium", children: [issuesCount, " compliance issues identified"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-gray-800 text-lg font-bold mb-2 mt-1", children: ["Jurisdiction:", " ", (0, jsx_runtime_1.jsx)("span", { className: "text-blue-900", children: jurisdiction })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-gray-800 text-lg font-bold mb-2", children: ["Bar Association:", " ", (0, jsx_runtime_1.jsx)("span", { className: "text-blue-900", children: barAssociation })] }), (0, jsx_runtime_1.jsx)("button", { className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full text-base shadow transition mb-0", children: "Fix These Problems" })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-20 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "border border-gray-200 rounded-xl bg-white", children: (0, jsx_runtime_1.jsx)(get_free_instructions_section_1.default, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "border border-gray-200 rounded-xl bg-white", children: (0, jsx_runtime_1.jsx)(get_report_section_1.default, {}) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full bg-gray-50 pt-12 pb-1 relative z-10", style: {
                        marginTop: "-96px",
                    }, children: (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-2 sm:px-4 md:px-8 max-w-7xl", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-8" }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-xl shadow-lg p-4 sm:p-5 mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-3", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-bold", children: "Required Actions" }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-red-50 text-red-800 px-3 py-1 rounded-md text-xs font-medium", children: ["Score: ", requiredActions.score] })] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: requiredActions.items.map((action) => ((0, jsx_runtime_1.jsx)(required_action_item_1.default, { title: action.title, description: action.description, severity: action.severity, onGetHelp: () => { } }, action.id))) })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", children: sections.map((section) => ((0, jsx_runtime_1.jsx)(compliance_section_1.default, { title: section.title, score: section.score, items: section.items }, section.id))) })] }) })] }) }));
}
