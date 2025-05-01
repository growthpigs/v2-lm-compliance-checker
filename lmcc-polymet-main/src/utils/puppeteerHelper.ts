import core from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';
import { Browser, Page } from 'puppeteer-core';

let browserInstance: Browser | null = null;

export async function getBrowserInstance(): Promise<Browser> {
  // Use existing instance if available (may not persist across invocations)
  if (browserInstance && browserInstance.isConnected()) {
    return browserInstance;
  }

  const executablePath = await chrome.executablePath;

  // Check if running locally vs in Vercel
  const isLocal = process.env.NODE_ENV === 'development'; // Or check for VERCEL env var

  const options = {
    args: chrome.args,
    executablePath: executablePath || (await core.executablePath()), // Fallback for local dev
    headless: isLocal ? true : chrome.headless, // Use chrome-aws-lambda's headless setting in prod
    ignoreHTTPSErrors: true,
  };

  try {
    browserInstance = await core.launch(options);
    console.log('Puppeteer browser launched successfully.');
  } catch (error) {
    console.error('Error launching Puppeteer browser:', error);
    throw new Error('Could not launch browser instance');
  }

  return browserInstance;
}

// Helper function to ensure browser is closed (call this at the end of the function)
export async function closeBrowserInstance(): Promise<void> {
  if (browserInstance) {
    try {
      await browserInstance.close();
      browserInstance = null;
      console.log('Puppeteer browser closed.');
    } catch (error) {
      console.error('Error closing browser:', error);
      throw new Error('Could not close browser instance');
    }
  }
}

// Helper function to navigate to a URL and handle basic errors
export async function navigateToPage(url: string): Promise<core.Page> {
  const browser = await getBrowserInstance();
  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000, // 30 seconds timeout
    });
    return page;
  } catch (error) {
    console.error(`Error navigating to ${url}:`, error);
    await page.close();
    throw new Error(`Failed to navigate to ${url}`);
  }
}

// Function to capture a full-page screenshot and return it as a base64 data URI
export async function captureScreenshot(page: Page): Promise<string> {
  try {
    // Ensure the page is fully loaded
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000); // Wait for any lazy-loaded content

    const screenshotBuffer = await page.screenshot({
      fullPage: true,
      encoding: 'base64',
      type: 'png',
      captureBeyondViewport: true,
    });

    console.log('Screenshot captured successfully.');
    return `data:image/png;base64,${screenshotBuffer}`;
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    throw new Error('Failed to capture screenshot');
  }
} 