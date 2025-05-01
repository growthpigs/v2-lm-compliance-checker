import { AxePuppeteer } from '@axe-core/puppeteer';
import { Page } from 'puppeteer';
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
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
  }
};

export async function runAccessibilityCheck(page: Page): Promise<AccessibilityCheckResult> {
  try {
    // Run axe-core analysis
    const results = await new AxePuppeteer(page)
      .options(defaultAxeOptions)
      .analyze();

    // Simplify violations
    const simplifiedViolations = results.violations.map(violation => ({
      id: violation.id,
      impact: violation.impact || 'minor',
      description: violation.description,
      help: violation.help,
      helpUrl: violation.helpUrl,
      tags: violation.tags,
      nodes: violation.nodes.map(node => ({
        html: node.html,
        failureSummary: node.failureSummary || '',
        target: node.target
      }))
    }));

    return {
      violations: simplifiedViolations,
      passes: results.passes.length,
      incomplete: results.incomplete.length,
      inapplicable: results.inapplicable.length,
      timestamp: new Date().toISOString(),
      url: page.url()
    };
  } catch (error) {
    console.error('Error running accessibility check:', error);
    throw error;
  }
}

// Calculate accessibility score based on violations and their impact
export function calculateAccessibilityScore(results: AccessibilityCheckResult): number {
  const impactWeights = {
    critical: 10,
    serious: 7,
    moderate: 5,
    minor: 2
  };

  let totalDeductions = 0;
  const baseScore = 100;

  // Calculate deductions based on violations and their impact
  results.violations.forEach(violation => {
    const weight = impactWeights[violation.impact as keyof typeof impactWeights] || impactWeights.minor;
    totalDeductions += weight * violation.nodes.length;
  });

  // Ensure the score doesn't go below 0
  const finalScore = Math.max(0, baseScore - totalDeductions);
  
  // Round to 2 decimal places
  return Math.round(finalScore * 100) / 100;
} 