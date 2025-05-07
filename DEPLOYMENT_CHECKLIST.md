# Deployment Checklist for LM Compliance Checker

This guide addresses the "Network error while checking scan status" issues with the Vercel deployment.

## CRITICAL FIX: API Routing Error Resolution

We've identified the root cause of the API errors: **The API requests are receiving HTML responses instead of JSON**. 
This happens when Vercel's catch-all route (`"src": "/(.*)", "dest": "/index.html"`) is intercepting API requests.

To fix this issue, we've implemented several solutions:

1. **Updated vercel.json** with explicit API routes:
   ```json
   {
     "version": 2,
     "routes": [
       { "src": "/api/health", "dest": "/api/health.js" },
       { "src": "/api/debug", "dest": "/api/debug.js" },
       { "src": "/api/scan-direct", "dest": "/api/scan-direct.js" },
       { "src": "/api/scan-proxy", "dest": "/api/scan-proxy.js" },
       { "src": "/api/v1", "dest": "/api/v1/index.js" },
       { "src": "/api/v1/scans/([^/]+)", "dest": "/api/v1/scans/[id].js?id=$1" },
       { "src": "/api/v1/scans", "dest": "/api/v1/scans/index.js" },
       { "handle": "filesystem" },
       { "src": "/(.*)", "dest": "/index.html" }
     ]
   }
   ```

2. **Added alternative endpoints** that use query parameters instead of path parameters:
   - `/api/scan-direct?id=123` - Direct endpoint using query parameters
   - `/api/scan-proxy?id=123` - Proxy endpoint that handles all scan status requests

3. **Updated scan-loading-page.js** to:
   - First try the scan-proxy endpoint (most reliable)
   - Fall back to scan-direct endpoint
   - Fall back to the original v1/scans endpoint (least reliable)
   - Check for HTML responses and handle them properly

## Essential Vercel Configuration

1. **Environment Variables**:
   - Adding `VITE_API_URL` is optional but can be set to your deployment URL if needed
   - If left blank, the app will use relative paths (recommended)

2. **Vercel Build Settings**:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

## Testing the Fix

We've added a dedicated API test page that you can access after deployment:

```
https://your-app-name.vercel.app/api-test.html
```

Use this test page to verify which API endpoints are working properly:
1. Try the "Test Debug Endpoint" and "Test Health Endpoint" buttons first
2. If those work, try "Test Scan Proxy" - this is the most reliable endpoint
3. Verify that all endpoints return JSON data, not HTML

## Verifying Success on Main App

After deployment, the scan loading page should work correctly with no more SyntaxErrors like this:
```
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

If you're still seeing errors:
1. Check the browser console for detailed logs
2. Look for messages about receiving HTML instead of JSON
3. Verify that requests are going to the scan-proxy endpoint
4. Test individual endpoints using the API test page

## Further Troubleshooting

If issues persist:
1. Try clearing browser cache
2. Ensure your vercel.json file was deployed correctly 
3. Check Vercel function logs for any server-side errors
4. Validate that the API files exist in the correct locations in your deployment

## Updated API Connection Diagnostics

We've added a special debug endpoint to help diagnose API connectivity issues. Test this first:

```
GET https://your-app-name.vercel.app/api/debug
```

If this endpoint works but others don't, this indicates a routing or configuration issue rather than a deployment problem.

## API Connectivity Troubleshooting

If you're still experiencing API connectivity issues:

1. **Check Browser Console**:
   - Open browser developer tools and check the console for:
     - `[DEBUG ENV]` messages showing environment variables
     - `[DEBUG FETCH]` messages showing API request attempts
     - Any CORS or network errors

2. **Check Vercel Logs**:
   - Go to Vercel dashboard → Your project → Deployments → Latest deployment → Functions
   - Look for errors in the serverless function logs
   - Check for any API request logs with `[DEBUG API]` prefix

3. **CORS Issues**:
   - Verify the API requests show proper CORS headers in browser developer tools
   - Confirm that OPTIONS preflight requests are returning 200 status codes

4. **API Path Issues**:
   - The enhanced client code now tries multiple path formats:
     - Relative path: `/api/v1/scans/[id]`
     - Origin-based path: `https://your-domain.com/api/v1/scans/[id]`
     - Environment variable path: `${VITE_API_URL}/api/v1/scans/[id]`

5. **Network/Firewall Issues**:
   - Check if any requests are being blocked by browser security policies
   - Try using an incognito window to rule out browser extension interference

## Testing API Endpoints Directly

Use browser developer tools or Postman to test each endpoint:

```
GET https://your-app-name.vercel.app/api/debug
GET https://your-app-name.vercel.app/api/health
GET https://your-app-name.vercel.app/api/v1/scans/123
```

## Fixed Environment Variable Setup

If you determine the environment variable approach is best:

1. Go to Vercel project settings → Environment Variables
2. Add `VITE_API_URL` with the value of your Vercel deployment URL (no trailing slash):
   - Example: `https://v2-lm-compliance-checker.vercel.app`
3. Redeploy the application after setting this variable

## Verifying Success

After deployment, check the browser console for these success indicators:
1. Health check endpoint returning 200 status
2. Scan status endpoint returning valid JSON data
3. No CORS or network errors in the console 