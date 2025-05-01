import React from 'react';
import { ScanForm } from './components/ScanForm';
import { ScanResults } from './components/ScanResults';
import { ExportResults } from './components/ExportResults';
import { useScanApi } from './hooks/useScanApi';

function App() {
  const { startScan, isLoading, scanId, error, scanResult, isFetchingResults } = useScanApi();

  const handleScanSubmit = async (url: string) => {
    try {
      await startScan(url);
    } catch (error) {
      // Error is already handled by the hook
    }
  };

  const renderScanStatus = () => {
    if (error) {
      return (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      );
    }

    if (!scanId) return null;

    if (isFetchingResults || scanResult?.status === 'pending') {
      return (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="animate-spin h-5 w-5 text-blue-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Scan in Progress</h3>
              <div className="mt-2 text-sm text-blue-700">
                Scan ID: {scanId}
                <br />
                Analyzing website for compliance issues...
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (scanResult?.status === 'completed' && scanResult.results) {
      return (
        <div className="mt-4 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Scan Completed</h3>
                  <div className="mt-2 text-sm text-green-700">
                    All checks have been completed. Review the results below.
                  </div>
                </div>
              </div>
              <ExportResults
                {...scanResult.results}
                scanId={scanId}
                url={scanResult.url}
                timestamp={scanResult.timestamp}
              />
            </div>
          </div>

          <ScanResults {...scanResult.results} />
        </div>
      );
    }

    if (scanResult?.status === 'failed') {
      return (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Scan Failed</h3>
              <div className="mt-2 text-sm text-red-700">
                {scanResult.error || 'An unexpected error occurred during the scan.'}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Legal Website Compliance Checker
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter a website URL to check for legal compliance issues
          </p>
        </div>

        <div className="mt-8">
          <ScanForm onSubmit={handleScanSubmit} isLoading={isLoading} />
          {renderScanStatus()}
        </div>
      </div>
    </div>
  );
}

export default App; 