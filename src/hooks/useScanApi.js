"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScanApi = useScanApi;
const react_1 = require("react");
// API base URL - ensure it's properly formatted for the environment
const API_BASE_URL = '/api/v1';
const POLLING_INTERVAL = 5000; // 5 seconds
function useScanApi() {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [isFetchingResults, setIsFetchingResults] = (0, react_1.useState)(false);
    const [scanId, setScanId] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const [scanResult, setScanResult] = (0, react_1.useState)(null);
    const fetchScanResults = (0, react_1.useCallback)(async (id) => {
        try {
            console.log(`[DEBUG] Fetching scan results for ID: ${id}`);
            setIsFetchingResults(true);
            // Log the fetch URL for debugging
            const fetchUrl = `${API_BASE_URL}/scans/${id}`;
            console.log(`[DEBUG] Fetching from URL: ${fetchUrl}`);
            const response = await fetch(fetchUrl);
            console.log(`[DEBUG] Fetch response status: ${response.status}`);
            if (!response.ok) {
                const errorData = await response.json();
                console.error(`[ERROR] Failed to fetch scan results: ${errorData.message || 'Unknown error'}`);
                throw new Error(errorData.message || 'Failed to fetch scan results');
            }
            const result = await response.json();
            console.log(`[DEBUG] Fetch successful, scan status: ${result.status}`);
            setScanResult(result);
            return result.status === 'completed' || result.status === 'failed';
        }
        catch (error) {
            console.error('[ERROR] Error in fetchScanResults:', error);
            setError(error instanceof Error ? error.message : 'Failed to fetch scan results');
            return true; // Stop polling on error
        }
        finally {
            setIsFetchingResults(false);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        let timeoutId;
        const pollResults = async () => {
            if (!scanId)
                return;
            console.log(`[DEBUG] Polling for results with scanId: ${scanId}`);
            const shouldStop = await fetchScanResults(scanId);
            if (!shouldStop) {
                console.log(`[DEBUG] Continuing to poll in ${POLLING_INTERVAL}ms`);
                timeoutId = setTimeout(pollResults, POLLING_INTERVAL);
            }
            else {
                console.log('[DEBUG] Polling stopped - scan completed or failed');
            }
        };
        if (scanId) {
            console.log('[DEBUG] Starting polling for scan results');
            pollResults();
        }
        return () => {
            if (timeoutId) {
                console.log('[DEBUG] Cleaning up polling timeout');
                clearTimeout(timeoutId);
            }
        };
    }, [scanId, fetchScanResults]);
    const startScan = async (url) => {
        try {
            console.log(`[DEBUG] Starting scan for URL: ${url}`);
            setIsLoading(true);
            setError(null);
            setScanResult(null);
            // Log the fetch URL and details
            const fetchUrl = `${API_BASE_URL}/scans`;
            console.log(`[DEBUG] POST request to: ${fetchUrl}`);
            console.log(`[DEBUG] Request body: ${JSON.stringify({ url })}`);
            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });
            console.log(`[DEBUG] Scan start response status: ${response.status}`);
            if (!response.ok) {
                const errorData = await response.json();
                console.error(`[ERROR] Failed to start scan: ${errorData.message || 'Unknown error'}`);
                throw new Error(errorData.message || 'Failed to start scan');
            }
            const data = await response.json();
            console.log(`[DEBUG] Scan started successfully with ID: ${data.scanId}`);
            setScanId(data.scanId);
        }
        catch (error) {
            console.error('[ERROR] Error in startScan:', error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred');
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    };
    const clearError = () => {
        console.log('[DEBUG] Clearing error state');
        setError(null);
    };
    const clearScanId = () => {
        console.log('[DEBUG] Clearing scanId and results');
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
