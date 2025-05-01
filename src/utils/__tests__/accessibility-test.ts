import { getBrowserInstance } from '../puppeteerHelper';
import { runAccessibilityCheck, calculateAccessibilityScore } from '../accessibilityChecker';

describe('Accessibility Checker', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await getBrowserInstance();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should detect accessibility violations in sample page', async () => {
    // Set up test page with known accessibility issues
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

    const results = await runAccessibilityCheck(page);
    
    // Basic assertions
    expect(results).toBeDefined();
    expect(results.violations).toBeInstanceOf(Array);
    expect(results.violations.length).toBeGreaterThan(0);
    
    // Check for specific violations
    const imgViolation = results.violations.find(v => v.id === 'image-alt');
    const labelViolation = results.violations.find(v => v.id === 'label');
    
    expect(imgViolation).toBeDefined();
    expect(labelViolation).toBeDefined();
    
    // Test accessibility score
    const score = calculateAccessibilityScore(results);
    expect(score).toBeLessThan(100); // Score should be reduced due to violations
    expect(score).toBeGreaterThanOrEqual(0); // Score should not be negative
    
    // Log results for manual verification
    console.log('\nAccessibility Check Results:');
    console.log('----------------------------');
    console.log(`Total Violations: ${results.violations.length}`);
    console.log(`Passes: ${results.passes}`);
    console.log(`Incomplete: ${results.incomplete}`);
    console.log(`Inapplicable: ${results.inapplicable}`);
    console.log(`Accessibility Score: ${score}`);
    
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
  });
}); 