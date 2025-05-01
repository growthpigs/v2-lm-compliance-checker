import { randomUUID } from 'crypto';
import { runScan } from '../../../services/scannerService';
import { storeScanResult, getScanResult } from '../../../services/storageService';

// Simple in-memory concurrency control
let activeScans = 0;
const MAX_CONCURRENT_SCANS = 2;

export async function POST(req: Request) {
  try {
    // Check request body
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return new Response(JSON.stringify({ error: 'Invalid URL provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check concurrency
    if (activeScans >= MAX_CONCURRENT_SCANS) {
      return new Response(JSON.stringify({ error: 'Maximum concurrent scans reached. Please try again later.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate scan ID and store initial status
    const scanId = randomUUID();
    await storeScanResult(scanId, {
      url,
      status: 'processing',
      timestamp: new Date().toISOString()
    });

    // Increment active scans counter
    activeScans++;

    // Start scan in background
    runScan(scanId, url)
      .catch(error => console.error(`Background scan failed for ${scanId}:`, error))
      .finally(() => activeScans--);

    // Return scan ID immediately
    return new Response(JSON.stringify({ scanId }), {
      status: 202,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing scan request:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const scanId = url.searchParams.get('scanId');

    if (!scanId) {
      return new Response(JSON.stringify({ error: 'Scan ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await getScanResult(scanId);
    if (!result) {
      return new Response(JSON.stringify({ error: 'Scan not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error retrieving scan result:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 