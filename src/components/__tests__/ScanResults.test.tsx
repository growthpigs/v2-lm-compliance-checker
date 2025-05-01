import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ScanResults } from '../ScanResults';

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
} as const;

describe('ScanResults', () => {
  it('renders all category tabs with correct issue counts', () => {
    render(<ScanResults {...mockIssues} />);
    
    expect(screen.getByText('Accessibility (2)')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy (1)')).toBeInTheDocument();
    expect(screen.getByText('Bar Association (1)')).toBeInTheDocument();
    expect(screen.getByText('CAN-SPAM (1)')).toBeInTheDocument();
  });

  it('displays issues for the selected category', () => {
    render(<ScanResults {...mockIssues} />);
    
    // Default category is accessibility
    expect(screen.getByText('Image Alt Text')).toBeInTheDocument();
    expect(screen.getByText('Color Contrast')).toBeInTheDocument();

    // Switch to privacy category
    fireEvent.click(screen.getByText('Privacy Policy (1)'));
    expect(screen.getByText('Cookie Notice')).toBeInTheDocument();
  });

  it('filters issues by severity', () => {
    render(<ScanResults {...mockIssues} />);
    // There are two comboboxes: [0] is severity, [1] is sort
    const [severityFilter] = screen.getAllByRole('combobox');
    fireEvent.change(severityFilter, { target: { value: 'high' } });
    expect(screen.getByText('Image Alt Text')).toBeInTheDocument();
    expect(screen.queryByText('Color Contrast')).not.toBeInTheDocument();
  });

  it('sorts issues by severity', () => {
    render(<ScanResults {...mockIssues} />);
    const [, sortSelect] = screen.getAllByRole('combobox');
    fireEvent.change(sortSelect, { target: { value: 'severity' } });
    const issueItems = screen.getAllByTestId('issue-item');
    const issueTypes = issueItems.map(item => item.querySelector('span.text-sm')?.textContent || '');
    // High severity (Image Alt Text) should come before medium (Color Contrast)
    expect(issueTypes).toEqual(['Image Alt Text', 'Color Contrast']);
  });

  it('sorts issues by type', () => {
    render(<ScanResults {...mockIssues} />);
    const [, sortSelect] = screen.getAllByRole('combobox');
    fireEvent.change(sortSelect, { target: { value: 'type' } });
    const issueItems = screen.getAllByTestId('issue-item');
    const issueTypes = issueItems.map(item => item.querySelector('span.text-sm')?.textContent || '');
    // Alphabetical order: Color Contrast, Image Alt Text
    expect(issueTypes).toEqual(['Color Contrast', 'Image Alt Text']);
  });

  it('displays location when available', () => {
    render(<ScanResults {...mockIssues} />);
    
    expect(screen.getByText('Location: /about.html')).toBeInTheDocument();
    expect(screen.getByText('Location: /home.html')).toBeInTheDocument();
  });

  it('shows appropriate message when no issues match filters', () => {
    render(<ScanResults {...mockIssues} />);
    const [severityFilter] = screen.getAllByRole('combobox');
    fireEvent.change(severityFilter, { target: { value: 'low' } });
    expect(screen.getByText('No issues found with the current filters.')).toBeInTheDocument();
  });

  it('renders severity badges with correct colors', () => {
    render(<ScanResults {...mockIssues} />);
    // There are multiple elements with text 'High', filter for <span>
    const highSeveritySpans = screen.getAllByText('High').filter(el => el.tagName === 'SPAN');
    const mediumSeveritySpans = screen.getAllByText('Medium').filter(el => el.tagName === 'SPAN');
    expect(highSeveritySpans[0].className).toContain('bg-red-100');
    expect(mediumSeveritySpans[0].className).toContain('bg-yellow-100');
  });
}); 