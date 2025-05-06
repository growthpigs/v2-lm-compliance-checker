# Deploying to Vercel

This guide will walk you through the process of deploying the Legal Website Compliance Checker application to Vercel.

## Prerequisites

1. A GitHub account with this repository pushed to it
2. A Vercel account (free tier is fine)

## Frontend Deployment

### Step 1: Push your code to GitHub

If you haven't already, make sure your code is pushed to a GitHub repository.

### Step 2: Connect Vercel to GitHub

1. Log in to your Vercel account
2. Click "Add New..." → "Project"
3. Select the GitHub repository containing your code
4. Authorize Vercel to access your repositories if prompted

### Step 3: Configure project settings

1. Project Name: Choose a name for your project (e.g., "lm-compliance-checker")
2. Framework Preset: Select "Vite" from the dropdown
3. Build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 4: Environment Variables

Add the following environment variables:
- `VITE_API_URL`: The URL of your API (we'll deploy this separately)

### Step 5: Deploy

Click "Deploy" and wait for the deployment to complete. Vercel will build your project and provide you with a URL to access your deployed frontend.

## API Deployment (Separate Project)

For the API, we'll create a separate Vercel project that uses serverless functions.

### Step 1: Create a new Vercel project

1. In Vercel, click "Add New..." → "Project"
2. Connect to the same GitHub repository
3. Name it differently (e.g., "api-lm-compliance-checker")

### Step 2: Configure project settings

1. Set the Root Directory to the "api" folder
2. Framework Preset: Select "Other"
3. Build settings:
   - Build Command: Leave blank or `npm install` if needed
   - Output Directory: Leave as default
   - Install Command: `npm install`

### Step 3: Environment Variables

You might need to add API-specific environment variables here if required.

### Step 4: Deploy

Click "Deploy" to deploy your API. Vercel will provide a URL for your API.

### Step 5: Update Frontend with API URL

Go back to your frontend project in Vercel:
1. Click on your frontend project
2. Go to "Settings" → "Environment Variables"
3. Update the `VITE_API_URL` with your new API URL (e.g., "https://api-lm-compliance-checker.vercel.app")
4. Click "Save"
5. Redeploy the frontend by going to the "Deployments" tab and clicking "Redeploy" on your latest deployment

## Testing the Deployment

1. Visit your frontend URL
2. Test the website scanner functionality
3. Make sure the API connection is working properly

## Troubleshooting

If you encounter issues:
1. Check the deployment logs in Vercel
2. Verify environment variables are set correctly
3. Test API endpoints directly using tools like Postman
4. Check browser console for frontend errors

## Custom Domains (Optional)

To use a custom domain:
1. Go to project settings → Domains
2. Add your domain and follow the verification process
3. Update DNS settings with your domain registrar as instructed by Vercel 