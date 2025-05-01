const mockResults = {
  violations: [
    {
      id: 'image-alt',
      impact: 'critical',
      description: 'Images must have alternate text',
      help: 'Images must have an alt attribute',
      helpUrl: 'https://dequeuniversity.com/rules/axe/4.6/image-alt',
      nodes: [
        {
          html: '<img src="test.jpg">',
          failureSummary: 'Fix any of the following: Image does not have an alt attribute',
          target: ['img']
        }
      ],
      tags: ['wcag2a', 'wcag111']
    }
  ],
  passes: 5,
  incomplete: 0,
  inapplicable: 10
};

function calculateAccessibilityScore(results) {
  const impactWeights = {
    critical: 10,
    serious: 7,
    moderate: 5,
    minor: 2
  };

  let totalDeductions = 0;
  const baseScore = 100;

  results.violations.forEach(violation => {
    const weight = impactWeights[violation.impact] || impactWeights.minor;
    totalDeductions += weight * violation.nodes.length;
  });

  const finalScore = Math.max(0, baseScore - totalDeductions);
  return Math.round(finalScore * 100) / 100;
}

const score = calculateAccessibilityScore(mockResults);
console.log('Mock accessibility test results:');
console.log('--------------------------------');
console.log('Total Violations: ' + mockResults.violations.length);
console.log('Passes: ' + mockResults.passes);
console.log('Incomplete: ' + mockResults.incomplete);
console.log('Inapplicable: ' + mockResults.inapplicable);
console.log('Accessibility Score: ' + score + '/100'); 