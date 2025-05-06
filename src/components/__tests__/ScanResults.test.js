"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const ScanResults_1 = require("../ScanResults");
const mockIssues = {
    accessibility: [
        {
            type: 'Image Alt Text',
            severity: 'high',
            message: 'Image missing alt text',
            location: '/about.html',
        },
        {
            type: 'Color Contrast',
            severity: 'medium',
            message: 'Insufficient color contrast',
            location: '/home.html',
        },
    ],
    privacy: [
        {
            type: 'Cookie Notice',
            severity: 'high',
            message: 'Missing cookie consent notice',
        },
    ],
    barAssociation: [
        {
            type: 'License Number',
            severity: 'medium',
            message: 'Bar license number not displayed',
        },
    ],
    canSpam: [
        {
            type: 'Unsubscribe Link',
            severity: 'low',
            message: 'Unsubscribe link not prominent enough',
        },
    ],
};
describe('ScanResults', () => {
    it('renders all category tabs with correct issue counts', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanResults_1.ScanResults, { ...mockIssues }));
        expect(react_1.screen.getByText('Accessibility (2)')).toBeInTheDocument();
        expect(react_1.screen.getByText('Privacy Policy (1)')).toBeInTheDocument();
        expect(react_1.screen.getByText('Bar Association (1)')).toBeInTheDocument();
        expect(react_1.screen.getByText('CAN-SPAM (1)')).toBeInTheDocument();
    });
    it('displays issues for the selected category', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanResults_1.ScanResults, { ...mockIssues }));
        // Default category is accessibility
        expect(react_1.screen.getByText('Image Alt Text')).toBeInTheDocument();
        expect(react_1.screen.getByText('Color Contrast')).toBeInTheDocument();
        // Switch to privacy category
        react_1.fireEvent.click(react_1.screen.getByText('Privacy Policy (1)'));
        expect(react_1.screen.getByText('Cookie Notice')).toBeInTheDocument();
    });
    it('filters issues by severity', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanResults_1.ScanResults, { ...mockIssues }));
        // There are two comboboxes: [0] is severity, [1] is sort
        const [severityFilter] = react_1.screen.getAllByRole('combobox');
        react_1.fireEvent.change(severityFilter, { target: { value: 'high' } });
        expect(react_1.screen.getByText('Image Alt Text')).toBeInTheDocument();
        expect(react_1.screen.queryByText('Color Contrast')).not.toBeInTheDocument();
    });
    it('sorts issues by severity', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanResults_1.ScanResults, { ...mockIssues }));
        const [, sortSelect] = react_1.screen.getAllByRole('combobox');
        react_1.fireEvent.change(sortSelect, { target: { value: 'severity' } });
        const issueItems = react_1.screen.getAllByTestId('issue-item');
        const issueTypes = issueItems.map(item => item.querySelector('span.text-sm')?.textContent || '');
        // High severity (Image Alt Text) should come before medium (Color Contrast)
        expect(issueTypes).toEqual(['Image Alt Text', 'Color Contrast']);
    });
    it('sorts issues by type', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanResults_1.ScanResults, { ...mockIssues }));
        const [, sortSelect] = react_1.screen.getAllByRole('combobox');
        react_1.fireEvent.change(sortSelect, { target: { value: 'type' } });
        const issueItems = react_1.screen.getAllByTestId('issue-item');
        const issueTypes = issueItems.map(item => item.querySelector('span.text-sm')?.textContent || '');
        // Alphabetical order: Color Contrast, Image Alt Text
        expect(issueTypes).toEqual(['Color Contrast', 'Image Alt Text']);
    });
    it('displays location when available', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanResults_1.ScanResults, { ...mockIssues }));
        expect(react_1.screen.getByText('Location: /about.html')).toBeInTheDocument();
        expect(react_1.screen.getByText('Location: /home.html')).toBeInTheDocument();
    });
    it('shows appropriate message when no issues match filters', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanResults_1.ScanResults, { ...mockIssues }));
        const [severityFilter] = react_1.screen.getAllByRole('combobox');
        react_1.fireEvent.change(severityFilter, { target: { value: 'low' } });
        expect(react_1.screen.getByText('No issues found with the current filters.')).toBeInTheDocument();
    });
    it('renders severity badges with correct colors', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanResults_1.ScanResults, { ...mockIssues }));
        // There are multiple elements with text 'High', filter for <span>
        const highSeveritySpans = react_1.screen.getAllByText('High').filter(el => el.tagName === 'SPAN');
        const mediumSeveritySpans = react_1.screen.getAllByText('Medium').filter(el => el.tagName === 'SPAN');
        expect(highSeveritySpans[0].className).toContain('bg-red-100');
        expect(mediumSeveritySpans[0].className).toContain('bg-yellow-100');
    });
});
