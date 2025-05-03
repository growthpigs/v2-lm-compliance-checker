const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const os = require('os');

// Create a screenshots directory
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for scan results
const scanResults = new Map();
let activeScans = 0;
const MAX_CONCURRENT_SCANS = 2;

// Enhanced CORS configuration for development
app.use(cors({
  origin: ['http://localhost:3174', 'http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:3174', 'http://localhost:3175'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Serve screenshots directory statically
app.use('/screenshots', express.static(SCREENSHOTS_DIR));

app.use(express.json());

// Add a simple health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Actual screenshot function using Puppeteer
const captureScreenshot = async (url, filename) => {
  console.log(`[SCREENSHOT] Launching Puppeteer to capture: ${url}`);
  let browser = null;
  try {
    // Launch browser with appropriate options
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage();
    
    // Set viewport to desktop size
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log(`[SCREENSHOT] Navigating to: ${url}`);
    // Navigate with a timeout and wait until network is idle
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 20000 
    });
    
    // Wait a moment for any animations to complete
    await page.waitForTimeout(1000);
    
    console.log(`[SCREENSHOT] Taking screenshot and saving to: ${filename}`);
    // Take the screenshot
    await page.screenshot({ 
      path: filename,
      fullPage: false,
      type: 'jpeg',
      quality: 80
    });
    
    console.log(`[SCREENSHOT] Successfully saved screenshot to: ${filename}`);
    return true;
  } catch (error) {
    console.error(`[SCREENSHOT ERROR] Failed to capture screenshot: ${error.message}`);
    return false;
  } finally {
    if (browser) {
      await browser.close();
      console.log(`[SCREENSHOT] Browser closed`);
    }
  }
};

// Mock scanner service
const runScan = async (scanId, url) => {
  console.log(`[SCAN] Starting scan for URL: ${url}`);
  
  // Parse domain to determine jurisdiction
  let jurisdiction = 'Unknown';
  try {
    const domain = new URL(url).hostname;
    console.log(`[DOMAIN DEBUG] Analyzing domain: ${domain}`);
    
    // Map specific domains to states/jurisdictions
    const knownDomains = {
      'nextlegal.law': 'California, United States',
      'www.nextlegal.law': 'California, United States',
      'blackbaylawyers.com.au': 'New South Wales, Australia',
      'www.blackbaylawyers.com.au': 'New South Wales, Australia',
      'janofamilylaw.com.au': 'Queensland, Australia',
      'www.janofamilylaw.com.au': 'Queensland, Australia'
    };
    
    // Check if we have a direct match in our known domains
    if (knownDomains[domain]) {
      jurisdiction = knownDomains[domain];
      console.log(`[DOMAIN DEBUG] Direct match found for domain: ${domain} => ${jurisdiction}`);
    } else {
      // Extract TLD parts for better analysis
      const domainParts = domain.split('.');
      const tld = domainParts.pop(); // Get last part
      const secondLevelDomain = domainParts.length > 0 ? domainParts.pop() : null; // Get second level domain if exists
      
      console.log(`[DOMAIN DEBUG] TLD detected: ${tld}`);
      console.log(`[DOMAIN DEBUG] Second level domain: ${secondLevelDomain}`);
      
      // Check for multi-part TLDs first (e.g., .com.au)
      if (domain.endsWith('.com.au') || domain.endsWith('.net.au') || domain.endsWith('.org.au') || domain.endsWith('.edu.au') || domain.endsWith('.gov.au')) {
        console.log(`[DOMAIN DEBUG] Australian domain detected: ${domain}`);
        jurisdiction = 'Australia';
      }
      // Check for specific legal industry TLDs
      else if (tld === 'law' || domain.endsWith('.legal')) {
        console.log(`[DOMAIN DEBUG] Legal domain detected: ${domain}`);
        jurisdiction = 'United States';
        
        // For .law domains, try to guess the state based on the second level domain (simplified example)
        if (secondLevelDomain) {
          // This is a simplified example - in a real implementation, 
          // you would have a more comprehensive database of law firms and their locations
          if (secondLevelDomain.includes('ny') || secondLevelDomain.includes('newyork')) {
            jurisdiction = 'New York, United States';
          } else if (secondLevelDomain.includes('ca') || secondLevelDomain.includes('calif') || 
                    secondLevelDomain.includes('next') || secondLevelDomain.includes('silicon')) {
            jurisdiction = 'California, United States';
          } else if (secondLevelDomain.includes('tx') || secondLevelDomain.includes('texas')) {
            jurisdiction = 'Texas, United States';
          }
        }
      }
      // Continue with other domain checks
      else if (domain.endsWith('.au') || domain.includes('.au/')) {
        jurisdiction = 'Australia';
      } else if (domain.endsWith('.uk') || domain.includes('.co.uk')) {
        jurisdiction = 'United Kingdom';
      } else if (domain.endsWith('.ca')) {
        jurisdiction = 'Canada';
      } else if (domain.endsWith('.eu')) {
        jurisdiction = 'European Union';
      } else if (domain.endsWith('.de')) {
        jurisdiction = 'Germany';
      } else if (domain.endsWith('.fr')) {
        jurisdiction = 'France';
      } else if (domain.endsWith('.gov')) {
        jurisdiction = 'US Government';
      } else if (domain.endsWith('.edu')) {
        jurisdiction = 'US Education';
      } else if (domain.endsWith('.us')) {
        jurisdiction = 'United States';
      } else if (domain.endsWith('.com') || domain.endsWith('.org') || domain.endsWith('.net')) {
        jurisdiction = 'United States'; // Default for common TLDs
      }
    }
    
    console.log(`[DOMAIN DEBUG] Final jurisdiction determined: ${jurisdiction}`);
  } catch (error) {
    console.error(`[ERROR] Error parsing URL for jurisdiction: ${error}, URL: ${url}`);
  }
  
  // Take an actual screenshot using Puppeteer
  let screenshotUrl = null;
  const screenshotFilename = `${scanId}.jpg`;
  const screenshotPath = path.join(SCREENSHOTS_DIR, screenshotFilename);
  
  try {
    console.log(`[SCREENSHOT] Attempting to capture screenshot for: ${url}`);
    const success = await captureScreenshot(url, screenshotPath);
    
    if (success) {
      // Provide the URL to access the screenshot
      screenshotUrl = `/screenshots/${screenshotFilename}`;
      console.log(`[SCREENSHOT] Screenshot captured successfully. URL: ${screenshotUrl}`);
    } else {
      // Fallback if screenshot fails
      console.log(`[SCREENSHOT] Screenshot capture failed, using fallback image`);
      screenshotUrl = `https://picsum.photos/id/999/600/400`;
    }
  } catch (error) {
    console.error(`[SCREENSHOT ERROR] Failed to process screenshot: ${error.message}`);
    screenshotUrl = `https://picsum.photos/id/999/600/400`;
  }
  
  // Create a solid array of issues that covers all our section types
  const issues = createStandardIssues(jurisdiction);
  
  console.log(`[ISSUES DEBUG] Generated ${issues.length} issues for analysis`);

  // Store results with dynamic jurisdiction
  const result = {
    url,
    status: 'completed',
    complianceScore: Math.floor(Math.random() * 40) + 60, // Random score between 60-99
    issues: issues,
    jurisdiction: jurisdiction,
    summary: {
      jurisdictionNote: `Website appears to be subject to ${jurisdiction} laws and regulations.`,
      recommendations: [
        jurisdiction.includes('Australia') ? 'Comply with Australian Privacy Principles' : 
        jurisdiction.includes('European Union') ? 'Ensure GDPR compliance' : 'Update privacy policy for local regulations',
        'Implement accessible design features',
        'Add clear contact information',
        'Add AI content disclosure statements',
        'Review content for originality and copyright compliance'
      ]
    },
    screenshot: screenshotUrl,
    timestamp: new Date().toISOString()
  };
  
  console.log(`[RESULT DEBUG] Created scan result with ${result.issues.length} issues, score: ${result.complianceScore}, jurisdiction: ${result.jurisdiction}`);
  scanResults.set(scanId, result);
  activeScans--;
};

// Create a solid array of issues that covers all our section types
const createStandardIssues = (jurisdiction) => {
  console.log(`[ISSUES DEBUG] Creating standard issues for jurisdiction: ${jurisdiction}`);
  
  const issues = [
    {
      id: 'a11y-1',
      title: 'Missing alt text on images',
      description: 'Images must have alt text for screen readers',
      severity: 'high',
      legalReference: 'ADA Title III',
      penalty: 'Potential legal action and civil penalties'
    },
    {
      id: 'privacy-1',
      title: 'Privacy policy link not prominently displayed',
      description: 'Privacy policy should be easily accessible',
      severity: 'medium',
      legalReference: jurisdiction.includes('Australia') ? 'Australian Privacy Principles' : 
                    jurisdiction.includes('European Union') ? 'GDPR Article 13' : 'CCPA',
      penalty: 'Regulatory fines and penalties'
    },
    {
      id: 'a11y-2',
      title: 'Poor color contrast',
      description: 'Text should have sufficient contrast with background colors',
      severity: 'medium',
      legalReference: 'WCAG 2.1 AA',
      penalty: 'Potential ADA violations and legal action'
    },
    {
      id: 'compliance-1',
      title: 'Missing legal disclaimers',
      description: 'Legal disclaimers are required on attorney websites',
      severity: 'high',
      legalReference: 'State Bar Rules',
      penalty: 'Ethics violations and disciplinary action'
    },
    // Improved AI-related issues with more detail
    {
      id: 'ai-1',
      title: 'AI-generated content without disclosure',
      description: 'Content appears to be AI-generated without proper disclosure, which may violate legal ethics rules requiring transparency',
      severity: 'medium',
      legalReference: jurisdiction.includes('Australia') ? 'Australian Legal Practice Rules' : 'ABA Model Rules 7.1 (Communications Concerning a Lawyer\'s Services)',
      penalty: 'Ethical violations, bar discipline, and potential misleading conduct claims'
    },
    // New AI-related issue with more specificity
    {
      id: 'ai-2',
      title: 'AI content disclosure needs improvement',
      description: 'AI content disclosure exists but is not sufficiently prominent or clear, potentially misleading clients',
      severity: 'low',
      legalReference: jurisdiction.includes('California') ? 'California Business and Professions Code §17940-17943' : 'State Bar Advertising Rules',
      penalty: 'Potential ethics complaints and regulatory scrutiny'
    },
    // More detailed plagiarism issue
    {
      id: 'plagiarism-1',
      title: 'Suspected plagiarized content',
      description: 'Blog content contains passages that appear verbatim on other websites without proper attribution',
      severity: 'high',
      legalReference: 'Copyright Law and Professional Ethics Rules',
      penalty: 'Copyright infringement claims, damages, and professional discipline'
    },
    // Additional plagiarism issue with more detail
    {
      id: 'plagiarism-2',
      title: 'Copied legal information without attribution',
      description: 'Legal information appears to be copied from authoritative sources without proper citation',
      severity: 'medium',
      legalReference: 'Copyright Fair Use Doctrine & Professional Ethics',
      penalty: 'Potential copyright claims and ethics violations'
    },
    {
      id: 'email-1',
      title: 'Missing unsubscribe option',
      description: 'Marketing emails must include clear unsubscribe options',
      severity: 'medium',
      legalReference: jurisdiction.includes('Australia') ? 'Spam Act 2003' : 'CAN-SPAM Act',
      penalty: 'Regulatory fines and penalties'
    },
    // New issue for legal-specific compliance
    {
      id: 'legal-1',
      title: 'Missing attorney state bar information',
      description: 'Attorney websites should display state bar numbers and admission information',
      severity: 'high',
      legalReference: jurisdiction.includes('California') ? 'California Rules of Professional Conduct 7.1-7.5' : 'State Bar Rules',
      penalty: 'Ethics violations and bar association discipline'
    }
  ];
  
  return issues;
};

// API Routes
app.post('/api/v1/scans', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return res.status(400).json({ error: 'Invalid URL provided' });
    }
    
    console.log(`[API DEBUG] POST /api/v1/scans request received for URL: ${url}`);
    
    if (activeScans >= MAX_CONCURRENT_SCANS) {
      return res.status(429).json({ 
        error: 'Maximum concurrent scans reached. Please try again later.' 
      });
    }
    
    const scanId = randomUUID();
    console.log(`[API DEBUG] Generated new scan ID: ${scanId}`);
    
    scanResults.set(scanId, {
      url,
      status: 'processing',
      timestamp: new Date().toISOString()
    });
    
    activeScans++;
    
    // Start scan in background
    runScan(scanId, url)
      .catch(error => console.error(`Background scan failed for ${scanId}:`, error))
      .finally(() => activeScans--);
    
    console.log(`[API DEBUG] Returning scan ID ${scanId} with status 202`);
    return res.status(202).json({ scanId });
    
  } catch (error) {
    console.error('Error processing scan request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/v1/scans/:scanId', (req, res) => {
  try {
    const { scanId } = req.params;
    
    if (!scanId) {
      return res.status(400).json({ error: 'Scan ID is required' });
    }
    
    console.log(`[API DEBUG] GET /api/v1/scans/${scanId} request received`);
    
    const result = scanResults.get(scanId);
    if (!result) {
      console.log(`[API DEBUG] Scan ID ${scanId} not found in scanResults map`);
      return res.status(404).json({ error: 'Scan not found' });
    }
    
    console.log(`[API DEBUG] Found scan result for ${scanId}:`);
    console.log(`[API DEBUG] - URL: ${result.url}`);
    console.log(`[API DEBUG] - Status: ${result.status}`);
    console.log(`[API DEBUG] - Jurisdiction: ${result.jurisdiction}`);
    console.log(`[API DEBUG] - Issues count: ${result.issues?.length || 0}`);
    console.log(`[API DEBUG] - Returning response with status 200`);
    
    return res.status(200).json(result);
    
  } catch (error) {
    console.error('Error retrieving scan result:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/v1/scans`);
}); 