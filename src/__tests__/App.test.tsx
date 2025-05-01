import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('App', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('renders the main heading and form', () => {
    render(<App />);
    
    expect(screen.getByText(/legal website compliance checker/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/https:\/\/example.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start scan/i })).toBeInTheDocument();
  });

  it('handles successful scan submission', async () => {
    const mockScanId = '123-456';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ scanId: mockScanId }),
    });

    render(<App />);
    
    const input = screen.getByLabelText(/website url/i);
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /start scan/i }));

    // Check loading state
    expect(screen.getByText(/scanning/i)).toBeInTheDocument();

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(new RegExp(mockScanId))).toBeInTheDocument();
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

    render(<App />);
    
    const input = screen.getByLabelText(/website url/i);
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /start scan/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('handles network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);
    
    const input = screen.getByLabelText(/website url/i);
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /start scan/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });
}); 