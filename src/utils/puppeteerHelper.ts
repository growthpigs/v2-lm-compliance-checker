import puppeteer from 'puppeteer';
import chrome from 'chrome-aws-lambda';
import { Browser } from 'puppeteer';

let browserInstance: Browser | null = null;

export async function getBrowserInstance(): Promise<Browser> {
  // Use existing instance if available
  if (browserInstance && browserInstance.isConnected()) {
    return browserInstance;
  }

  // Check if running locally vs in production
  const isLocal = process.env.NODE_ENV === 'development';

  const options = {
    args: chrome.args,
    executablePath: isLocal ? puppeteer.executablePath() : await chrome.executablePath,
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  };

  try {
    browserInstance = await puppeteer.launch(options);
    return browserInstance;
  } catch (error) {
    console.error('Error launching browser:', error);
    throw error;
  }
} 