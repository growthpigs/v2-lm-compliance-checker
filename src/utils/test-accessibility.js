const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

console.log('Dependencies loaded successfully!');

async function runAccessibilityCheck(page) {
  try {
    const results = await new AxePuppeteer(page)
      .options({
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
        }
      })
      .analyze();

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

async function testAccessibilityChecker() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {
        width: 1920,
        height: 1080
      }
    });
    const page = await browser.newPage();

    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Accessibility Test Page</title>
        </head>
        <body>
          <!-- Missing alt text - should trigger violation -->
          <img src="test.jpg">
          
          <!-- Missing form labels - should trigger violation -->
          <form>
            <input type="text" placeholder="Enter name">
            <button>Submit</button>
          </form>
          
          <!-- Good contrast and proper heading structure -->
          <h1 style="color: #000000">Main Heading</h1>
          <p style="color: #333333">This is a test paragraph with good contrast.</p>
        </body>
      </html>
    `);

    console.log('Running accessibility check...');
    const results = await runAccessibilityCheck(page);
    
    console.log('\nAccessibility Check Results:');
    console.log('----------------------------');
    console.log(`Total Violations: ${results.violations.length}`);
    console.log(`Passes: ${results.passes}`);
    console.log(`Incomplete: ${results.incomplete}`);
    console.log(`Inapplicable: ${results.inapplicable}`);
    
    console.log('\nDetailed Violations:');
    results.violations.forEach((violation, index) => {
      console.log(`\n${index + 1}. ${violation.id} (${violation.impact} impact)`);
      console.log(`   Description: ${violation.description}`);
      console.log(`   Help: ${violation.help}`);
      console.log(`   Help URL: ${violation.helpUrl}`);
      console.log('   Affected Elements:');
      violation.nodes.forEach(node => {
        console.log(`   - HTML: ${node.html}`);
        console.log(`     Failure Summary: ${node.failureSummary}`);
      });
    });

    const score = calculateAccessibilityScore(results);
    console.log(`\nOverall Accessibility Score: ${score}/100`);

    await page.close();
  } catch (error) {
    console.error('Error running accessibility test:', error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the test
testAccessibilityChecker();

// Mock accessibility check results
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

// Test the score calculation
const mockScore = calculateAccessibilityScore(mockResults);
console.log('Mock accessibility test results:');
console.log('--------------------------------');
console.log(`Total Violations: ${mockResults.violations.length}`);
console.log(`Passes: ${mockResults.passes}`);
console.log(`Incomplete: ${mockResults.incomplete}`);
console.log(`Inapplicable: ${mockResults.inapplicable}`);
console.log(`\nAccessibility Score: ${mockScore}/100`); 