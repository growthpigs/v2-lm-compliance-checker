import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuroraBackground from '../components/aurora-background';

export default function LandingPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate a scan process
      const scanResult = {
        url: url.toLowerCase().replace(/^https?:\/\//, ''),
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
          }
        ]
      };

      // Store the scan result
      sessionStorage.setItem('scanResults', JSON.stringify(scanResult));
      
      // Navigate to results page
      navigate('/scan-results');
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuroraBackground>
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="https://storage.googleapis.com/legal-moustache/Logomark%20Legal%20Moustache.svg"
            alt="Legal Moustache Logo"
            className="w-16 h-16"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Is your law firm website compliant?
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Check your website for legal compliance issues in seconds
          </p>

          {/* URL Input Form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website URL"
                className="flex-1 px-6 py-3 rounded-full text-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <button
                type="submit"
                disabled={isLoading || !url}
                className={`px-8 py-3 rounded-full text-lg font-semibold transition
                  ${isLoading || !url 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              >
                {isLoading ? 'Scanning...' : 'Scan & Fix'}
              </button>
            </div>
          </form>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-2">Quick Scan</h3>
              <p className="text-white/70">Comprehensive compliance check in under 60 seconds</p>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-2">Expert Analysis</h3>
              <p className="text-white/70">Professional compliance recommendations</p>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-2">Fix Issues</h3>
              <p className="text-white/70">Step-by-step guidance to resolve compliance issues</p>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
} 