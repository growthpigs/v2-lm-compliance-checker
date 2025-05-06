"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleScanResult = void 0;
exports.populateTestData = populateTestData;
exports.clearTestData = clearTestData;
exports.sampleScanResult = {
    url: "example-law-firm.com",
    summary: {
        totalIssues: 7,
        jurisdiction: "California, United States"
    },
    screenshot: "https://picsum.photos/seed/lawfirm/800/600",
    issues: [
        {
            id: "1",
            severity: "Critical",
            title: "Missing Privacy Policy",
            description: "California law requires a comprehensive privacy policy - CCPA Violation"
        },
        {
            id: "2",
            severity: "Critical",
            title: "No Cookie Consent Banner",
            description: "GDPR and CCPA require explicit cookie consent"
        },
        {
            id: "3",
            severity: "Serious",
            title: "Incomplete Contact Information",
            description: "Bar association rules require complete contact details"
        },
        {
            id: "4",
            severity: "Serious",
            title: "Missing Disclaimer",
            description: "Legal advertising disclaimer required by state bar"
        },
        {
            id: "5",
            severity: "Moderate",
            title: "Accessibility Issues",
            description: "Several WCAG 2.1 violations detected"
        },
        {
            id: "6",
            severity: "Minor",
            title: "SSL Certificate Warning",
            description: "SSL certificate expires in 30 days"
        },
        {
            id: "7",
            severity: "Minor",
            title: "Performance Issues",
            description: "Page load time exceeds recommended threshold"
        }
    ]
};
function populateTestData() {
    sessionStorage.setItem('scanResults', JSON.stringify(exports.sampleScanResult));
    console.log('Test data populated in sessionStorage');
    return true;
}
function clearTestData() {
    sessionStorage.removeItem('scanResults');
    console.log('Test data cleared from sessionStorage');
    return true;
}
