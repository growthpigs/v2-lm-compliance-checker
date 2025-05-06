"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAccessibilityCheck = runAccessibilityCheck;
exports.calculateAccessibilityScore = calculateAccessibilityScore;
const puppeteer_1 = require("@axe-core/puppeteer");
// Default Axe configuration
const defaultAxeOptions = {
    runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
    }
};
async function runAccessibilityCheck(page) {
    try {
        // Run axe-core analysis
        const results = await new puppeteer_1.AxePuppeteer(page)
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
    }
    catch (error) {
        console.error('Error running accessibility check:', error);
        throw error;
    }
}
// Calculate accessibility score based on violations and their impact
function calculateAccessibilityScore(results) {
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
        const weight = impactWeights[violation.impact] || impactWeights.minor;
        totalDeductions += weight * violation.nodes.length;
    });
    // Ensure the score doesn't go below 0
    const finalScore = Math.max(0, baseScore - totalDeductions);
    // Round to 2 decimal places
    return Math.round(finalScore * 100) / 100;
}
