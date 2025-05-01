import { useState, useEffect, useCallback } from 'react';

interface ScanResponse {
  scanId: string;
}

interface ScanError {
  message: string;
}

interface ScanResult {
  status: 'pending' | 'completed' | 'failed';
  results?: {
    accessibility: any[];
    privacy: any[];
    barAssociation: any[];
    canSpam: any[];
  };
  error?: string;
}

interface UseScanApiReturn {
  startScan: (url: string) => Promise<void>;
  isLoading: boolean;
  scanId: string | null;
  error: string | null;
  clearError: () => void;
  clearScanId: () => void;
  scanResult: ScanResult | null;
  isFetchingResults: boolean;
}

const POLLING_INTERVAL = 5000; // 5 seconds

export function useScanApi(): UseScanApiReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [scanId, setScanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const fetchScanResults = useCallback(async (id: string) => {
    try {
      setIsFetchingResults(true);
      const response = await fetch(`/api/v1/scans/${id}`);
      
      if (!response.ok) {
        const errorData = await response.json() as ScanError;
        throw new Error(errorData.message || 'Failed to fetch scan results');
      }

      const result = await response.json() as ScanResult;
      setScanResult(result);

      return result.status === 'completed' || result.status === 'failed';
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch scan results');
      return true; // Stop polling on error
    } finally {
      setIsFetchingResults(false);
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const pollResults = async () => {
      if (!scanId) return;

      const shouldStop = await fetchScanResults(scanId);
      
      if (!shouldStop) {
        timeoutId = setTimeout(pollResults, POLLING_INTERVAL);
      }
    };

    if (scanId) {
      pollResults();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [scanId, fetchScanResults]);

  const startScan = async (url: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      setScanResult(null);

      const response = await fetch('/api/v1/scans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json() as ScanError;
        throw new Error(errorData.message || 'Failed to start scan');
      }

      const data = await response.json() as ScanResponse;
      setScanId(data.scanId);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearScanId = () => {
    setScanId(null);
    setScanResult(null);
  };

  return {
    startScan,
    isLoading,
    scanId,
    error,
    clearError,
    clearScanId,
    scanResult,
    isFetchingResults,
  };
} 