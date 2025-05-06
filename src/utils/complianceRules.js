"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPrivacyPolicyLink = checkPrivacyPolicyLink;
exports.checkBarAssociationMention = checkBarAssociationMention;
exports.checkCanSpamBasics = checkCanSpamBasics;
exports.checkAIContentDisclosure = checkAIContentDisclosure;
exports.checkForPlagiarism = checkForPlagiarism;
// Check for privacy policy link
async function checkPrivacyPolicyLink(page) {
    try {
        // Look for an anchor tag containing 'Privacy Policy' (case-insensitive)
        const link = await page.$x("//a[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'privacy policy')]");
        const found = link.length > 0;
        console.log(`Privacy Policy link check: ${found}`);
        return found;
    }
    catch (error) {
        console.error('Error checking privacy policy:', error);
        return false;
    }
}
// Check for bar association mentions
async function checkBarAssociationMention(page) {
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
        const xpathQuery = barPatterns.map(pattern => `contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pattern}')`).join(' or ');
        const elements = await page.$x(`//*[${xpathQuery}]`);
        if (elements.length > 0) {
            // Get the text content of the first matching element
            const text = await page.evaluate(el => el.textContent, elements[0]);
            console.log('Bar association mention found:', text);
            return text || null;
        }
        console.log('No bar association mention found');
        return null;
    }
    catch (error) {
        console.error('Error checking bar association:', error);
        return null;
    }
}
// Check for basic CAN-SPAM compliance indicators
async function checkCanSpamBasics(page) {
    try {
        const result = {
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
        const contactXPath = contactPatterns.map(pattern => `contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pattern}')`).join(' or ');
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
        const unsubscribeXPath = unsubscribePatterns.map(pattern => `contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pattern}')`).join(' or ');
        const unsubscribeElements = await page.$x(`//*[${unsubscribeXPath}]`);
        result.hasUnsubscribeInfo = unsubscribeElements.length > 0;
        // Add details about findings
        if (result.hasContactInfo) {
            result.details.push('Contact information found');
        }
        else {
            result.details.push('No clear contact information found');
        }
        if (result.hasUnsubscribeInfo) {
            result.details.push('Unsubscribe option found');
        }
        else {
            result.details.push('No clear unsubscribe option found');
        }
        console.log('CAN-SPAM check results:', result);
        return result;
    }
    catch (error) {
        console.error('Error checking CAN-SPAM compliance:', error);
        return {
            hasContactInfo: false,
            hasUnsubscribeInfo: false,
            details: ['Error performing CAN-SPAM compliance check']
        };
    }
}
// Check for AI-generated content and proper disclosures
async function checkAIContentDisclosure(page) {
    try {
        console.log('Checking for AI-generated content and disclosures');
        const result = {
            detectedAIContent: false,
            hasDisclosure: false,
            riskLevel: 'low',
            contentSamples: [],
            details: []
        };
        // Extract page content for analysis
        const content = await page.evaluate(() => {
            // Get all paragraph text
            const paragraphs = Array.from(document.querySelectorAll('p, article, section, .content, .blog-content, .post-content'))
                .map(p => p.textContent?.trim())
                .filter(text => text && text.length > 100); // Only consider substantial paragraphs
            return paragraphs;
        });
        console.log(`Found ${content.length} content blocks for AI analysis`);
        // Simple heuristics for AI content detection
        // Note: In a real implementation, this would use NLP/ML models
        const aiPatterns = [
            // Generic, repetitive content patterns
            /as a leading law firm/i,
            /we understand the complexities of/i,
            /our experienced team of attorneys/i,
            /in conclusion, it is essential to/i,
            /contact us today for a consultation/i,
            // Overly formal, generic language patterns
            /it is of utmost importance/i,
            /it is worth noting that/i,
            /it goes without saying/i,
            /needless to say/i,
            // Excessive hedging common in AI content
            /may potentially affect/i,
            /could possibly result in/i,
            /might be considered as/i
        ];
        let aiPatternMatches = 0;
        const matchingSamples = [];
        // Check content against AI patterns
        content.forEach(paragraph => {
            if (!paragraph)
                return;
            for (const pattern of aiPatterns) {
                if (pattern.test(paragraph)) {
                    aiPatternMatches++;
                    // Add a snippet of the matching content
                    const snippetStart = Math.max(0, paragraph.search(pattern) - 30);
                    const snippetEnd = Math.min(paragraph.length, paragraph.search(pattern) + 70);
                    const snippet = paragraph.substring(snippetStart, snippetEnd) + '...';
                    if (!matchingSamples.includes(snippet)) {
                        matchingSamples.push(snippet);
                    }
                }
            }
        });
        // Check for AI content disclosure
        const disclosurePatterns = [
            'ai generated',
            'generated by ai',
            'written with ai',
            'ai assisted',
            'created with artificial intelligence',
            'ai-powered content',
            'chatgpt',
            'gpt-4',
            'ai disclosure'
        ];
        const disclosureXPath = disclosurePatterns.map(pattern => `contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${pattern}')`).join(' or ');
        const disclosureElements = await page.$x(`//*[${disclosureXPath}]`);
        result.hasDisclosure = disclosureElements.length > 0;
        // Determine risk level based on AI pattern matches and disclosures
        if (aiPatternMatches > 5) {
            result.detectedAIContent = true;
            result.riskLevel = result.hasDisclosure ? 'low' : 'high';
            result.details.push(`Detected ${aiPatternMatches} patterns indicative of AI-generated content`);
            if (result.hasDisclosure) {
                result.details.push('AI content disclosure found on the page');
            }
            else {
                result.details.push('No AI content disclosure found despite detected AI content');
            }
        }
        else if (aiPatternMatches > 2) {
            result.detectedAIContent = true;
            result.riskLevel = result.hasDisclosure ? 'low' : 'medium';
            result.details.push(`Detected ${aiPatternMatches} patterns that may indicate AI-generated content`);
            if (result.hasDisclosure) {
                result.details.push('AI content disclosure found on the page');
            }
            else {
                result.details.push('Recommend adding AI content disclosure as a precaution');
            }
        }
        else {
            result.detectedAIContent = false;
            result.riskLevel = 'low';
            result.details.push('No significant AI content patterns detected');
        }
        // Include content samples (limited to 3)
        result.contentSamples = matchingSamples.slice(0, 3);
        console.log('AI content detection results:', result);
        return result;
    }
    catch (error) {
        console.error('Error checking AI content:', error);
        return {
            detectedAIContent: false,
            hasDisclosure: false,
            riskLevel: 'low',
            contentSamples: [],
            details: ['Error performing AI content analysis']
        };
    }
}
// Check for potential plagiarized content
async function checkForPlagiarism(page) {
    try {
        console.log('Checking for potential plagiarized content');
        const result = {
            suspectedPlagiarism: false,
            riskLevel: 'low',
            contentSamples: [],
            details: []
        };
        // Extract all substantial content from the page
        const content = await page.evaluate(() => {
            // Get all paragraph text
            const paragraphs = Array.from(document.querySelectorAll('p, article, section, .content, .blog-content, .post-content'))
                .map(p => p.textContent?.trim())
                .filter(text => text && text.length > 100); // Only consider substantial paragraphs
            return paragraphs;
        });
        console.log(`Found ${content.length} content blocks for plagiarism analysis`);
        // Common legal boilerplate texts that shouldn't be flagged
        const legalBoilerplate = [
            'terms of use',
            'privacy policy',
            'all rights reserved',
            'cookie policy',
            'terms and conditions',
            'this website is for informational purposes only',
            'attorney advertising',
            'past results do not guarantee'
        ];
        // Check for content that appears verbatim across multiple law sites (not in citations)
        // Note: In a real implementation, this would compare against a database
        const commonlyPlagiarizedPhrases = [
            'our attorneys have decades of combined experience',
            'we handle cases on a contingency fee basis',
            'we fight for the compensation you deserve',
            'we offer a free initial consultation',
            'practice areas include personal injury, criminal defense',
            'our law firm has been serving the community since',
            'we provide aggressive representation for our clients',
            'we understand that legal issues can be overwhelming',
            'we strive to provide personalized attention to each client',
            'we work diligently to achieve the best possible outcome'
        ];
        let plagiarismMatches = 0;
        const matchingSamples = [];
        const potentialCitations = await page.$x('//blockquote | //cite | //q | //*[contains(@class, "quote")]');
        // Skip content that's properly attributed
        const isLikelyCitation = potentialCitations.length > 0;
        // Check content against plagiarism patterns
        content.forEach(paragraph => {
            if (!paragraph)
                return;
            // Skip legal boilerplate
            const isBoilerplate = legalBoilerplate.some(boilerplate => paragraph.toLowerCase().includes(boilerplate.toLowerCase()));
            if (isBoilerplate)
                return;
            // Check for verbatim matches to commonly plagiarized content
            for (const phrase of commonlyPlagiarizedPhrases) {
                if (paragraph.toLowerCase().includes(phrase.toLowerCase())) {
                    plagiarismMatches++;
                    // Add a snippet of the matching content
                    const snippetStart = Math.max(0, paragraph.toLowerCase().indexOf(phrase.toLowerCase()) - 20);
                    const snippetEnd = Math.min(paragraph.length, paragraph.toLowerCase().indexOf(phrase.toLowerCase()) + phrase.length + 20);
                    const snippet = paragraph.substring(snippetStart, snippetEnd) + '...';
                    if (!matchingSamples.includes(snippet)) {
                        matchingSamples.push(snippet);
                    }
                }
            }
        });
        // Determine risk level based on plagiarism matches and citations
        if (plagiarismMatches > 3) {
            result.suspectedPlagiarism = true;
            result.riskLevel = isLikelyCitation ? 'medium' : 'high';
            result.details.push(`Detected ${plagiarismMatches} instances of potentially plagiarized content`);
            if (isLikelyCitation) {
                result.details.push('Some content appears to be in citation blocks, but potential issues remain');
            }
            else {
                result.details.push('No proper citation or attribution found for suspicious content');
            }
        }
        else if (plagiarismMatches > 0) {
            result.suspectedPlagiarism = true;
            result.riskLevel = isLikelyCitation ? 'low' : 'medium';
            result.details.push(`Detected ${plagiarismMatches} instances that may indicate plagiarized content`);
            if (!isLikelyCitation) {
                result.details.push('Consider adding proper citations or attributions');
            }
        }
        else {
            result.suspectedPlagiarism = false;
            result.riskLevel = 'low';
            result.details.push('No significant plagiarism indicators detected');
        }
        // Include content samples (limited to 3)
        result.contentSamples = matchingSamples.slice(0, 3);
        console.log('Plagiarism check results:', result);
        return result;
    }
    catch (error) {
        console.error('Error checking for plagiarism:', error);
        return {
            suspectedPlagiarism: false,
            riskLevel: 'low',
            contentSamples: [],
            details: ['Error performing plagiarism analysis']
        };
    }
}
