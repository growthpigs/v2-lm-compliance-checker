import { AxePuppeteer } from '@axe-core/puppeteer';
import { Page } from 'puppeteer-core';
import { AxeResults, Result, RunOptions } from 'axe-core';

// Interface for our simplified accessibility results
export interface AccessibilityCheckResult {
  violations: SimplifiedViolation[];
  passes: number;
  incomplete: number;
  inapplicable: number;
  timestamp: string;
  url: string;
}

// Interface for simplified violation information
export interface SimplifiedViolation {
  id: string;
  impact: string;
  description: string;
  help: string;
  helpUrl: string;
  nodes: SimplifiedNode[];
  tags: string[];
}

// Interface for simplified node information
interface SimplifiedNode {
  html: string;
  failureSummary: string;
  target: string[];
}

// Default Axe configuration
const defaultAxeOptions: RunOptions = {
  runOnly: {
    type: 'tag',
    values: [
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa',
      'best-practice',
      'section508',
    ],
  },
  resultTypes: ['violations', 'incomplete', 'inapplicable', 'passes'],
  reporter: 'v2',
};

// Function to simplify violation nodes
function simplifyNodes(nodes: Result['nodes']): SimplifiedNode[] {
  return nodes.map(node => ({
    html: node.html,
    failureSummary: node.failureSummary || '',
    target: node.target,
  }));
}

// Function to simplify violations
function simplifyViolations(violations: Result[]): SimplifiedViolation[] {
  return violations.map(violation => ({
    id: violation.id,
    impact: violation.impact || 'minor',
    description: violation.description,
    help: violation.help,
    helpUrl: violation.helpUrl,
    nodes: simplifyNodes(violation.nodes),
    tags: violation.tags,
  }));
}

// Main function to run accessibility checks
export async function runAccessibilityCheck(
  page: Page,
  options: RunOptions = defaultAxeOptions
): Promise<AccessibilityCheckResult> {
  try {
    console.log('Starting accessibility check...');
    
    // Run Axe analysis
    const results: AxeResults = await new AxePuppeteer(page)
      .options(options)
      .analyze();

    console.log('Accessibility check completed successfully.');

    // Create simplified result object
    const accessibilityResult: AccessibilityCheckResult = {
      violations: simplifyViolations(results.violations),
      passes: results.passes.length,
      incomplete: results.incomplete.length,
      inapplicable: results.inapplicable.length,
      timestamp: new Date().toISOString(),
      url: page.url(),
    };

    return accessibilityResult;
  } catch (error) {
    console.error('Error running accessibility check:', error);
    throw new Error('Failed to run accessibility check');
  }
}

// Helper function to get severity score based on impact
export function getViolationSeverityScore(impact: string): number {
  const severityScores: { [key: string]: number } = {
    critical: 4,
    serious: 3,
    moderate: 2,
    minor: 1,
  };
  return severityScores[impact.toLowerCase()] || 1;
}

// Calculate overall accessibility score (0-100)
export function calculateAccessibilityScore(result: AccessibilityCheckResult): number {
  if (!result.violations.length) return 100;

  const totalViolations = result.violations.length;
  const impactScores = result.violations.map(v => getViolationSeverityScore(v.impact));
  const totalImpactScore = impactScores.reduce((sum, score) => sum + score, 0);
  
  // Base score starts at 100 and reduces based on violations and their severity
  const baseScore = 100;
  const deduction = (totalImpactScore / (totalViolations * 4)) * 100;
  
  const finalScore = Math.max(0, Math.round(baseScore - deduction));
  return finalScore;
} 