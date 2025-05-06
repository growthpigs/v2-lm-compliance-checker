"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScanResults = ScanResults;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function ScanResults({ accessibility, privacy, barAssociation, canSpam }) {
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)('accessibility');
    const [severityFilter, setSeverityFilter] = (0, react_1.useState)('all');
    const [sortBy, setSortBy] = (0, react_1.useState)('severity');
    const categoryData = {
        accessibility,
        privacy,
        barAssociation,
        canSpam,
    };
    const categoryLabels = {
        accessibility: 'Accessibility',
        privacy: 'Privacy Policy',
        barAssociation: 'Bar Association',
        canSpam: 'CAN-SPAM',
    };
    const filteredAndSortedIssues = (0, react_1.useMemo)(() => {
        let issues = categoryData[selectedCategory];
        // Apply severity filter
        if (severityFilter !== 'all') {
            issues = issues.filter((issue) => issue.severity === severityFilter);
        }
        // Apply sorting
        return [...issues].sort((a, b) => {
            if (sortBy === 'severity') {
                const severityOrder = { high: 0, medium: 1, low: 2 };
                return severityOrder[a.severity] - severityOrder[b.severity];
            }
            // Sort by type
            return a.type.localeCompare(b.type);
        });
    }, [selectedCategory, severityFilter, sortBy, categoryData]);
    const totalIssues = (0, react_1.useMemo)(() => {
        return Object.entries(categoryData).reduce((acc, [category, issues]) => {
            acc[category] = issues.length;
            return acc;
        }, {});
    }, [categoryData]);
    const renderSeverityBadge = (severity) => {
        const colors = {
            high: 'bg-red-100 text-red-800',
            medium: 'bg-yellow-100 text-yellow-800',
            low: 'bg-green-100 text-green-800',
        };
        return ((0, jsx_runtime_1.jsx)("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[severity]}`, children: severity.charAt(0).toUpperCase() + severity.slice(1) }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white shadow rounded-lg", children: [(0, jsx_runtime_1.jsx)("div", { className: "border-b border-gray-200 p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "sm:flex sm:items-center sm:justify-between", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex space-x-4", children: Object.entries(categoryLabels).map(([key, label]) => ((0, jsx_runtime_1.jsxs)("button", { onClick: () => setSelectedCategory(key), className: `px-3 py-2 rounded-md text-sm font-medium ${selectedCategory === key
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-500 hover:text-gray-700'}`, children: [label, " (", totalIssues[key], ")"] }, key))) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3 sm:mt-0 sm:ml-4 flex space-x-4", children: [(0, jsx_runtime_1.jsxs)("select", { value: severityFilter, onChange: (e) => setSeverityFilter(e.target.value), className: "block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md", children: [(0, jsx_runtime_1.jsx)("option", { value: "all", children: "All Severities" }), (0, jsx_runtime_1.jsx)("option", { value: "high", children: "High" }), (0, jsx_runtime_1.jsx)("option", { value: "medium", children: "Medium" }), (0, jsx_runtime_1.jsx)("option", { value: "low", children: "Low" })] }), (0, jsx_runtime_1.jsxs)("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md", children: [(0, jsx_runtime_1.jsx)("option", { value: "severity", children: "Sort by Severity" }), (0, jsx_runtime_1.jsx)("option", { value: "type", children: "Sort by Type" })] })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "p-4", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: [categoryLabels[selectedCategory], " Issues"] }), filteredAndSortedIssues.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "No issues found with the current filters." })) : ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: filteredAndSortedIssues.map((issue, index) => ((0, jsx_runtime_1.jsx)("div", { className: "border border-gray-200 rounded-md p-4 hover:bg-gray-50", "data-testid": "issue-item", children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-start justify-between", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [renderSeverityBadge(issue.severity), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-gray-900", children: issue.type })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-gray-600", children: issue.message }), issue.location && ((0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-sm text-gray-500", children: ["Location: ", issue.location] }))] }) }) }, index))) }))] })] }));
}
