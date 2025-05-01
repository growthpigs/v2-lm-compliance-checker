import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExportResults } from '../ExportResults';

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
    render(<ExportResults {...mockProps} />);
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'PDF Report' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'CSV File' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'JSON Data' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export Results' })).toBeInTheDocument();
  });

  it('generates CSV file with correct content', async () => {
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');
    
    render(<ExportResults {...mockProps} />);
    
    // Select CSV format
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'csv' } });
    
    // Click export button
    fireEvent.click(screen.getByRole('button', { name: 'Export Results' }));
    
    await waitFor(() => {
      expect(appendChildSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();
    });

    const link = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(link.download).toMatch(/compliance-scan-\d{4}-\d{2}-\d{2}\.csv/);
  });

  it('generates JSON file with correct content', async () => {
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');
    
    render(<ExportResults {...mockProps} />);
    
    // Select JSON format
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'json' } });
    
    // Click export button
    fireEvent.click(screen.getByRole('button', { name: 'Export Results' }));
    
    await waitFor(() => {
      expect(appendChildSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();
    });

    const link = appendChildSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(link.download).toMatch(/compliance-scan-\d{4}-\d{2}-\d{2}\.json/);
  });

  it('makes API call for PDF export', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      blob: () => Promise.resolve(new Blob()),
    });

    render(<ExportResults {...mockProps} />);
    
    // Select PDF format (default)
    fireEvent.click(screen.getByRole('button', { name: 'Export Results' }));
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `/api/v1/scans/${mockProps.scanId}/export/pdf`,
        expect.any(Object)
      );
    });
  });

  it('handles export errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Export failed'));

    render(<ExportResults {...mockProps} />);
    
    // Click export button
    fireEvent.click(screen.getByRole('button', { name: 'Export Results' }));
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Export failed:', expect.any(Error));
    });

    // Button should be enabled again after error
    expect(screen.getByRole('button')).not.toBeDisabled();
    
    consoleSpy.mockRestore();
  });

  it('disables controls while exporting', async () => {
    // Mock a slow API response
    global.fetch = jest.fn().mockImplementation(() => new Promise(() => {}));

    render(<ExportResults {...mockProps} />);
    
    // Click export button
    fireEvent.click(screen.getByRole('button', { name: 'Export Results' }));
    
    // Controls should be disabled and loading state shown
    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Exporting...')).toBeInTheDocument();
  });
}); 