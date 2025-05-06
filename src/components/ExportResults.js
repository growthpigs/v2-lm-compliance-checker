"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportResults = ExportResults;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function ExportResults({ accessibility, privacy, barAssociation, canSpam, scanId, url, timestamp, }) {
    const [isExporting, setIsExporting] = (0, react_1.useState)(false);
    const [exportFormat, setExportFormat] = (0, react_1.useState)('pdf');
    const generateCSV = () => {
        const headers = ['Category', 'Type', 'Severity', 'Message', 'Location'];
        const rows = [headers];
        const addIssues = (category, issues) => {
            issues.forEach((issue) => {
                rows.push([
                    category,
                    issue.type,
                    issue.severity,
                    issue.message,
                    issue.location || '',
                ]);
            });
        };
        addIssues('Accessibility', accessibility);
        addIssues('Privacy Policy', privacy);
        addIssues('Bar Association', barAssociation);
        addIssues('CAN-SPAM', canSpam);
        return rows.map((row) => row.join(',')).join('\n');
    };
    const generateJSON = () => {
        return JSON.stringify({
            scanId,
            url,
            timestamp,
            results: {
                accessibility,
                privacy,
                barAssociation,
                canSpam,
            },
        }, null, 2);
    };
    const handleExport = async () => {
        try {
            setIsExporting(true);
            let content;
            let filename;
            let type;
            const dateStr = new Date(timestamp).toISOString().split('T')[0];
            switch (exportFormat) {
                case 'csv':
                    content = generateCSV();
                    filename = `compliance-scan-${dateStr}.csv`;
                    type = 'text/csv';
                    break;
                case 'json':
                    content = generateJSON();
                    filename = `compliance-scan-${dateStr}.json`;
                    type = 'application/json';
                    break;
                case 'pdf':
                    // For PDF, we'll make an API call to generate it server-side
                    const response = await fetch(`/api/v1/scans/${scanId}/export/pdf`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            url,
                            timestamp,
                            results: {
                                accessibility,
                                privacy,
                                barAssociation,
                                canSpam,
                            },
                        }),
                    });
                    if (!response.ok) {
                        throw new Error('Failed to generate PDF');
                    }
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `compliance-scan-${dateStr}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                    return;
            }
            // For CSV and JSON, create and trigger download
            const blob = new Blob([content], { type });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
        catch (error) {
            console.error('Export failed:', error);
            // You might want to show an error notification here
        }
        finally {
            setIsExporting(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsxs)("select", { value: exportFormat, onChange: (e) => setExportFormat(e.target.value), className: "block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md", disabled: isExporting, children: [(0, jsx_runtime_1.jsx)("option", { value: "pdf", children: "PDF Report" }), (0, jsx_runtime_1.jsx)("option", { value: "csv", children: "CSV File" }), (0, jsx_runtime_1.jsx)("option", { value: "json", children: "JSON Data" })] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleExport, disabled: isExporting, className: `inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isExporting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`, children: isExporting ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), (0, jsx_runtime_1.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Exporting..."] })) : ('Export Results') })] }));
}
