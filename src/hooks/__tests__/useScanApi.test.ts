import { renderHook, act } from '@testing-library/react';
import { useScanApi } from '../useScanApi';

describe('useScanApi', () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should handle successful scan start', async () => {
    const mockScanId = '123456';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ scanId: mockScanId }),
    });

    const { result } = renderHook(() => useScanApi());

    await act(async () => {
      await result.current.startScan('https://example.com');
    });

    expect(result.current.scanId).toBe(mockScanId);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockFetch).toHaveBeenCalledWith('/api/v1/scans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: 'https://example.com' }),
    });
  });

  it('should poll for scan results after successful scan start', async () => {
    const mockScanId = '123456';
    // Mock successful scan start
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ scanId: mockScanId }),
    });
    // Mock first poll - pending
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: 'pending' }),
    });
    // Mock second poll - completed
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        status: 'completed',
        results: {
          accessibility: [],
          privacy: [],
          barAssociation: [],
          canSpam: [],
        },
      }),
    });

    const { result } = renderHook(() => useScanApi());

    // Start scan
    await act(async () => {
      await result.current.startScan('https://example.com');
    });

    // First poll
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.scanResult?.status).toBe('pending');

    // Advance timers and trigger second poll
    await act(async () => {
      jest.advanceTimersByTime(5000);
      await Promise.resolve();
    });

    expect(result.current.scanResult?.status).toBe('completed');
    expect(mockFetch).toHaveBeenCalledTimes(3);
    expect(mockFetch).toHaveBeenLastCalledWith(`/api/v1/scans/${mockScanId}`);
  });

  it('should handle API errors', async () => {
    const errorMessage = 'Invalid URL';
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: errorMessage }),
    });

    const { result } = renderHook(() => useScanApi());

    await act(async () => {
      try {
        await result.current.startScan('invalid-url');
      } catch (error) {
        // Expected error
      }
    });

    expect(result.current.scanId).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle polling errors', async () => {
    const mockScanId = '123456';
    // Mock successful scan start
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ scanId: mockScanId }),
    });
    // Mock polling error
    mockFetch.mockRejectedValueOnce(new Error('Polling failed'));

    const { result } = renderHook(() => useScanApi());

    // Start scan
    await act(async () => {
      await result.current.startScan('https://example.com');
    });

    // First poll
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.error).toBe('Polling failed');
    expect(result.current.isFetchingResults).toBe(false);
  });

  it('should handle network errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useScanApi());

    await act(async () => {
      try {
        await result.current.startScan('https://example.com');
      } catch (error) {
        // Expected error
      }
    });

    expect(result.current.scanId).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Network error');
  });

  it('should clear error when clearError is called', () => {
    const { result } = renderHook(() => useScanApi());

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('should clear scanId and scanResult when clearScanId is called', () => {
    const { result } = renderHook(() => useScanApi());

    act(() => {
      result.current.clearScanId();
    });

    expect(result.current.scanId).toBeNull();
    expect(result.current.scanResult).toBeNull();
  });
}); 