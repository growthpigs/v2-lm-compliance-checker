import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuroraBackground from "@/polymet/components/aurora-background";
import StatsSection from "@/polymet/components/stats-section";
import WhyComplianceSection from "@/polymet/components/why-compliance-section";
import AIBadge from "@/polymet/components/ai-badge";
import { clearScanSessionData } from "./scan-results";

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // Ensure URL has http/https prefix
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }
    
    console.log("[DEBUG] Form submitted with URL:", formattedUrl);
    
    // Clear any previous scan data to ensure fresh results
    clearScanSessionData();
    
    setIsLoading(true);
    setError(null);

    try {
      console.log("[DEBUG] Sending API request to start scan");
      
      // Use the API service we set up
      const response = await fetch('/api/v1/scans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formattedUrl }),
      });
      
      console.log(`[DEBUG] API response status: ${response.status}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start scan');
      }
      
      const data = await response.json();
      console.log(`[DEBUG] Scan started with ID: ${data.scanId}`);
      
      // Store scanId in sessionStorage for the loading page to use
      sessionStorage.setItem('currentScanId', data.scanId);
      sessionStorage.setItem('currentScanUrl', formattedUrl);
      
      // Navigate to the loading page with URL as query parameter
      console.log('[DEBUG] Navigating to loading page');
      navigate(`/scan-loading?url=${encodeURIComponent(formattedUrl)}`);
    } catch (error) {
      console.error('[ERROR] Scan failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to start scan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuroraBackground>
        <div className="container mx-auto px-5 sm:px-8 md:px-12">
          {/* Logo: about 90px wide on desktop, larger on mobile/tablet */}
          <div className="pt-8 sm:pt-12 md:pt-16 mb-3 flex justify-center">
            <img
              src="https://p129.p0.n0.cdn.zight.com/items/geuQwwwq/f7d9efe4-ed40-4a90-b537-064700bb38ca.svg?source=client&v=2c15211e8cd072bbfc32794cd20c1ab2"
              alt="Legal Moustache Logo"
              className="w-[70px] sm:w-[90px] md:w-[110px] lg:w-[90px] h-auto max-w-[80%]"
            />
          </div>

          <div className="text-center mb-6 md:mb-8">
            <h1
              className="font-bold text-white mb-3 md:mb-4
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
            "
            >
              Is Your Law Firm Website Compliant?
            </h1>
            <h2 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-medium text-blue-200 mb-4 max-w-3xl mx-auto px-4 leading-tight sm:leading-snug md:leading-tight">
              Free Instant Legal & Accessibility Compliance Scan – Now with
              AI-powered Plagiarism Detection
            </h2>
            {/* AI badge always visible, centered */}
            <div className="flex justify-center mb-2">
              <AIBadge />
            </div>
          </div>

          {/* URL Scan Form */}
          <div className="w-full max-w-xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="bg-[#4169e1]/20 backdrop-blur-sm p-6 rounded-xl border border-[#4169e1]/30 shadow-lg">
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Enter your website URL"
                  className="flex-1 px-4 py-2 rounded-md border border-blue-800/50 bg-white/10 text-white"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />

                <button 
                  type="submit"
                  disabled={isLoading || !url}
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center ${isLoading || !url ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'SCANNING...' : 'SCAN & FIX'} <span className="ml-1">→</span>
                </button>
              </div>
              {/* Display error if any */}
              {error && (
                <div className="text-red-300 text-sm mt-2">{error}</div>
              )}
              {/* Scan time text - left-aligned */}
              <div className="text-sm text-blue-200 text-left pl-1">
                Scan typically takes 20–30 seconds to complete. No email
                required. We provide solutions instantly with no strings
                attached.
              </div>
            </form>
          </div>

          {/* Paragraph with more space below, wider max width */}
          <div className="text-center mb-8 mt-0">
            <p className="text-gray-200 max-w-[840px] mx-auto text-sm md:text-base mb-8">
              Non-compliant websites pose significant risks. Bar associations
              are scrutinizing digital marketing more closely, while ADA-related
              lawsuits are increasing. The rise of AI-generated content also
              raises issues of originality and potential plagiarism. Our
              advanced scanner tackles these challenges directly.
            </p>
            {/* The mb-8 here gives extra space below the paragraph, not above */}
          </div>

          {/* Feature Checklist - extra gap between columns, no extra space above */}
          <div className="flex justify-center mb-12 mt-0 gap-x-12">
            <table className="border-collapse text-sm max-w-xl">
              <tbody>
                <tr>
                  <td className="pb-1.5 pr-6 align-top">
                    <div className="flex items-start">
                      <span className="text-green-400 mr-2 flex-shrink-0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 8L7 11L12 5"
                            stroke="#4ADE80"
                            strokeWidth="2"
                            strokeLinecap="square"
                          />
                        </svg>
                      </span>
                      <span className="text-white">
                        ABA Model Rules 7.1–7.5
                      </span>
                    </div>
                  </td>
                  <td className="pb-1.5 align-top">
                    <div className="flex items-start">
                      <span className="text-green-400 mr-2 flex-shrink-0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 8L7 11L12 5"
                            stroke="#4ADE80"
                            strokeWidth="2"
                            strokeLinecap="square"
                          />
                        </svg>
                      </span>
                      <span className="text-white">
                        ADA & WCAG accessibility standards
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="pb-1.5 pr-6 align-top">
                    <div className="flex items-start">
                      <span className="text-green-400 mr-2 flex-shrink-0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 8L7 11L12 5"
                            stroke="#4ADE80"
                            strokeWidth="2"
                            strokeLinecap="square"
                          />
                        </svg>
                      </span>
                      <span className="text-white">
                        FTC advertising guidelines
                      </span>
                    </div>
                  </td>
                  <td className="pb-1.5 align-top">
                    <div className="flex items-start">
                      <span className="text-green-400 mr-2 flex-shrink-0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 8L7 11L12 5"
                            stroke="#4ADE80"
                            strokeWidth="2"
                            strokeLinecap="square"
                          />
                        </svg>
                      </span>
                      <span className="text-white">
                        Privacy compliance requirements
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="pb-1.5 pr-6 align-top">
                    <div className="flex items-start">
                      <span className="text-green-400 mr-2 flex-shrink-0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 8L7 11L12 5"
                            stroke="#4ADE80"
                            strokeWidth="2"
                            strokeLinecap="square"
                          />
                        </svg>
                      </span>
                      <span className="text-white">
                        State bar advertising regulations
                      </span>
                    </div>
                  </td>
                  <td className="pb-1.5 align-top">
                    <div className="flex items-start">
                      <span className="text-green-400 mr-2 flex-shrink-0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 8L7 11L12 5"
                            stroke="#4ADE80"
                            strokeWidth="2"
                            strokeLinecap="square"
                          />
                        </svg>
                      </span>
                      <span className="text-white">
                        AI-generated and plagiarized content detection
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AuroraBackground>
      <StatsSection />
      <WhyComplianceSection />
    </>
  );
}
