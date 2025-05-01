import React from "react";
import { COMPLIANCE_SCAN_RESULTS } from "@/polymet/data/compliance-scan-results-data";
import AuroraBackground from "@/polymet/components/aurora-background";
import WebsiteScreenshotPreview from "@/polymet/components/website-screenshot-preview";
import GetFreeInstructionsSection from "@/polymet/components/get-free-instructions-section";
import GetReportSection from "@/polymet/components/get-report-section";
import RequiredActionItem from "@/polymet/components/required-action-item";
import ComplianceSection from "@/polymet/components/compliance-section";

export default function ScanResults() {
  const {
    url,
    jurisdiction,
    summary,
    screenshot,
    requiredActions,
    sections,
    issuesCount,
  } = COMPLIANCE_SCAN_RESULTS;

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
                A
              </div>
              <span className="text-white font-medium text-base sm:text-lg">
                {url}
              </span>
            </div>
          </div>

          {/* Compliance Score, left-aligned and smaller, shifted right 20px */}
          <div className="flex justify-start mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-red-500 ml-5">
              33% <span className="text-lg sm:text-xl">Compliance Score</span>
            </h1>
          </div>

          {/* Main Results Container */}
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-5 mb-4 flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch">
            {/* Screenshot - smaller, responsive */}
            <div className="w-full md:w-5/12 flex flex-col justify-center">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 px-2 py-1 flex items-center">
                  <div className="flex gap-1 mr-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-600 truncate">{url}</span>
                </div>
                <img
                  src={screenshot}
                  alt="Website screenshot"
                  className="w-full max-h-[140px] sm:max-h-[180px] md:max-h-[200px] object-cover"
                />
              </div>
            </div>

            {/* Non-compliant area */}
            <div className="w-full md:w-7/12 flex flex-col justify-center">
              <div className="flex flex-col items-center md:items-start justify-center h-full">
                {/* Pill-shaped Non-compliant badge */}
                <span className="inline-flex items-center px-5 py-2 mb-2 rounded-full bg-red-50 border border-red-200">
                  <span className="text-red-600 font-semibold text-lg mr-2">
                    Non-compliant
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
                {/* Jurisdiction - larger */}
                <div className="text-gray-800 text-lg font-bold mb-2 mt-1">
                  Jurisdiction:{" "}
                  <span className="text-blue-900">{jurisdiction}</span>
                </div>
                {/* Summary */}
                <div className="text-gray-700 text-base mb-4 leading-snug max-w-lg text-center md:text-left">
                  {summary}
                </div>
                {/* Fix These Problems Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full text-base shadow transition mb-0">
                  Fix These Problems
                </button>
              </div>
            </div>
          </div>

          {/* Button containers with border and space below */}
          <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="border border-gray-200 rounded-xl bg-white">
              <GetFreeInstructionsSection />
            </div>
            <div className="border border-gray-200 rounded-xl bg-white">
              <GetReportSection />
            </div>
          </div>
        </div>

        {/* Edge-to-edge light grey housing container for everything under the button containers */}
        <div
          className="w-full bg-gray-50 pt-12 pb-1 relative z-10"
          style={{
            marginTop: "-96px", // Bring this up so it sits halfway behind the button containers
          }}
        >
          <div className="container mx-auto px-2 sm:px-4 md:px-8 max-w-7xl">
            {/* Add a clear gap between button containers and required actions */}
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
                {requiredActions.items.map((action, index) => (
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
              {sections.map((section, index) => (
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
