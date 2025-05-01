import { Browser, Page } from 'puppeteer';
import { getBrowserInstance, goToPage, captureScreenshot } from '../utils/puppeteerHelper';
import { runAxeScan } from '../utils/accessibilityChecker';
import { checkPrivacyPolicyLink, checkBarAssociationMention, checkCanSpamBasics } from '../utils/complianceRules';
import { calculateComplianceScore } from '../utils/complianceScorer';
import type { AxeResults } from '@axe-core/puppeteer';

interface ScanResult {
  url: string;
  status: 'processing' | 'completed' | 'failed';
  complianceScore?: number;
  issues?: ScanIssue[];
  jurisdiction?: string | null;
  summary?: {
    jurisdictionNote?: string | null;
    recommendations: string[];
  };
  screenshot?: string;
  timestamp: string;
  error?: string;
}

interface ScanIssue {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  legalReference?: string;
  penalty?: string;
}

// Function to map Axe violations to ScanIssue format
function mapAxeViolationsToScanIssues(axeResults: AxeResults): ScanIssue[] {
  return axeResults.violations.map(violation => ({
    id: violation.id,
    title: violation.help,
    description: violation.description,
    severity: violation.impact === 'critical' || violation.impact === 'serious' ? 'high' : 
             violation.impact === 'moderate' ? 'medium' : 'low',
    legalReference: violation.helpUrl,
    penalty: `Potential ADA Title III violations can result in legal action and civil penalties`
  }));
}

// Function to add custom compliance issues
function addCustomIssues(issues: ScanIssue[], hasPrivacyPolicy: boolean, barMention: string | null, canSpamResult: { hasContactInfo: boolean; hasUnsubscribeInfo: boolean; details: string[] }): void {
  if (!hasPrivacyPolicy) {
    issues.push({
      id: 'custom-privacy-policy',
      title: 'Missing Privacy Policy Link',
      description: 'A clear link to a privacy policy was not found.',
      severity: 'high',
      legalReference: 'Various (e.g., CCPA, GDPR)',
      penalty: 'Significant fines under privacy regulations'
    });
  }

  if (!barMention) {
    issues.push({
      id: 'custom-bar-association',
      title: 'Missing Bar Association Information',
      description: 'No clear reference to bar association or attorney credentials found.',
      severity: 'medium',
      legalReference: 'State Bar Rules',
      penalty: 'Potential ethical violations and disciplinary action'
    });
  }

  if (!canSpamResult.hasContactInfo) {
    issues.push({
      id: 'custom-can-spam-contact',
      title: 'Missing Contact Information',
      description: 'No clear business contact information found.',
      severity: 'medium',
      legalReference: 'CAN-SPAM Act',
      penalty: 'Up to $46,517 per violation under CAN-SPAM Act'
    });
  }

  if (!canSpamResult.hasUnsubscribeInfo) {
    issues.push({
      id: 'custom-can-spam-unsubscribe',
      title: 'Missing Unsubscribe Option',
      description: 'No clear unsubscribe mechanism found in marketing communications.',
      severity: 'high',
      legalReference: 'CAN-SPAM Act',
      penalty: 'Up to $46,517 per violation under CAN-SPAM Act'
    });
  }
}

export async function runScan(scanId: string, url: string): Promise<void> {
  let browser: Browser | null = null;
  let page: Page | null = null;
  let scanResult: Partial<ScanResult> = { url, status: 'processing' };

  try {
    browser = await getBrowserInstance();
    page = await goToPage(browser, url);

    // Run checks in parallel where possible
    const [screenshot, axeResults, hasPrivacyPolicy, barMention, canSpamResult] = await Promise.all([
      captureScreenshot(page),
      runAxeScan(page),
      checkPrivacyPolicyLink(page),
      checkBarAssociationMention(page),
      checkCanSpamBasics(page)
    ]);

    // Process results
    const axeIssues = mapAxeViolationsToScanIssues(axeResults);
    const customIssues: ScanIssue[] = [];
    addCustomIssues(customIssues, hasPrivacyPolicy, barMention, canSpamResult);

    const allIssues = [...axeIssues, ...customIssues];

    const scoreDetails = calculateComplianceScore({
      axeResults,
      hasPrivacyPolicy,
      barMention,
      canSpamResult
    });

    scanResult = {
      url,
      status: 'completed',
      complianceScore: scoreDetails.score,
      issues: allIssues,
      jurisdiction: barMention,
      summary: {
        jurisdictionNote: barMention ? `Potential relevance to ${barMention}.` : null,
        recommendations: scoreDetails.recommendations
      },
      screenshot,
      timestamp: new Date().toISOString()
    };

    console.log(`Scan ${scanId} completed successfully.`);
    // Note: storeScanResult implementation needed
    // await storeScanResult(scanId, scanResult as ScanResult);

  } catch (error) {
    console.error(`Scan ${scanId} failed for ${url}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown scanning error';
    
    scanResult = {
      ...scanResult,
      status: 'failed',
      error: errorMessage,
      timestamp: new Date().toISOString()
    };

    // Note: storeScanResult implementation needed
    // await storeScanResult(scanId, scanResult as ScanResult);

  } finally {
    if (page) {
      try { await page.close(); } catch (e) { console.error('Error closing page:', e); }
    }
    if (browser) {
      try { await browser.close(); } catch (e) { console.error('Error closing browser:', e); }
    }
  }
} 