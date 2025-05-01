import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuroraBackground from "@/polymet/components/aurora-background";
import ScanLoading from "@/polymet/components/scan-loading";

export default function ScanLoadingPage() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Extract URL from query params or use default
  const urlParams = new URLSearchParams(window.location.search);
  const url = urlParams.get("url") || "smithjohnsonlaw.com";

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress =
          prevProgress +
          (prevProgress >= 90 ? 0.5 : prevProgress >= 70 ? 1 : 2);

        // Mark as complete when done
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
          }, 500);
          return 100;
        }

        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Use Navigate component for redirection when scan is complete
  if (isComplete) {
    return <Navigate to="/scan-results" replace />;
  }

  return (
    <AuroraBackground>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-center mb-8">
          <div className="max-w-2xl w-full">
            <ScanLoading url={url} progress={progress} />
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
