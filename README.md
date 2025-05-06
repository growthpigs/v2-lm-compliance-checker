# Legal Website Compliance Checker

A compliance scanning tool for law firm websites that checks for ABA rules compliance, accessibility standards, and more.

## Features

- Free instant legal & accessibility compliance scan
- AI-powered plagiarism detection
- Analyzes websites against ABA Model Rules 7.1-7.5
- Checks for ADA & WCAG accessibility standards
- Verifies FTC advertising guideline compliance
- Ensures privacy compliance requirements are met

## Project Structure

This project is split into two parts:
1. Frontend - React/Vite application
2. Backend - Express.js API server

## Deployment

### Frontend Deployment to Vercel

1. Push your code to GitHub
2. Log in to Vercel and create a new project
3. Import your GitHub repository
4. Configure the build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables:
   - `VITE_API_URL` - URL of your deployed API
6. Deploy

The frontend will automatically configure routing to handle all React Router paths.

### API Deployment (Options)

#### Option 1: Render.com or similar service
Deploy the Express server to a service like Render.com that supports Node.js applications.

#### Option 2: Serverless Functions
Convert API endpoints to serverless functions if needed.

## Local Development

### Installing Dependencies

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

This will start the frontend application.

### Running the Backend API Server

```bash
npm run server
```

### Running Both Frontend and Backend

```bash
npm run dev:all
```

## Building for Production

```bash
npm run build
```

## Testing

```bash
npm run test
```

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