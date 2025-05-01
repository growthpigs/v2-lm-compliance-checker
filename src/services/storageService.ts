import { ScanResult } from '../types';

// In-memory storage for development/testing
const scanResults = new Map<string, ScanResult>();

export async function storeScanResult(scanId: string, result: ScanResult): Promise<void> {
  // For now, just store in memory
  // TODO: Replace with actual database storage
  scanResults.set(scanId, result);
}

export async function getScanResult(scanId: string): Promise<ScanResult | null> {
  // For now, just retrieve from memory
  // TODO: Replace with actual database query
  return scanResults.get(scanId) || null;
}

export async function deleteScanResult(scanId: string): Promise<void> {
  // For now, just delete from memory
  // TODO: Replace with actual database deletion
  scanResults.delete(scanId);
}

export async function listScanResults(): Promise<ScanResult[]> {
  // For now, just return all from memory
  // TODO: Replace with actual database query with pagination
  return Array.from(scanResults.values());
} 