import React, { useState, useMemo } from 'react';

interface Issue {
  type: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  location?: string;
}

interface ScanResultsProps {
  accessibility: Issue[];
  privacy: Issue[];
  barAssociation: Issue[];
  canSpam: Issue[];
}

type Category = 'accessibility' | 'privacy' | 'barAssociation' | 'canSpam';
type SeverityFilter = 'all' | 'high' | 'medium' | 'low';
type SortOption = 'severity' | 'type';

export function ScanResults({ accessibility, privacy, barAssociation, canSpam }: ScanResultsProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('accessibility');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('severity');

  const categoryData = {
    accessibility,
    privacy,
    barAssociation,
    canSpam,
  };

  const categoryLabels: Record<Category, string> = {
    accessibility: 'Accessibility',
    privacy: 'Privacy Policy',
    barAssociation: 'Bar Association',
    canSpam: 'CAN-SPAM',
  };

  const filteredAndSortedIssues = useMemo(() => {
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

  const totalIssues = useMemo(() => {
    return Object.entries(categoryData).reduce((acc, [category, issues]) => {
      acc[category as Category] = issues.length;
      return acc;
    }, {} as Record<Category, number>);
  }, [categoryData]);

  const renderSeverityBadge = (severity: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[severity as keyof typeof colors]}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="border-b border-gray-200 p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex space-x-4">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as Category)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === key
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label} ({totalIssues[key as Category]})
              </button>
            ))}
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-4 flex space-x-4">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as SeverityFilter)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Severities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="severity">Sort by Severity</option>
              <option value="type">Sort by Type</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {categoryLabels[selectedCategory]} Issues
        </h3>
        {filteredAndSortedIssues.length === 0 ? (
          <p className="text-gray-500">No issues found with the current filters.</p>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedIssues.map((issue, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4 hover:bg-gray-50"
                data-testid="issue-item"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {renderSeverityBadge(issue.severity)}
                      <span className="text-sm font-medium text-gray-900">
                        {issue.type}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{issue.message}</p>
                    {issue.location && (
                      <p className="mt-1 text-sm text-gray-500">
                        Location: {issue.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 