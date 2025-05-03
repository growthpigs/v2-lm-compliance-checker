import React, { useEffect, useState } from "react";
import { Link, Navigate, useSearchParams, useNavigate } from "react-router-dom";
import AuroraBackground from "@/polymet/components/aurora-background";
import ScanLoading from "@/polymet/components/scan-loading";
import { clearScanSessionData } from "./scan-results";

export default function ScanLoadingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<'processing' | 'completed' | 'failed' | null>(null);

  // Extract URL from query params or session storage
  const urlParam = searchParams.get("url") || "";
  const url = urlParam || sessionStorage.getItem('currentScanUrl') || "smithjohnsonlaw.com";
  
  // Get scanId from session storage if it exists
  const scanId = sessionStorage.getItem('currentScanId');

  // Handler for canceling scan
  const handleCancelScan = () => {
    console.log("[DEBUG] Canceling scan");
    clearScanSessionData();
    navigate('/');
  };

  useEffect(() => {
    console.log("[DEBUG] ScanLoadingPage mounted with URL:", url);
    console.log("[DEBUG] ScanId from sessionStorage:", scanId);
    
    if (!scanId) {
      console.log("[WARN] No scanId found in sessionStorage");
      // Continue with simulated progress since we don't have a real scan
    }
    
    // Track progress
    let timeoutId: number | undefined;
    let progressValue = 0;
    
    const updateProgress = () => {
      // Increment progress at different rates based on current value
      const increment = progressValue >= 90 ? 0.5 : progressValue >= 70 ? 1 : 2;
      progressValue = Math.min(progressValue + increment, 100);
      setProgress(progressValue);
      
      // Check scan status if we have a scanId
      if (scanId && (progressValue % 10 === 0 || progressValue >= 95)) {
        checkScanStatus(scanId);
      }
      
      // Continue updating until we reach 100% or scan is complete
      if (progressValue < 100 && !isComplete) {
        timeoutId = window.setTimeout(updateProgress, 200);
      } else if (progressValue >= 100 && !isComplete && !scanId) {
        // If we have no scanId, complete after reaching 100%
        setTimeout(() => setIsComplete(true), 500);
      }
    };
    
    // Function to check scan status from API
    const checkScanStatus = async (id: string) => {
      try {
        console.log(`[DEBUG] Checking scan status for ID: ${id}`);
        const response = await fetch(`/api/v1/scans/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error(`[ERROR] Failed to fetch scan status: ${errorData.error || 'Unknown error'}`);
          setError(errorData.error || 'Failed to fetch scan status');
          return;
        }
        
        const result = await response.json();
        console.log(`[DEBUG] Scan status: ${result.status}`);
        console.log(`[DEBUG] Full result: ${JSON.stringify(result)}`);
        
        setScanStatus(result.status);
        
        if (result.status === 'completed') {
          console.log('[DEBUG] Scan completed, storing results');
          // Store scan results in sessionStorage for the results page
          sessionStorage.setItem('scanResults', JSON.stringify(result));
          setProgress(100);
          setTimeout(() => setIsComplete(true), 500);
        } else if (result.status === 'failed') {
          console.error('[ERROR] Scan failed:', result.error);
          setError(result.error || 'Scan failed');
        }
      } catch (error) {
        console.error('[ERROR] Error checking scan status:', error);
        setError('Network error while checking scan status. Please try again.');
      }
    };
    
    // Start progress updates
    updateProgress();
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [url, scanId]);

  // Use Navigate component for redirection when scan is complete
  if (isComplete) {
    console.log('[DEBUG] Scan complete, navigating to results page');
    return <Navigate to="/scan-results" replace />;
  }

  // Show error state if applicable
  if (error) {
    return (
      <AuroraBackground>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex justify-center mb-8">
            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-center mb-4 text-red-600">Scan Error</h2>
              <p className="text-gray-700 dark:text-gray-300 text-center mb-6">{error}</p>
              <div className="flex justify-center">
                <Link 
                  to="/" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full"
                >
                  Try Again
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AuroraBackground>
    );
  }

  return (
    <AuroraBackground>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-center mb-8">
          <div className="max-w-2xl w-full">
            <ScanLoading url={url} progress={progress} />
            
            {/* Cancel button */}
            <div className="flex justify-center mt-4">
              <button 
                onClick={handleCancelScan}
                className="text-white hover:text-blue-200 text-sm underline"
              >
                Cancel Scan
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
