"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const ExportResults_1 = require("../ExportResults");
const mockIssues = {
    accessibility: [
        {
            type: 'Image Alt Text',
            severity: 'high',
            message: 'Image missing alt text',
            location: '/about.html',
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
const mockProps = {
    ...mockIssues,
    scanId: '123456',
    url: 'https://example.com',
    timestamp: '2024-03-20T12:00:00Z',
};
describe('ExportResults', () => {
    beforeEach(() => {
        // Mock window.URL.createObjectURL and window.URL.revokeObjectURL
        global.URL.createObjectURL = jest.fn(() => 'mock-url');
        global.URL.revokeObjectURL = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('renders export format selector and export button', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ExportResults_1.ExportResults, { ...mockProps }));
        expect(react_1.screen.getByRole('combobox')).toBeInTheDocument();
        expect(react_1.screen.getByRole('option', { name: 'PDF Report' })).toBeInTheDocument();
        expect(react_1.screen.getByRole('option', { name: 'CSV File' })).toBeInTheDocument();
        expect(react_1.screen.getByRole('option', { name: 'JSON Data' })).toBeInTheDocument();
        expect(react_1.screen.getByRole('button', { name: 'Export Results' })).toBeInTheDocument();
    });
    it('generates CSV file with correct content', async () => {
        const appendChildSpy = jest.spyOn(document.body, 'appendChild');
        const removeChildSpy = jest.spyOn(document.body, 'removeChild');
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ExportResults_1.ExportResults, { ...mockProps }));
        // Select CSV format
        react_1.fireEvent.change(react_1.screen.getByRole('combobox'), { target: { value: 'csv' } });
        // Click export button
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: 'Export Results' }));
        await (0, react_1.waitFor)(() => {
            expect(appendChildSpy).toHaveBeenCalled();
            expect(removeChildSpy).toHaveBeenCalled();
        });
        const link = appendChildSpy.mock.calls[0][0];
        expect(link.download).toMatch(/compliance-scan-\d{4}-\d{2}-\d{2}\.csv/);
    });
    it('generates JSON file with correct content', async () => {
        const appendChildSpy = jest.spyOn(document.body, 'appendChild');
        const removeChildSpy = jest.spyOn(document.body, 'removeChild');
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ExportResults_1.ExportResults, { ...mockProps }));
        // Select JSON format
        react_1.fireEvent.change(react_1.screen.getByRole('combobox'), { target: { value: 'json' } });
        // Click export button
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: 'Export Results' }));
        await (0, react_1.waitFor)(() => {
            expect(appendChildSpy).toHaveBeenCalled();
            expect(removeChildSpy).toHaveBeenCalled();
        });
        const link = appendChildSpy.mock.calls[0][0];
        expect(link.download).toMatch(/compliance-scan-\d{4}-\d{2}-\d{2}\.json/);
    });
    it('makes API call for PDF export', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            blob: () => Promise.resolve(new Blob()),
        });
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ExportResults_1.ExportResults, { ...mockProps }));
        // Select PDF format (default)
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: 'Export Results' }));
        await (0, react_1.waitFor)(() => {
            expect(fetch).toHaveBeenCalledWith(`/api/v1/scans/${mockProps.scanId}/export/pdf`, expect.any(Object));
        });
    });
    it('handles export errors gracefully', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        global.fetch = jest.fn().mockRejectedValueOnce(new Error('Export failed'));
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ExportResults_1.ExportResults, { ...mockProps }));
        // Click export button
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: 'Export Results' }));
        await (0, react_1.waitFor)(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Export failed:', expect.any(Error));
        });
        // Button should be enabled again after error
        expect(react_1.screen.getByRole('button')).not.toBeDisabled();
        consoleSpy.mockRestore();
    });
    it('disables controls while exporting', async () => {
        // Mock a slow API response
        global.fetch = jest.fn().mockImplementation(() => new Promise(() => { }));
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ExportResults_1.ExportResults, { ...mockProps }));
        // Click export button
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: 'Export Results' }));
        // Controls should be disabled and loading state shown
        expect(react_1.screen.getByRole('combobox')).toBeDisabled();
        expect(react_1.screen.getByRole('button')).toBeDisabled();
        expect(react_1.screen.getByText('Exporting...')).toBeInTheDocument();
    });
});
