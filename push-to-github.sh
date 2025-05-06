#!/bin/bash

# This script helps push the Legal Website Compliance Checker to GitHub
# so it can be deployed to Vercel

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git first."
    exit 1
fi

# Check if the current directory is a git repository
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Check if remote origin exists
if ! git remote | grep -q "origin"; then
    echo "Please enter your GitHub repository URL (e.g., https://github.com/username/lm-compliance-checker.git):"
    read github_url
    
    if [ -z "$github_url" ]; then
        echo "No URL provided. Exiting."
        exit 1
    fi
    
    echo "Adding remote origin..."
    git remote add origin "$github_url"
else
    echo "Remote origin already exists."
fi

# Add all files
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
echo "Please enter a commit message (e.g., 'Initial commit' or 'Update for Vercel deployment'):"
read commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update for Vercel deployment"
fi

git commit -m "$commit_message"

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "Successfully pushed to GitHub!"
    echo "Next steps:"
    echo "1. Go to Vercel (https://vercel.com)"
    echo "2. Import your GitHub repository"
    echo "3. Follow the deployment steps in DEPLOY.md"
else
    echo "Failed to push to GitHub. Please check your credentials and try again."
fi 