"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.GET = GET;
const crypto_1 = require("crypto");
const scannerService_1 = require("../../../services/scannerService");
const storageService_1 = require("../../../services/storageService");
// Simple in-memory concurrency control
let activeScans = 0;
const MAX_CONCURRENT_SCANS = 2;
async function POST(req) {
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
        const scanId = (0, crypto_1.randomUUID)();
        await (0, storageService_1.storeScanResult)(scanId, {
            url,
            status: 'processing',
            timestamp: new Date().toISOString()
        });
        // Increment active scans counter
        activeScans++;
        // Start scan in background
        (0, scannerService_1.runScan)(scanId, url)
            .catch(error => console.error(`Background scan failed for ${scanId}:`, error))
            .finally(() => activeScans--);
        // Return scan ID immediately
        return new Response(JSON.stringify({ scanId }), {
            status: 202,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (error) {
        console.error('Error processing scan request:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
async function GET(req) {
    try {
        const url = new URL(req.url);
        const scanId = url.searchParams.get('scanId');
        if (!scanId) {
            return new Response(JSON.stringify({ error: 'Scan ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const result = await (0, storageService_1.getScanResult)(scanId);
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
    }
    catch (error) {
        console.error('Error retrieving scan result:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
