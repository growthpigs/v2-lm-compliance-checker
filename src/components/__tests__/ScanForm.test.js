"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
const ScanForm_1 = require("../ScanForm");
describe('ScanForm', () => {
    const mockOnSubmit = jest.fn();
    beforeEach(() => {
        mockOnSubmit.mockClear();
    });
    it('renders form elements correctly', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanForm_1.ScanForm, { onSubmit: mockOnSubmit }));
        expect(react_1.screen.getByLabelText(/website url/i)).toBeInTheDocument();
        expect(react_1.screen.getByPlaceholderText(/https:\/\/example.com/i)).toBeInTheDocument();
        expect(react_1.screen.getByRole('button', { name: /start scan/i })).toBeInTheDocument();
    });
    it('shows error for empty URL', async () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanForm_1.ScanForm, { onSubmit: mockOnSubmit }));
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /start scan/i }));
        expect(await react_1.screen.findByText(/please enter a url/i)).toBeInTheDocument();
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });
    it('shows error for invalid URL', async () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanForm_1.ScanForm, { onSubmit: mockOnSubmit }));
        const input = react_1.screen.getByLabelText(/website url/i);
        react_1.fireEvent.change(input, { target: { value: 'invalid-url' } });
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /start scan/i }));
        expect(await react_1.screen.findByText(/please enter a valid url/i)).toBeInTheDocument();
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });
    it('calls onSubmit with valid URL', async () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanForm_1.ScanForm, { onSubmit: mockOnSubmit }));
        const validUrl = 'https://example.com';
        const input = react_1.screen.getByLabelText(/website url/i);
        react_1.fireEvent.change(input, { target: { value: validUrl } });
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /start scan/i }));
        await (0, react_1.waitFor)(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith(validUrl);
        });
    });
    it('disables form while loading', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanForm_1.ScanForm, { onSubmit: mockOnSubmit, isLoading: true }));
        expect(react_1.screen.getByLabelText(/website url/i)).toBeDisabled();
        expect(react_1.screen.getByRole('button')).toBeDisabled();
        expect(react_1.screen.getByText(/scanning/i)).toBeInTheDocument();
    });
    it('shows error message when onSubmit fails', async () => {
        const error = new Error('API Error');
        mockOnSubmit.mockRejectedValue(error);
        (0, react_1.render)((0, jsx_runtime_1.jsx)(ScanForm_1.ScanForm, { onSubmit: mockOnSubmit }));
        const input = react_1.screen.getByLabelText(/website url/i);
        react_1.fireEvent.change(input, { target: { value: 'https://example.com' } });
        react_1.fireEvent.click(react_1.screen.getByRole('button', { name: /start scan/i }));
        expect(await react_1.screen.findByText(error.message)).toBeInTheDocument();
    });
});
