import { Page } from 'puppeteer';

// Check for privacy policy link
export async function checkPrivacyPolicyLink(page: Page): Promise<boolean> {
  try {
    // Look for an anchor tag containing 'Privacy Policy' (case-insensitive)
    const link = await page.$x("//a[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'privacy policy')]");
    const found = link.length > 0;
    console.log(`Privacy Policy link check: ${found}`);
    return found;
  } catch (error) {
    console.error('Error checking privacy policy:', error);
    return false;
  }
}

// Check for bar association mentions
export async function checkBarAssociationMention(page: Page): Promise<string | null> {
  try {
    // Common bar association patterns
    const barPatterns = [
      'state bar of',
      'bar association',
      'bar number',
      'attorney registration',
      'licensed in',
      'admitted to practice'
    ];

    // Build XPath query to search for these patterns
    const xpathQuery = barPatterns.map(pattern => 
      `contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pattern}')`
    ).join(' or ');

    const elements = await page.$x(`//*[${xpathQuery}]`);
    
    if (elements.length > 0) {
      // Get the text content of the first matching element
      const text = await page.evaluate(el => el.textContent, elements[0]);
      console.log('Bar association mention found:', text);
      return text || null;
    }
    
    console.log('No bar association mention found');
    return null;
  } catch (error) {
    console.error('Error checking bar association:', error);
    return null;
  }
}

// Interface for CAN-SPAM check results
interface CanSpamResult {
  hasContactInfo: boolean;
  hasUnsubscribeInfo: boolean;
  details: string[];
}

// Check for basic CAN-SPAM compliance indicators
export async function checkCanSpamBasics(page: Page): Promise<CanSpamResult> {
  try {
    const result: CanSpamResult = {
      hasContactInfo: false,
      hasUnsubscribeInfo: false,
      details: []
    };

    // Check for contact information
    const contactPatterns = [
      'contact us',
      'contact info',
      'physical address',
      'mailing address',
      'business address',
      'office location'
    ];
    const contactXPath = contactPatterns.map(pattern => 
      `contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pattern}')`
    ).join(' or ');
    const contactElements = await page.$x(`//*[${contactXPath}]`);
    result.hasContactInfo = contactElements.length > 0;

    // Check for unsubscribe information
    const unsubscribePatterns = [
      'unsubscribe',
      'opt out',
      'opt-out',
      'email preferences',
      'subscription preferences'
    ];
    const unsubscribeXPath = unsubscribePatterns.map(pattern => 
      `contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pattern}')`
    ).join(' or ');
    const unsubscribeElements = await page.$x(`//*[${unsubscribeXPath}]`);
    result.hasUnsubscribeInfo = unsubscribeElements.length > 0;

    // Add details about findings
    if (result.hasContactInfo) {
      result.details.push('Contact information found');
    } else {
      result.details.push('No clear contact information found');
    }
    if (result.hasUnsubscribeInfo) {
      result.details.push('Unsubscribe option found');
    } else {
      result.details.push('No clear unsubscribe option found');
    }

    console.log('CAN-SPAM check results:', result);
    return result;
  } catch (error) {
    console.error('Error checking CAN-SPAM compliance:', error);
    return {
      hasContactInfo: false,
      hasUnsubscribeInfo: false,
      details: ['Error performing CAN-SPAM compliance check']
    };
  }
} 