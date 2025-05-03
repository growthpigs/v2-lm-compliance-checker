# Legal Website Compliance Checker

A tool to scan law firm websites for accessibility and compliance issues.

## Features

- Accessibility scanning with AXE Core
- Jurisdiction detection based on domain
- Privacy policy compliance checking
- AI content detection
- Plagiarism detection
- Email marketing compliance

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

**Single Command (Recommended)**:
```bash
npm run dev:all
```
This will start both the frontend and backend servers.

**Alternatively, run them separately**:

Start the backend:
```bash
npm run start
```

Start the frontend (in a separate terminal):
```bash
npm run dev
```

The application should be accessible at:
- Frontend: http://localhost:3174
- Backend API: http://localhost:3000

## Troubleshooting

If you encounter CORS issues:
1. Ensure both servers are running
2. Check browser console for specific error messages
3. Verify the proxy settings in `vite.config.ts`
4. Restart both servers

## API Endpoints

- `POST /api/v1/scans` - Start a new scan with a URL
- `GET /api/v1/scans/:scanId` - Get results of a scan
- `GET /api/health` - Health check endpoint

## Development

To clear current scans and restart the server:

```bash
pkill -f "node server.js" || true && node server.js
``` 