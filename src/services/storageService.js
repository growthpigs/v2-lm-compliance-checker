"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeScanResult = storeScanResult;
exports.getScanResult = getScanResult;
exports.deleteScanResult = deleteScanResult;
exports.listScanResults = listScanResults;
// In-memory storage for development/testing
const scanResults = new Map();
async function storeScanResult(scanId, result) {
    // For now, just store in memory
    // TODO: Replace with actual database storage
    scanResults.set(scanId, result);
}
async function getScanResult(scanId) {
    // For now, just retrieve from memory
    // TODO: Replace with actual database query
    return scanResults.get(scanId) || null;
}
async function deleteScanResult(scanId) {
    // For now, just delete from memory
    // TODO: Replace with actual database deletion
    scanResults.delete(scanId);
}
async function listScanResults() {
    // For now, just return all from memory
    // TODO: Replace with actual database query with pagination
    return Array.from(scanResults.values());
}
