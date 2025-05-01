import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ScanForm } from '../ScanForm';

describe('ScanForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders form elements correctly', () => {
    render(<ScanForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/website url/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/https:\/\/example.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start scan/i })).toBeInTheDocument();
  });

  it('shows error for empty URL', async () => {
    render(<ScanForm onSubmit={mockOnSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /start scan/i }));
    
    expect(await screen.findByText(/please enter a url/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error for invalid URL', async () => {
    render(<ScanForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByLabelText(/website url/i);
    fireEvent.change(input, { target: { value: 'invalid-url' } });
    fireEvent.click(screen.getByRole('button', { name: /start scan/i }));
    
    expect(await screen.findByText(/please enter a valid url/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with valid URL', async () => {
    render(<ScanForm onSubmit={mockOnSubmit} />);
    
    const validUrl = 'https://example.com';
    const input = screen.getByLabelText(/website url/i);
    fireEvent.change(input, { target: { value: validUrl } });
    fireEvent.click(screen.getByRole('button', { name: /start scan/i }));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(validUrl);
    });
  });

  it('disables form while loading', () => {
    render(<ScanForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    expect(screen.getByLabelText(/website url/i)).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText(/scanning/i)).toBeInTheDocument();
  });

  it('shows error message when onSubmit fails', async () => {
    const error = new Error('API Error');
    mockOnSubmit.mockRejectedValue(error);
    
    render(<ScanForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByLabelText(/website url/i);
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /start scan/i }));
    
    expect(await screen.findByText(error.message)).toBeInTheDocument();
  });
}); 