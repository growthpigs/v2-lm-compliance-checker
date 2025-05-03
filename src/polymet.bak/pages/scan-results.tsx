import React from "react";
import { useNavigate } from "react-router-dom";
import AuroraBackground from "../components/aurora-background";
import WebsiteScreenshotPreview from "../components/website-screenshot-preview";
import GetFreeInstructionsSection from "../components/get-free-instructions-section";
import GetReportSection from "../components/get-report-section";
import RequiredActionItem from "../components/required-action-item";
import ComplianceSection from "../components/compliance-section";

// Get scan results from sessionStorage
const stored = sessionStorage.getItem('scanResults');
const scanResult = stored ? JSON.parse(stored) : null;

export default function ScanResults() {
  const navigate = useNavigate();

  // Destructure all fields with fallbacks
  const {
    url = '',
    jurisdiction = 'Not specified',
    summary = { totalIssues: 0 },
    screenshot = '',
    issues = [],
    barAssociation = 'Not specified'
  } = scanResult || {};

  if (!scanResult) {
    return (
      <section className="text-center py-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">No Scan Results Found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Start New Scan
        </button>
      </section>
    );
  }

  const score = Math.max(0, 100 - summary.totalIssues * 10);
  const issuesCount = summary.totalIssues;
  const complianceLabel = score === 100 ? "Compliant" : score >= 60 ? "Partially compliant" : "Non-compliant";

  // Group issues by type for compliance sections
  const sections = [
    {
      id: "critical",
      title: "Critical Issues",
      score: score,
      items: issues.filter(issue => issue.severity === "Critical").map(issue => ({
        id: issue.id,
        title: issue.title,
        status: "missing",
        info: issue.description
      }))
    },
    {
      id: "serious",
      title: "Serious Issues",
      score: score,
      items: issues.filter(issue => issue.severity === "Serious").map(issue => ({
        id: issue.id,
        title: issue.title,
        status: "missing",
        info: issue.description
      }))
    }
  ];

  // Required actions from critical and serious issues
  const requiredActions = {
    score: score,
    items: issues
      .filter(issue => ["Critical", "Serious"].includes(issue.severity))
      .map(issue => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        severity: issue.severity === "Critical" ? "high" : "medium"
      }))
  };

  return (
    <AuroraBackground>
      <div className="relative w-full">
        {/* Logomark top right */}
        <div className="absolute top-4 right-8 z-20">
          <img
            src="https://storage.googleapis.com/legal-moustache/Logomark%20Legal%20Moustache.svg"
            alt="Legal Moustache Logomark"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
          />
        </div>

        <div className="container mx-auto px-2 sm:px-4 md:px-8 max-w-7xl">
          {/* Website URL at the top */}
          <div className="flex justify-center mt-8 mb-3">
            <div className="bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full flex items-center">
              <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center mr-2 text-blue-900 font-bold">
                {url[0]?.toUpperCase() || 'W'}
              </div>
              <span className="text-white font-medium text-base sm:text-lg">
                {url}
              </span>
            </div>
          </div>

          {/* Compliance Score */}
          <div className="flex justify-start mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-red-500 ml-5">
              {score}% <span className="text-lg sm:text-xl">Compliance Score</span>
            </h1>
          </div>

          {/* Main Results Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Screenshot Preview */}
            {screenshot && (
              <div className="w-full md:w-5/12">
                <WebsiteScreenshotPreview
                  url={url}
                  screenshot={screenshot}
                  altText={`Screenshot of ${url}`}
                />
              </div>
            )}

            {/* Results Summary */}
            <div className="w-full md:w-7/12 flex flex-col justify-center">
              <div className="flex flex-col items-center md:items-start justify-center h-full">
                {/* Compliance status badge */}
                <span className="inline-flex items-center px-5 py-2 mb-2 rounded-full bg-red-50 border border-red-200">
                  <span className="text-red-600 font-semibold text-lg mr-2">
                    {complianceLabel}
                  </span>
                  <svg
                    className="w-5 h-5 text-red-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="text-red-500 text-base font-medium">
                    {issuesCount} compliance issues identified
                  </span>
                </span>

                {/* Jurisdiction and Bar Association */}
                <div className="text-gray-800 text-lg font-bold mb-2 mt-1">
                  Jurisdiction:{" "}
                  <span className="text-blue-900">
                    {jurisdiction}
                  </span>
                </div>
                <div className="text-gray-800 text-lg font-bold mb-2">
                  Bar Association:{" "}
                  <span className="text-blue-900">
                    {barAssociation}
                  </span>
                </div>

                {/* Fix Problems Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full text-base shadow transition mb-0">
                  Fix These Problems
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="border border-gray-200 rounded-xl bg-white">
              <GetFreeInstructionsSection />
            </div>
            <div className="border border-gray-200 rounded-xl bg-white">
              <GetReportSection />
            </div>
          </div>
        </div>

        {/* Results Details Section */}
        <div
          className="w-full bg-gray-50 pt-12 pb-1 relative z-10"
          style={{
            marginTop: "-96px",
          }}
        >
          <div className="container mx-auto px-2 sm:px-4 md:px-8 max-w-7xl">
            <div className="h-8"></div>

            {/* Required Actions Section */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">Required Actions</h2>
                <div className="bg-red-50 text-red-800 px-3 py-1 rounded-md text-xs font-medium">
                  Score: {requiredActions.score}
                </div>
              </div>
              <div className="space-y-3">
                {requiredActions.items.map((action) => (
                  <RequiredActionItem
                    key={action.id}
                    title={action.title}
                    description={action.description}
                    severity={action.severity}
                    onGetHelp={() => {}}
                  />
                ))}
              </div>
            </div>

            {/* Compliance Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {sections.map((section) => (
                <ComplianceSection
                  key={section.id}
                  title={section.title}
                  score={section.score}
                  items={section.items}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
} 