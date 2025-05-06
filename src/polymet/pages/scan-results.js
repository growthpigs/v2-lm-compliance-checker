"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearScanSessionData = void 0;
exports.default = ScanResults;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const aurora_background_1 = __importDefault(require("@/polymet/components/aurora-background"));
const get_free_instructions_section_1 = __importDefault(require("@/polymet/components/get-free-instructions-section"));
const get_report_section_1 = __importDefault(require("@/polymet/components/get-report-section"));
const required_action_item_1 = __importDefault(require("@/polymet/components/required-action-item"));
const compliance_section_1 = __importDefault(require("@/polymet/components/compliance-section"));
// Helper function to clear session storage (can be imported from a utils file in the future)
const clearScanSessionData = () => {
    console.log('[DEBUG] Clearing scan session data');
    sessionStorage.removeItem('scanResults');
    sessionStorage.removeItem('currentScanId');
    sessionStorage.removeItem('lastScanTimestamp');
};
exports.clearScanSessionData = clearScanSessionData;
function ScanResults() {
    console.log('[DEBUG] ScanResults component rendering');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [scanData, setScanData] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    // Handle navigation to instructions page
    const handleFixProblems = () => {
        console.log('[DEBUG] Navigating to instructions-promo page');
        navigate('/instructions-promo');
    };
    // Handle navigation to booking page
    const handleGetHelp = () => {
        console.log('[DEBUG] Navigating to booking page');
        navigate('/booking');
    };
    (0, react_1.useEffect)(() => {
        console.log('[DEBUG] ScanResults useEffect running');
        // Try to get scan results from sessionStorage
        const sessionData = sessionStorage.getItem('scanResults');
        let scanResult = null;
        if (sessionData) {
            try {
                console.log('[DEBUG] Found scan results in sessionStorage');
                scanResult = JSON.parse(sessionData);
            }
            catch (err) {
                console.error('[ERROR] Failed to parse scan results from sessionStorage:', err);
            }
        }
        // Get scanId from sessionStorage
        const scanId = sessionStorage.getItem('currentScanId');
        console.log('[DEBUG] scanId from sessionStorage:', scanId);
        if (scanResult) {
            console.log('[DEBUG] Using scan results from sessionStorage');
            // Map API data to the format expected by the UI
            const mappedData = mapApiDataToUiFormat(scanResult);
            setScanData(mappedData);
            setIsLoading(false);
        }
        else if (scanId) {
            // Fetch scan results from API using scanId
            console.log(`[DEBUG] Fetching scan results from API for ID: ${scanId}`);
            fetchScanResults(scanId);
        }
        else {
            // Redirect to home if no scanId - don't use mock data
            console.log('[DEBUG] No scanId or session data, redirecting to home');
            setError('No scan ID provided. Please start a new scan from the home page.');
            setIsLoading(false);
        }
    }, []);
    // Function to fetch scan results from API
    const fetchScanResults = async (scanId) => {
        try {
            setIsLoading(true);
            console.log(`[DEBUG] Fetching scan results from API: /api/v1/scans/${scanId}`);
            const response = await fetch(`/api/v1/scans/${scanId}`);
            console.log('[DEBUG] API response status:', response.status);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch scan results');
            }
            const apiData = await response.json();
            console.log('[DEBUG] Received API data:', apiData);
            // Map API data to the format expected by the UI
            const mappedData = mapApiDataToUiFormat(apiData);
            setScanData(mappedData);
        }
        catch (error) {
            console.error('[ERROR] Failed to fetch scan results:', error);
            setError('Failed to load scan results. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    // Function to map API data to UI format
    const mapApiDataToUiFormat = (apiData) => {
        console.log('[DEBUG] mapApiDataToUiFormat - Input data:', apiData);
        // Create a proper mapping from API data to UI data
        const mappedData = {
            url: apiData.url || 'example.com',
            status: apiData.status || 'completed',
            complianceScore: apiData.complianceScore || 50,
            jurisdiction: apiData.jurisdiction || 'Unknown',
            issuesCount: apiData.issues?.length || 0,
            summary: apiData.summary?.jurisdictionNote ||
                'Scan completed. Review the results below for details on compliance issues.',
            timestamp: apiData.timestamp || new Date().toISOString(),
            screenshot: apiData.screenshot || `https://picsum.photos/seed/${encodeURIComponent(apiData.url)}/600/400`,
        };
        console.log('[DEBUG] Initial mapped data:', JSON.stringify({
            url: mappedData.url,
            score: mappedData.complianceScore,
            jurisdiction: mappedData.jurisdiction,
            issuesCount: mappedData.issuesCount,
            summary: mappedData.summary,
            screenshot: mappedData.screenshot
        }));
        // Convert API issues to requiredActions format
        if (apiData.issues && Array.isArray(apiData.issues)) {
            console.log(`[DEBUG] Processing ${apiData.issues.length} issues from API data`);
            console.log('[DEBUG] Issues data:', JSON.stringify(apiData.issues.map(i => ({ id: i.id, title: i.title, severity: i.severity }))));
            const highPriorityIssues = apiData.issues
                .filter(issue => issue.severity === 'high')
                .map((issue, index) => ({
                id: issue.id || index + 1,
                title: issue.title || 'Compliance Issue',
                description: `${issue.description || ''} ${issue.legalReference ? `- ${issue.legalReference}` : ''} ${issue.penalty ? `- ${issue.penalty}` : ''}`,
                severity: issue.severity || 'medium'
            }));
            console.log(`[DEBUG] Created ${highPriorityIssues.length} high priority issues`);
            mappedData.requiredActions = {
                score: apiData.complianceScore || 50,
                items: highPriorityIssues
            };
            // Generate sections based on issue types
            const accessibilityIssues = apiData.issues.filter(issue => issue.id?.startsWith('a11y') ||
                issue.title?.toLowerCase().includes('accessibility') ||
                issue.title?.toLowerCase().includes('alt text') ||
                issue.title?.toLowerCase().includes('contrast') ||
                issue.title?.toLowerCase().includes('wcag'));
            const privacyIssues = apiData.issues.filter(issue => issue.id?.startsWith('privacy') ||
                issue.title?.toLowerCase().includes('privacy') ||
                issue.title?.toLowerCase().includes('data protection') ||
                issue.title?.toLowerCase().includes('cookie') ||
                issue.title?.toLowerCase().includes('gdpr') ||
                issue.title?.toLowerCase().includes('ccpa'));
            const aiIssues = apiData.issues.filter(issue => issue.id?.startsWith('ai') ||
                issue.id?.startsWith('plagiarism') ||
                issue.title?.toLowerCase().includes('ai') ||
                issue.title?.toLowerCase().includes('artificial intelligence') ||
                issue.title?.toLowerCase().includes('generative') ||
                issue.title?.toLowerCase().includes('plagiarism') ||
                issue.title?.toLowerCase().includes('content') ||
                issue.title?.toLowerCase().includes('copyright'));
            const emailIssues = apiData.issues.filter(issue => issue.id?.startsWith('email') ||
                issue.title?.toLowerCase().includes('email') ||
                issue.title?.toLowerCase().includes('unsubscribe') ||
                issue.title?.toLowerCase().includes('marketing') ||
                issue.title?.toLowerCase().includes('spam') ||
                issue.title?.toLowerCase().includes('newsletter'));
            // Legal compliance issues specifically for law firms
            const legalComplianceIssues = apiData.issues.filter(issue => issue.id?.startsWith('compliance') ||
                issue.title?.toLowerCase().includes('disclaimer') ||
                issue.title?.toLowerCase().includes('disclaimer') ||
                issue.title?.toLowerCase().includes('legal') ||
                issue.title?.toLowerCase().includes('state bar') ||
                issue.title?.toLowerCase().includes('attorney'));
            // Other compliance issues (that don't fit in the categories above)
            const otherComplianceIssues = apiData.issues.filter(issue => !accessibilityIssues.includes(issue) &&
                !privacyIssues.includes(issue) &&
                !aiIssues.includes(issue) &&
                !emailIssues.includes(issue) &&
                !legalComplianceIssues.includes(issue));
            console.log(`[DEBUG] Categorized issues - ` +
                `Accessibility: ${accessibilityIssues.length}, ` +
                `Privacy: ${privacyIssues.length}, ` +
                `AI: ${aiIssues.length}, ` +
                `Email: ${emailIssues.length}, ` +
                `Legal Compliance: ${legalComplianceIssues.length}, ` +
                `Other Compliance: ${otherComplianceIssues.length}`);
            // Create sections array with detailed logging
            console.log('[DEBUG] Creating UI sections from categorized issues');
            const sections = [
                accessibilityIssues.length > 0 ? {
                    id: 'accessibility',
                    title: 'Accessibility Compliance',
                    score: calculateSectionScore(accessibilityIssues, apiData.complianceScore || 50),
                    items: accessibilityIssues.map((issue, index) => ({
                        id: issue.id || `a11y-${index}`,
                        title: issue.title || 'Accessibility Issue',
                        status: issue.severity === 'high' ? 'error' : 'warning',
                        info: issue.description || 'An accessibility issue was detected'
                    }))
                } : null,
                privacyIssues.length > 0 ? {
                    id: 'privacy',
                    title: 'Privacy and Data Protection',
                    score: calculateSectionScore(privacyIssues, apiData.complianceScore || 50),
                    items: privacyIssues.map((issue, index) => ({
                        id: issue.id || `privacy-${index}`,
                        title: issue.title || 'Privacy Issue',
                        status: issue.severity === 'high' ? 'error' : 'warning',
                        info: issue.description || 'A privacy compliance issue was detected'
                    }))
                } : null,
                aiIssues.length > 0 ? {
                    id: 'ai',
                    title: 'AI and Content Compliance',
                    score: calculateSectionScore(aiIssues, apiData.complianceScore || 50),
                    items: aiIssues.map((issue, index) => ({
                        id: issue.id || `ai-${index}`,
                        title: issue.title || 'AI/Content Issue',
                        status: issue.severity === 'high' ? 'error' : 'warning',
                        info: issue.description || 'An AI or content compliance issue was detected'
                    }))
                } : null,
                emailIssues.length > 0 ? {
                    id: 'email',
                    title: 'Email Marketing Compliance',
                    score: calculateSectionScore(emailIssues, apiData.complianceScore || 50),
                    items: emailIssues.map((issue, index) => ({
                        id: issue.id || `email-${index}`,
                        title: issue.title || 'Email Compliance Issue',
                        status: issue.severity === 'high' ? 'error' : 'warning',
                        info: issue.description || 'An email marketing compliance issue was detected'
                    }))
                } : null,
                legalComplianceIssues.length > 0 ? {
                    id: 'legal',
                    title: 'Legal Practice Compliance',
                    score: calculateSectionScore(legalComplianceIssues, apiData.complianceScore || 50),
                    items: legalComplianceIssues.map((issue, index) => ({
                        id: issue.id || `legal-${index}`,
                        title: issue.title || 'Legal Compliance Issue',
                        status: issue.severity === 'high' ? 'error' : 'warning',
                        info: issue.description || 'A legal practice compliance issue was detected'
                    }))
                } : null,
                otherComplianceIssues.length > 0 ? {
                    id: 'other',
                    title: 'Other Compliance Issues',
                    score: calculateSectionScore(otherComplianceIssues, apiData.complianceScore || 50),
                    items: otherComplianceIssues.map((issue, index) => ({
                        id: issue.id || `compliance-${index}`,
                        title: issue.title || 'Compliance Issue',
                        status: issue.severity === 'high' ? 'error' : 'warning',
                        info: issue.description || 'A compliance issue was detected'
                    }))
                } : null
            ].filter(section => section !== null);
            // Helper function to calculate section score based on issues
            function calculateSectionScore(issues, baseScore) {
                if (!issues || issues.length === 0)
                    return baseScore;
                // Count high severity issues
                const highSeverityCount = issues.filter(i => i.severity === 'high').length;
                // Reduce score by 5 points for each high severity issue, min 40
                const adjustedScore = Math.max(40, baseScore - (highSeverityCount * 5));
                return adjustedScore;
            }
            mappedData.sections = sections;
            console.log(`[DEBUG] Created ${mappedData.sections.length} sections with data`);
            mappedData.sections.forEach((section, index) => {
                console.log(`[DEBUG] Section ${index + 1}: ${section.title} with ${section.items.length} items`);
            });
        }
        else {
            // Fallback to empty required actions and sections if no issues
            console.log('[DEBUG] No issues found in API data, using empty sections');
            mappedData.requiredActions = {
                score: apiData.complianceScore || 50,
                items: []
            };
            mappedData.sections = [];
        }
        console.log('[DEBUG] Final mappedData structure:', Object.keys(mappedData));
        return mappedData;
    };
    console.log('[DEBUG] scanData:', scanData);
    console.log('[DEBUG] isLoading:', isLoading);
    console.log('[DEBUG] error:', error);
    // Show loading state
    if (isLoading) {
        console.log('[DEBUG] Rendering loading state');
        return ((0, jsx_runtime_1.jsx)(aurora_background_1.default, { children: (0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold mb-2", children: "Loading Scan Results" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "Please wait while we load your scan results..." })] }) }) }));
    }
    // Show error state
    if (error) {
        return ((0, jsx_runtime_1.jsx)(aurora_background_1.default, { children: (0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-red-600 text-5xl mb-4", children: "\u26A0\uFE0F" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold mb-2 text-red-600", children: "Error Loading Results" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mb-4", children: error }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full", children: "Back to Home" })] }) }) }));
    }
    // Handle case where scan data is missing
    if (!scanData) {
        return ((0, jsx_runtime_1.jsx)(aurora_background_1.default, { children: (0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold mb-2", children: "No Scan Results" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 mb-4", children: "We couldn't find any scan results. Please try scanning again." }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full", children: "Back to Home" })] }) }) }));
    }
    // Extract data for rendering
    const { url, jurisdiction, summary, screenshot, requiredActions, sections, issuesCount, complianceScore } = scanData;
    return ((0, jsx_runtime_1.jsx)(aurora_background_1.default, { children: (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-4 right-8 z-20", children: (0, jsx_runtime_1.jsx)("img", { src: "https://storage.googleapis.com/legal-moustache/Logomark%20Legal%20Moustache.svg", alt: "Legal Moustache Logomark", className: "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-2 sm:px-4 md:px-8 max-w-7xl", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mt-8 mb-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-white w-8 h-8 rounded-full flex items-center justify-center mr-2 text-blue-900 font-bold", children: "A" }), (0, jsx_runtime_1.jsx)("span", { className: "text-white font-medium text-base sm:text-lg", children: url })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-start mb-2", children: (0, jsx_runtime_1.jsxs)("h1", { className: "text-2xl sm:text-3xl font-bold text-red-500 ml-5", children: [complianceScore, "% ", (0, jsx_runtime_1.jsx)("span", { className: "text-lg sm:text-xl", children: "Compliance Score" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-xl shadow-lg p-3 sm:p-5 mb-4 flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full md:w-5/12 flex flex-col justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-gray-100 px-2 py-1 flex items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1 mr-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 rounded-full bg-red-500" }), (0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 rounded-full bg-yellow-500" }), (0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 rounded-full bg-green-500" })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-gray-600 truncate", children: url })] }), screenshot && ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", { src: screenshot, alt: "Website screenshot", className: "w-full max-h-[140px] sm:max-h-[180px] md:max-h-[200px] object-cover", onError: (e) => {
                                                        // Enhanced error logging
                                                        const img = e.target;
                                                        console.log(`[IMAGE ERROR] Failed to load image: ${img.src}`);
                                                        console.log(`[IMAGE ERROR] Error type: ${e.type}`);
                                                        // Try to detect if it's one of our known domains
                                                        const domain = img.src.includes('blackbaylawyers') ? 'blackbaylawyers.com.au' :
                                                            img.src.includes('janofamilylaw') ? 'janofamilylaw.com.au' :
                                                                img.src.includes('nextlegal.law') ? 'nextlegal.law' : '';
                                                        console.log(`[IMAGE ERROR] Detected domain: ${domain || 'unknown'}`);
                                                        // Use a domain-specific fallback if possible
                                                        if (domain === 'blackbaylawyers.com.au') {
                                                            console.log(`[IMAGE ERROR] Using blackbaylawyers fallback`);
                                                            img.src = 'https://images.squarespace-cdn.com/content/v1/5f5b9c4eb3e2bc7ad6c07314/1600134333307-SLZEPFMVOHDYJ8S87LI5/BlackBay+Lawyers-02.jpg';
                                                        }
                                                        else if (domain === 'janofamilylaw.com.au') {
                                                            console.log(`[IMAGE ERROR] Using janofamilylaw fallback`);
                                                            img.src = 'https://cdn.australia247.info/assets/uploads/b2a0cd1fa1aacbf5db9f3bcc43cd6e3d_-queensland-brisbane-city-brisbane-city-jano-family-law-07-3063-2760html.jpg';
                                                        }
                                                        else if (domain === 'nextlegal.law') {
                                                            console.log(`[IMAGE ERROR] Using nextlegal fallback`);
                                                            // Using a different image format (JPG/PNG) for nextlegal.law instead of SVG
                                                            img.src = 'https://picsum.photos/id/345/600/400';
                                                        }
                                                        else {
                                                            // Use generic fallback
                                                            console.log(`[IMAGE ERROR] Using generic fallback`);
                                                            img.src = 'https://picsum.photos/600/400';
                                                        }
                                                    } }) })), !screenshot && ((0, jsx_runtime_1.jsx)("div", { className: "bg-gray-100 w-full h-[140px] sm:h-[180px] md:h-[200px] flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "Screenshot not available" }) }))] }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full md:w-7/12 flex flex-col justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center md:items-start justify-center h-full", children: [(0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center px-5 py-2 mb-2 rounded-full bg-red-50 border border-red-200", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-red-600 font-semibold text-lg mr-2", children: "Non-compliant" }), (0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5 text-red-500 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-red-500 text-base font-medium", children: [issuesCount, " compliance issues identified"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-gray-800 text-lg font-bold mb-2 mt-1", children: ["Jurisdiction:", " ", (0, jsx_runtime_1.jsx)("span", { className: "text-blue-900", children: jurisdiction })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-gray-700 text-base mb-4 leading-snug max-w-lg text-center md:text-left", children: typeof summary === 'string' ? summary : summary?.jurisdictionNote || 'Your website has compliance issues that need to be addressed.' }), (0, jsx_runtime_1.jsx)("button", { className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full text-base shadow transition mb-0", onClick: handleFixProblems, children: "Fix These Problems" })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-20 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "border border-gray-200 rounded-xl bg-white", children: (0, jsx_runtime_1.jsx)(get_free_instructions_section_1.default, { onFixProblems: handleFixProblems }) }), (0, jsx_runtime_1.jsx)("div", { className: "border border-gray-200 rounded-xl bg-white", children: (0, jsx_runtime_1.jsx)(get_report_section_1.default, {}) })] })] }), requiredActions && sections && ((0, jsx_runtime_1.jsx)("div", { className: "w-full bg-gray-50 pt-12 pb-1 relative z-10", style: {
                        marginTop: "-96px", // Bring this up so it sits halfway behind the button containers
                    }, children: (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-2 sm:px-4 md:px-8 max-w-7xl", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-8" }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-xl shadow-lg p-4 sm:p-5 mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-3", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-bold", children: "Required Actions" }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-red-50 text-red-800 px-3 py-1 rounded-md text-xs font-medium", children: ["Score: ", requiredActions.score] })] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: requiredActions.items.map((action, index) => ((0, jsx_runtime_1.jsx)(required_action_item_1.default, { title: action.title, description: action.description, severity: action.severity, onGetHelp: handleGetHelp }, action.id || `action-${index}`))) })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", children: sections.map((section, index) => ((0, jsx_runtime_1.jsx)(compliance_section_1.default, { title: section.title, score: section.score, items: section.items }, section.id || `section-${index}`))) })] }) }))] }) }));
}
