"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const App_1 = __importDefault(require("../App"));
// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;
describe('App', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });
    it('renders the main heading and form', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}));
        expect(react_1.screen.getByText(/legal website compliance checker/i)).toBeInTheDocument();
        expect(react_1.screen.getByPlaceholderText(/https:\/\/example.com/i)).toBeInTheDocument();
        expect(react_1.screen.getByRole('button', { name: /start scan/i })).toBeInTheDocument();
    });
    it('handles successful scan submission', async () => {
        const mockScanId = '123-456';
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ scanId: mockScanId }),
        });
        (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}));
        const input = react_1.screen.getByLabelText(/website url/i);
        react_1.fireEvent.change(input, { target: { value: 'https://example.com' } });
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /start scan/i }));
        // Check loading state
        expect(react_1.screen.getByText(/scanning/i)).toBeInTheDocument();
        // Wait for success message
        await (0, react_1.waitFor)(() => {
            expect(react_1.screen.getByText(new RegExp(mockScanId))).toBeInTheDocument();
        });
        // Verify fetch call
        expect(mockFetch).toHaveBeenCalledWith('/api/v1/scans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: 'https://example.com' }),
        });
    });
    it('handles API error', async () => {
        const errorMessage = 'API Error';
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: errorMessage }),
        });
        (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}));
        const input = react_1.screen.getByLabelText(/website url/i);
        react_1.fireEvent.change(input, { target: { value: 'https://example.com' } });
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /start scan/i }));
        // Wait for error message
        await (0, react_1.waitFor)(() => {
            expect(react_1.screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
    it('handles network error', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));
        (0, react_1.render)((0, jsx_runtime_1.jsx)(App_1.default, {}));
        const input = react_1.screen.getByLabelText(/website url/i);
        react_1.fireEvent.change(input, { target: { value: 'https://example.com' } });
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /start scan/i }));
        // Wait for error message
        await (0, react_1.waitFor)(() => {
            expect(react_1.screen.getByText(/network error/i)).toBeInTheDocument();
        });
    });
});
