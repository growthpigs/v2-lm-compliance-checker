import { getBrowserInstance } from './puppeteerHelper';
import { runAccessibilityCheck, calculateAccessibilityScore } from './accessibilityChecker';

async function testAccessibilityChecker() {
  let browser;
  try {
    browser = await getBrowserInstance();
    const page = await browser.newPage();

    // Test URL - using a sample page with known accessibility issues
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