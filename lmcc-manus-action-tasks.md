{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 ArialMT;\f1\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs29\fsmilli14667 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 # Legal Website Compliance Checker - MVP Action Plan
\f1\fs24 \
\

\f0\fs29\fsmilli14667 This document provides a detailed, step-by-step action plan for developers to implement the Minimum Viable Product (MVP) of the Legal Website Compliance Checker, based on the previously defined architecture and feature specifications.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ## Task 1: Project Setup & Foundation
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 1.1: Initialize Monorepo & Install Dependencies**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will set up the basic monorepo structure using Turborepo (or a similar tool like Nx or pnpm workspaces) and create the initial `frontend` and `backend` application directories. We will also install the core dependencies needed for each workspace and the root level.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 1.1.1: Initialize Monorepo**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Initialize a new monorepo using Turborepo.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 npx create-turbo@latest legal-compliance-checker
\f1\fs24 \

\f0\fs29\fsmilli14667 cd legal-compliance-checker
\f1\fs24 \

\f0\fs29\fsmilli14667 # Follow prompts, choose pnpm/npm/yarn as package manager
\f1\fs24 \

\f0\fs29\fsmilli14667 # Remove default apps/packages if necessary
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create/Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/turbo.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create/Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 1.1.2: Create App Workspaces**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the directories for the frontend and backend applications.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 mkdir -p apps/frontend apps/backend
\f1\fs24 \

\f0\fs29\fsmilli14667 # Create basic package.json files in each
\f1\fs24 \

\f0\fs29\fsmilli14667 cd apps/frontend && pnpm init -y && cd ../..
\f1\fs24 \

\f0\fs29\fsmilli14667 cd apps/backend && pnpm init -y && cd ../..
\f1\fs24 \

\f0\fs29\fsmilli14667 # Update root package.json workspaces if needed
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update) - Add workspaces
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 1.1.3: Install Root Dependencies**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Install development dependencies needed at the root level (e.g., TypeScript, Turborepo).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 # Assuming pnpm
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -w -D typescript turbo eslint prettier
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 1.1.4: Install Backend Dependencies**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Install core backend dependencies.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 # Assuming pnpm
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F backend typescript @types/node
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F backend -D @vercel/node @types/node ts-node nodemon
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 1.1.5: Install Frontend Dependencies**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Install core frontend dependencies (assuming the existing React app structure is copied/integrated here).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 *Instruction to User:* Copy the existing `polymet-react-app` source code into the `apps/frontend` directory, replacing the placeholder `package.json` created earlier. Then run `pnpm install` in the `apps/frontend` directory or `pnpm install -r` from the root to install its dependencies.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/*
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create/Update) - User action
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update) - User action
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 1.1: Initialize Monorepo & Install Dependencies**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: Copying existing frontend code.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Ensure the chosen package manager (pnpm, yarn, npm) is used consistently.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 1.2: Configure Base Tooling (TypeScript, ESLint, Prettier)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will establish baseline configurations for TypeScript, ESLint, and Prettier to ensure code consistency and quality across the entire monorepo. This involves creating base configuration files at the root and extending them in individual workspaces.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 1.2.1: Create Root TypeScript Config**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create a base `tsconfig.base.json` at the root for shared compiler options.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```json
\f1\fs24 \

\f0\fs29\fsmilli14667 // tsconfig.base.json
\f1\fs24 \

\f0\fs29\fsmilli14667 \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"compilerOptions": \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"target": "ES2016",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"module": "CommonJS",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"esModuleInterop": true,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"forceConsistentCasingInFileNames": true,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"strict": true,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"skipLibCheck": true,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"resolveJsonModule": true
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/tsconfig.base.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 1.2.2: Configure Backend TypeScript**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create `tsconfig.json` in the backend app, extending the base config.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```json
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/tsconfig.json
\f1\fs24 \

\f0\fs29\fsmilli14667 \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"extends": "../../tsconfig.base.json",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"compilerOptions": \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"outDir": "dist",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"rootDir": ".",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"moduleResolution": "node"
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\},
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"include": ["src/**/*.ts", "api/**/*.ts"],
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"exclude": ["node_modules", "dist"]
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/tsconfig.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 1.2.3: Configure Frontend TypeScript**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Ensure `tsconfig.json` in the frontend app extends the base config (or update if needed).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```json
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/frontend/tsconfig.json (Example - adjust based on existing config)
\f1\fs24 \

\f0\fs29\fsmilli14667 \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"extends": "../../tsconfig.base.json",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"compilerOptions": \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Frontend specific options (e.g., JSX, lib: ["DOM", "ESNext"])
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"jsx": "react-jsx",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"lib": ["DOM", "DOM.Iterable", "ESNext"],
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"module": "ESNext",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"moduleResolution": "bundler",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"allowImportingTsExtensions": true,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"noEmit": true,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"isolatedModules": true
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// ... other frontend specific options
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\},
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"include": ["src"],
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"references": [\{ "path": "./tsconfig.node.json" \}] // If using Vite
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/tsconfig.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 1.2.4: Configure ESLint**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Set up ESLint configuration at the root (`.eslintrc.js` or similar) with appropriate plugins (TypeScript, React, etc.) and extend it in workspaces if needed.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```javascript
\f1\fs24 \

\f0\fs29\fsmilli14667 // .eslintrc.js (Example)
\f1\fs24 \

\f0\fs29\fsmilli14667 module.exports = \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0root: true,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0parser: '@typescript-eslint/parser',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0plugins: ['@typescript-eslint'],
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0extends: [
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0'eslint:recommended',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0'plugin:@typescript-eslint/recommended',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0'prettier', // Add prettier last
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0],
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// Add rules as needed
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/.eslintrc.js
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update) - Add ESLint config path if needed
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 1.2.5: Configure Prettier**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Set up Prettier configuration (`.prettierrc.js` or similar) and `.prettierignore` at the root.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```javascript
\f1\fs24 \

\f0\fs29\fsmilli14667 // .prettierrc.js (Example)
\f1\fs24 \

\f0\fs29\fsmilli14667 module.exports = \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0semi: true,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0trailingComma: 'es5',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0singleQuote: false,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0printWidth: 80,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0tabWidth: 2,
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/.prettierrc.js
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/.prettierignore
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create) - Add node_modules, dist, build etc.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 1.2.6: Add Lint/Format Scripts**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Add scripts to the root `package.json` for running ESLint and Prettier across the monorepo using Turborepo.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```json
\f1\fs24 \

\f0\fs29\fsmilli14667 // package.json (scripts section)
\f1\fs24 \

\f0\fs29\fsmilli14667 "scripts": \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"lint": "turbo run lint",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"format": "prettier --write \\"**/*.\{ts,tsx,md,json\}\\""
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// ... other scripts
\f1\fs24 \

\f0\fs29\fsmilli14667 \},
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \

\f0\fs29\fsmilli14667 Add corresponding `lint` scripts to `apps/frontend/package.json` and `apps/backend/package.json`.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 1.2: Configure Base Tooling**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 1.1.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Ensure ESLint plugins match the project needs (React hooks, JSX A11y for frontend).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The app should still build/run after this step (though no functionality is added).
\f1\fs24 \
\
\
\
\

\f0\fs29\fsmilli14667 ## Task 2: Backend API Implementation (Vercel Functions)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 2.1: Define Shared Types**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create a dedicated package within the monorepo (`packages/shared-types`) to define TypeScript interfaces, primarily `ScanResult` and `ScanIssue`, that will be used by both the backend API and the frontend application. This ensures type consistency across the application.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.1.1: Create Shared Types Package**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the directory structure and `package.json` for the shared types package.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 mkdir -p packages/shared-types/src
\f1\fs24 \

\f0\fs29\fsmilli14667 cd packages/shared-types && pnpm init -y && cd ../..
\f1\fs24 \

\f0\fs29\fsmilli14667 # Update package.json: set name, main, types fields
\f1\fs24 \

\f0\fs29\fsmilli14667 # Add typescript as dev dependency
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F shared-types -D typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 # Update root package.json workspaces
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/packages/shared-types/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create/Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update) - Add workspace
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.1.2: Define ScanIssue Interface**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Define the `ScanIssue` interface in the shared types package.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // packages/shared-types/src/index.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 export interface ScanIssue \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0id: string; // Unique ID for the issue type (e.g., 'axe-color-contrast')
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0title: string;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0description: string;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0severity: 'high' | 'medium' | 'low';
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0legalReference: string; // e.g., "WCAG 1.4.3"
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0penalty: string; // Static illustrative text
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/packages/shared-types/src/index.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.1.3: Define ScanResult Interface**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Define the `ScanResult` interface in the shared types package.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // packages/shared-types/src/index.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 // ... (ScanIssue interface above)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export interface ScanResult \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0url: string;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0status: 'processing' | 'completed' | 'failed';
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0complianceScore: number; // 0-100
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0issues: ScanIssue[];
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0jurisdiction: string | null; // e.g., "California Bar found"
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0summary: \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0jurisdictionNote: string | null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0recommendations: string[]; // Derived from high/medium severity issues
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\};
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0screenshot: string; // base64 PNG data URI
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0timestamp: string; // ISO 8601 format
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0error?: string; // Present if status is 'failed'
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/packages/shared-types/src/index.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.1.4: Configure TypeScript for Shared Package**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create `tsconfig.json` for the shared types package.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```json
\f1\fs24 \

\f0\fs29\fsmilli14667 // packages/shared-types/tsconfig.json
\f1\fs24 \

\f0\fs29\fsmilli14667 \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"extends": "../../tsconfig.base.json",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"compilerOptions": \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"outDir": "dist",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"declaration": true, // Generate .d.ts files
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"module": "CommonJS" // Or ESNext depending on usage
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\},
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"include": ["src"],
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"exclude": ["node_modules", "dist"]
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/packages/shared-types/tsconfig.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.1.5: Build Shared Types Package**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Add a build script to `packages/shared-types/package.json` and run it.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```json
\f1\fs24 \

\f0\fs29\fsmilli14667 // packages/shared-types/package.json (scripts section)
\f1\fs24 \

\f0\fs29\fsmilli14667 "scripts": \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"build": "tsc",
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"dev": "tsc -w"
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 # Run from root or package dir
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm run -F shared-types build
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/packages/shared-types/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 2.1: Define Shared Types**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 1.1.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Ensure the `main` and `types` fields in `packages/shared-types/package.json` point to the correct build output (`dist/index.js` and `dist/index.d.ts`).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The backend and frontend will later add this package as a dependency.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 2.2: Implement POST /api/v1/scans Endpoint Structure**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create the file structure and basic handler function for the Vercel Serverless Function that will process `POST` requests to `/api/v1/scans`. This includes setting up the request/response types, validating the incoming URL, generating a unique `scanId`, and returning the `scanId` in the response. It will initially just return the ID without starting the actual scan.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.2.1: Add Shared Types Dependency to Backend**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Add the `shared-types` package as a dependency for the backend.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 # Assuming pnpm
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F backend shared-types@workspace:*
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.2.2: Create API File Structure**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the directory and file for the POST endpoint handler according to Vercel's conventions.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 mkdir -p apps/backend/api/v1/scans
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/backend/api/v1/scans/index.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/api/v1/scans/index.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.2.3: Implement Basic POST Handler**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Write the initial handler function, including type definitions for request and response, URL validation, and `scanId` generation (using `crypto.randomUUID`).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/api/v1/scans/index.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 import type \{ VercelRequest, VercelResponse \} from '@vercel/node';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ randomUUID \} from 'crypto';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export default function handler(req: VercelRequest, res: VercelResponse) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (req.method !== 'POST') \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0res.setHeader('Allow', ['POST']);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return res.status(405).end(`Method $\{req.method\} Not Allowed`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0const \{ url \} = req.body;
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Basic URL validation (improve as needed)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (!url || typeof url !== 'string' || !url.startsWith('http')) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return res.status(400).json(\{ error: 'Invalid URL provided' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0const scanId = randomUUID();
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// TODO: Implement concurrency check
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// TODO: Initiate scan logic asynchronously
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// TODO: Store initial status in temporary storage
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0console.log(`Scan initiated for $\{url\} with ID: $\{scanId\}`);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Respond with 202 Accepted and the scanId
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0return res.status(202).json(\{ scanId \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/api/v1/scans/index.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.2.4: Add UUID Dependency (if needed)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Install `uuid` and its types if `crypto.randomUUID` is not available or preferred.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 # Optional: if crypto.randomUUID is not suitable
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F backend uuid
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F backend -D @types/uuid
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 2.2: Implement POST Endpoint Structure**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 2.1.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 This step provides the basic API endpoint structure. The actual scanning logic is not yet implemented.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The application should build, and this endpoint should be runnable locally using `vercel dev` (though it won't do much yet).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 2.3: Implement GET /api/v1/scans/[scanId] Endpoint Structure**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create the file structure and basic handler function for the Vercel Serverless Function that will process `GET` requests to `/api/v1/scans/\{scanId\}`. This includes retrieving the `scanId` from the path and setting up the structure to later fetch and return the scan status or result.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.3.1: Create GET API File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the file for the dynamic GET endpoint handler.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/backend/api/v1/scans/[scanId].ts
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/api/v1/scans/[scanId].ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.3.2: Implement Basic GET Handler**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Write the initial handler function, extracting the `scanId` from the query parameters.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/api/v1/scans/[scanId].ts
\f1\fs24 \

\f0\fs29\fsmilli14667 import type \{ VercelRequest, VercelResponse \} from '@vercel/node';
\f1\fs24 \

\f0\fs29\fsmilli14667 // Import ScanResult type if needed later
\f1\fs24 \

\f0\fs29\fsmilli14667 // import type \{ ScanResult \} from 'shared-types';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export default function handler(req: VercelRequest, res: VercelResponse) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (req.method !== 'GET') \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0res.setHeader('Allow', ['GET']);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return res.status(405).end(`Method $\{req.method\} Not Allowed`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0const \{ scanId \} = req.query;
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0if (!scanId || typeof scanId !== 'string') \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return res.status(400).json(\{ error: 'Scan ID is required' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// TODO: Fetch status/result from temporary storage using scanId
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0console.log(`Fetching status for scan ID: $\{scanId\}`);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Placeholder response
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const mockStatus = \{ status: 'processing' \}; // Or mock completed/failed
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0if (!mockStatus) \{ // Simulate not found
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return res.status(404).json(\{ error: 'Scan ID not found' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return res.status(200).json(mockStatus);
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/api/v1/scans/[scanId].ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 2.3: Implement GET Endpoint Structure**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 1.1.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 This endpoint will currently return mock data. Integration with storage happens in Step 2.5.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The application should build, and this endpoint should be runnable locally using `vercel dev`.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 2.4: Implement Temporary Storage Service (Vercel KV/Memory)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create an abstraction layer (`storageService.ts`) for interacting with the chosen temporary storage mechanism. For MVP, this could be Vercel KV (requires setup) or a simple in-memory cache (less reliable across serverless invocations but simpler initially). We'll implement basic `get` and `set` methods.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.4.1: Choose Storage Mechanism & Setup (if Vercel KV)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Decide between Vercel KV and in-memory cache. If Vercel KV:
\f1\fs24 \

\f0\fs29\fsmilli14667 *Instruction to User:* Create a Vercel KV database via the Vercel dashboard or CLI (`vercel kv create`). Link it to your project. Obtain the necessary environment variables (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`) and add them to your Vercel project settings and local `.env` file.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Install the Vercel KV client library.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F backend @vercel/kv
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/.env
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create/Update) - User action
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.4.2: Create Storage Service File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the service file.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 mkdir -p apps/backend/src/services
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/backend/src/services/storageService.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/services/storageService.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.4.3: Implement Storage Service (Vercel KV Example)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement `get` and `set` methods using the `@vercel/kv` client.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/src/services/storageService.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ kv \} from '@vercel/kv';
\f1\fs24 \

\f0\fs29\fsmilli14667 import type \{ ScanResult \} from 'shared-types';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 const SCAN_RESULT_TTL = 3600; // 1 hour in seconds
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // Type for status before full result is ready
\f1\fs24 \

\f0\fs29\fsmilli14667 type ScanStatus = \{ status: 'processing' \};
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export async function storeScanResult(scanId: string, result: ScanResult | ScanStatus): Promise<void> \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0await kv.set(`scan:$\{scanId\}`, result, \{ ex: SCAN_RESULT_TTL \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.log(`Stored result/status for scan $\{scanId\}`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error(`Error storing scan result for $\{scanId\}:`, error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Handle error appropriately, maybe throw
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export async function getScanResult(scanId: string): Promise<ScanResult | ScanStatus | null> \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const result = await kv.get<ScanResult | ScanStatus>(`scan:$\{scanId\}`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.log(`Retrieved result/status for scan $\{scanId\}`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return result;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error(`Error retrieving scan result for $\{scanId\}:`, error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Handle error appropriately, maybe throw
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // TODO: Add functions for concurrency control if needed (e.g., using kv.incr/decr)
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/services/storageService.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 2.4: Implement Temporary Storage Service**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 1.1.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: Setting up Vercel KV and environment variables if chosen.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 If using an in-memory cache, be aware it won't persist reliably between serverless function invocations. Vercel KV is recommended for slightly better persistence during the polling window.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Error handling within the service needs refinement.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 2.5: Integrate Storage with API Endpoints**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will update the POST and GET API handlers created in Steps 2.2 and 2.3 to use the `storageService`. The POST handler will store an initial `processing` status, and the GET handler will retrieve the current status or the final result from storage.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.5.1: Update POST Handler**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Modify `apps/backend/api/v1/scans/index.ts` to call `storeScanResult` with the initial status.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/api/v1/scans/index.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 // ... imports
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ storeScanResult \} from '../../src/services/storageService';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export default async function handler(req: VercelRequest, res: VercelResponse) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// ... (method check, validation)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0const scanId = randomUUID();
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Store initial processing status
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0await storeScanResult(scanId, \{ status: 'processing' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error(`Failed to store initial status for $\{scanId\}:`, error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return res.status(500).json(\{ error: 'Failed to initiate scan (storage error)' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// TODO: Initiate scan logic asynchronously
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0console.log(`Scan initiated for $\{url\} with ID: $\{scanId\}`);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return res.status(202).json(\{ scanId \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/api/v1/scans/index.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 2.5.2: Update GET Handler**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Modify `apps/backend/api/v1/scans/[scanId].ts` to call `getScanResult`.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/api/v1/scans/[scanId].ts
\f1\fs24 \

\f0\fs29\fsmilli14667 // ... imports
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ getScanResult \} from '../../src/services/storageService';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export default async function handler(req: VercelRequest, res: VercelResponse) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// ... (method check, scanId validation)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const \{ scanId \} = req.query as \{ scanId: string \};
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const result = await getScanResult(scanId);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0if (!result) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0return res.status(404).json(\{ error: 'Scan ID not found or expired' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Return the status or the full result
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return res.status(200).json(result);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error(`Failed to retrieve status for $\{scanId\}:`, error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return res.status(500).json(\{ error: 'Failed to retrieve scan status' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/api/v1/scans/[scanId].ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 2.5: Integrate Storage with API Endpoints**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 2.2, 2.3, 2.4.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: Ensure Vercel KV environment variables are accessible if using KV.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 After this step, the API endpoints can store and retrieve the `processing` status. The GET endpoint will return 404 if the ID doesn't exist or the TTL expired.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The app should build and run locally. Testing with `curl` or a tool like Postman should show the POST endpoint returning a `scanId` and the GET endpoint returning `\{ "status": "processing" \}` for that ID.
\f1\fs24 \
\
\
\
\

\f0\fs29\fsmilli14667 ## Task 3: Core Scanner Logic Implementation
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 3.1: Setup Puppeteer & Basic Navigation**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will install the necessary Puppeteer packages compatible with Vercel Serverless Functions (`puppeteer-core` and `chrome-aws-lambda`) and create utility functions to manage browser instances and basic page navigation. This involves handling the specific requirements for running headless Chrome in a serverless environment.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.1.1: Install Puppeteer Dependencies**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Install `puppeteer-core` (which doesn't bundle Chrome) and `chrome-aws-lambda` (provides a compatible Chrome binary for AWS Lambda/Vercel).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F backend puppeteer-core chrome-aws-lambda
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.1.2: Create Puppeteer Helper File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create a utility file for Puppeteer-related functions.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 mkdir -p apps/backend/src/utils
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/backend/src/utils/puppeteerHelper.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/puppeteerHelper.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.1.3: Implement Browser Launch Logic**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement a function to get a Puppeteer browser instance, configured correctly for the Vercel environment.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/src/utils/puppeteerHelper.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 import core from 'puppeteer-core';
\f1\fs24 \

\f0\fs29\fsmilli14667 import chrome from 'chrome-aws-lambda';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ Browser \} from 'puppeteer-core';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 let browserInstance: Browser | null = null;
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export async function getBrowserInstance(): Promise<Browser> \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// Use existing instance if available (may not persist across invocations)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (browserInstance && browserInstance.isConnected()) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return browserInstance;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0const executablePath = await chrome.executablePath;
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Check if running locally vs in Vercel
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const isLocal = process.env.NODE_ENV === 'development'; // Or check for VERCEL env var
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0const options = \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0args: chrome.args,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0executablePath: executablePath || core.executablePath(), // Fallback for local dev if needed
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0headless: isLocal ? true : chrome.headless, // Use chrome-aws-lambda's headless setting in prod
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0ignoreHTTPSErrors: true,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\};
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0browserInstance = await core.launch(options);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.log('Puppeteer browser launched successfully.');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error('Error launching Puppeteer browser:', error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0throw new Error('Could not launch browser instance');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return browserInstance;
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // Optional: Function to ensure browser is closed (call this at the end of the function)
\f1\fs24 \

\f0\fs29\fsmilli14667 export async function closeBrowserInstance(): Promise<void> \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (browserInstance) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0await browserInstance.close();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0console.log('Puppeteer browser closed.');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0console.error('Error closing Puppeteer browser:', error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0browserInstance = null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/puppeteerHelper.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.1.4: Implement Page Navigation Logic**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Add a function to navigate to a given URL using a browser instance.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/src/utils/puppeteerHelper.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 // ... (imports and getBrowserInstance)
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ Page \} from 'puppeteer-core';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 const PAGE_TIMEOUT = 30000; // 30 seconds
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export async function goToPage(browser: Browser, url: string): Promise<Page> \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0let page: Page | null = null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0page = await browser.newPage();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0await page.setViewport(\{ width: 1280, height: 800 \}); // Set a reasonable viewport
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0await page.goto(url, \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0waitUntil: 'networkidle2', // Wait until network is relatively quiet
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0timeout: PAGE_TIMEOUT,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.log(`Navigated to $\{url\}`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return page;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error(`Error navigating to $\{url\}:`, error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0if (page) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0await page.close();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Re-throw a more specific error
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0if (error instanceof Error && error.message.includes('timeout')) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0throw new Error(`Navigation timeout: Could not load $\{url\} within $\{PAGE_TIMEOUT / 1000\}s`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0throw new Error(`Failed to navigate to $\{url\}`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/puppeteerHelper.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 3.1: Setup Puppeteer & Basic Navigation**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 1.1.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Running Puppeteer on Vercel requires careful memory/CPU management. The serverless function memory might need to be increased (requires Pro plan).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Error handling for browser launch and navigation is crucial.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Ensure `chrome-aws-lambda` is compatible with the Node.js version used by Vercel functions.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 3.2: Implement Screenshot Capture**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will enhance the `puppeteerHelper.ts` utility to include a function that captures a full-page screenshot of a given Puppeteer page and returns it as a base64 encoded data URI string.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.2.1: Add Screenshot Function**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement the `captureScreenshot` function in `puppeteerHelper.ts`.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/src/utils/puppeteerHelper.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 // ... (imports, getBrowserInstance, goToPage)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export async function captureScreenshot(page: Page): Promise<string> \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const screenshotBuffer = await page.screenshot(\{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0fullPage: true,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0encoding: 'base64',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0type: 'png' // Specify PNG format
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.log('Screenshot captured successfully.');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return `data:image/png;base64,$\{screenshotBuffer\}`;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error('Error capturing screenshot:', error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0throw new Error('Failed to capture screenshot');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // TODO: Implement domain name overlay logic if required (more complex, might need canvas)
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/puppeteerHelper.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 3.2: Implement Screenshot Capture**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 3.1.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The domain name overlay is marked as TODO due to complexity (might require Node Canvas or client-side overlay). For MVP, returning just the screenshot is sufficient.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Ensure the base64 string format is correct (`data:image/png;base64,...`).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 3.3: Implement Axe-Core Accessibility Checks**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will integrate the `axe-core` library with Puppeteer to perform automated accessibility checks on the loaded page. A utility function will be created to run the scan and return the violations found.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.3.1: Install Axe-Core Puppeteer**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Install the `@axe-core/puppeteer` package.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F backend @axe-core/puppeteer
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.3.2: Create Accessibility Checker File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create a utility file for accessibility checking logic.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/backend/src/utils/accessibilityChecker.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/accessibilityChecker.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.3.3: Implement Axe Scan Function**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement a function to run axe-core on a Puppeteer page.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/src/utils/accessibilityChecker.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ AxePuppeteer \} from '@axe-core/puppeteer';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ Page \} from 'puppeteer-core';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ AxeResults \} from 'axe-core';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export async function runAxeScan(page: Page): Promise<AxeResults> \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const axe = new AxePuppeteer(page)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0// Optionally configure rules: .withTags(['wcag2aa', 'wcag21aa'])
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0// Exclude specific elements if needed: .exclude('#some-noisy-widget')
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0.disableRules(['color-contrast']); // Example: disable a specific rule if needed
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const results = await axe.analyze();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.log(`Axe scan completed. Found $\{results.violations.length\} violations.`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return results;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error('Error running Axe scan:', error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0throw new Error('Failed to perform accessibility scan');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/accessibilityChecker.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 3.3: Implement Axe-Core Accessibility Checks**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 3.1.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The specific axe-core ruleset can be configured (e.g., WCAG 2.1 AA). For MVP, the default rules (minus any problematic ones like `color-contrast` which can be noisy) are likely sufficient.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The function returns the full `AxeResults` object, which includes violations, passes, and incomplete checks.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 3.4: Implement Custom Compliance Checks (Privacy, Bar, CAN-SPAM)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create utility functions to perform the specific compliance checks required for the MVP beyond accessibility: presence of a privacy policy link, mention of a state bar association, and basic CAN-SPAM indicators (contact info/unsubscribe).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.4.1: Create Compliance Rules File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create a utility file for these custom checks.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/backend/src/utils/complianceRules.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/complianceRules.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.4.2: Implement Privacy Policy Check**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement a function to check for links containing "Privacy Policy".
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/src/utils/complianceRules.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ Page \} from 'puppeteer-core';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export async function checkPrivacyPolicyLink(page: Page): Promise<boolean> \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Look for an anchor tag containing 'Privacy Policy' (case-insensitive)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const link = await page.$x("//a[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'privacy policy')]");
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const found = link.length > 0;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.log(`Privacy Policy link check: $\{found\}`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return found;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error('Error checking for Privacy Policy link:', error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return false; // Assume not found on error
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/complianceRules.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.4.3: Implement Bar Association Check**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement a function to check for mentions of state bar associations in the page text.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/src/utils/complianceRules.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 // ... (imports, checkPrivacyPolicyLink)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // Basic list, expand as needed
\f1\fs24 \

\f0\fs29\fsmilli14667 const US_STATES = ["Alabama", "Alaska", /* ... add all states */ "Wyoming"];
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export async function checkBarAssociationMention(page: Page): Promise<string | null> \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const pageContent = await page.content();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const lowerPageContent = pageContent.toLowerCase();
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0for (const state of US_STATES) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0const searchTerm = `$\{state.toLowerCase()\} bar`;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0const searchTermAssoc = `$\{state.toLowerCase()\} bar association`;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0if (lowerPageContent.includes(searchTerm) || lowerPageContent.includes(searchTermAssoc)) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0const foundMention = `$\{state\} Bar mention found`;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0console.log(`Bar Association check: $\{foundMention\}`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0return foundMention; // Return the specific mention found
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.log('Bar Association check: No mention found');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error('Error checking for Bar Association mention:', error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return null; // Assume not found on error
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/complianceRules.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.4.4: Implement Basic CAN-SPAM Check**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement a function to check for contact info (email link) and basic unsubscribe text.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/src/utils/complianceRules.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 // ... (imports, other checks)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export interface CanSpamResult \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0hasContactInfo: boolean;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0hasUnsubscribeInfo: boolean;
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export async function checkCanSpamBasics(page: Page): Promise<CanSpamResult> \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const result: CanSpamResult = \{ hasContactInfo: false, hasUnsubscribeInfo: false \};
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Check for mailto links or common contact page links
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const mailtoLink = await page.$('a[href^="mailto:"]');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const contactLink = await page.$x("//a[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'contact')]");
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0result.hasContactInfo = !!mailtoLink || contactLink.length > 0;
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Check for common unsubscribe text
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const pageContent = await page.content();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const lowerPageContent = pageContent.toLowerCase();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0result.hasUnsubscribeInfo = lowerPageContent.includes('unsubscribe') || lowerPageContent.includes('manage your subscription');
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.log(`CAN-SPAM basic check: Contact=$\{result.hasContactInfo\}, Unsubscribe=$\{result.hasUnsubscribeInfo\}`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return result;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error('Error performing basic CAN-SPAM checks:', error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return result; // Return default false on error
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/complianceRules.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 3.4: Implement Custom Compliance Checks**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 3.1.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: Potentially expanding the list of US states.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 These checks are basic text/element searches and may produce false positives/negatives. They fulfill the MVP requirement but could be significantly improved post-MVP.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Error handling currently defaults to 'not found' or false.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 3.5: Implement Score Calculation**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create a utility function that takes the results from the accessibility scan (AxeResults) and the custom compliance checks, applies a simple weighting logic, and calculates an overall compliance score between 0 and 100.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.5.1: Create Score Calculator File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the utility file for score calculation.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/backend/src/utils/scoreCalculator.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/scoreCalculator.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.5.2: Implement Scoring Logic**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement the `calculateScore` function with basic weighting.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/src/utils/scoreCalculator.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ AxeResults \} from 'axe-core';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ CanSpamResult \} from './complianceRules';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 interface ScoreInput \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0axeResults: AxeResults;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0hasPrivacyPolicy: boolean;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0barMention: string | null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0canSpamResult: CanSpamResult;
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 const MAX_SCORE = 100;
\f1\fs24 \

\f0\fs29\fsmilli14667 const AXE_VIOLATION_WEIGHT_CRITICAL = 5;
\f1\fs24 \

\f0\fs29\fsmilli14667 const AXE_VIOLATION_WEIGHT_SERIOUS = 3;
\f1\fs24 \

\f0\fs29\fsmilli14667 const AXE_VIOLATION_WEIGHT_MODERATE = 1;
\f1\fs24 \

\f0\fs29\fsmilli14667 const PRIVACY_POLICY_WEIGHT = 15;
\f1\fs24 \

\f0\fs29\fsmilli14667 const BAR_MENTION_WEIGHT = 5; // Small penalty if NOT found (adjust logic if needed)
\f1\fs24 \

\f0\fs29\fsmilli14667 const CAN_SPAM_CONTACT_WEIGHT = 5;
\f1\fs24 \

\f0\fs29\fsmilli14667 const CAN_SPAM_UNSUBSCRIBE_WEIGHT = 10;
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export function calculateScore(input: ScoreInput): number \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0let score = MAX_SCORE;
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Deduct for Axe violations
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0input.axeResults.violations.forEach(violation => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0switch (violation.impact) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0case 'critical':
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0score -= AXE_VIOLATION_WEIGHT_CRITICAL;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0break;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0case 'serious':
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0score -= AXE_VIOLATION_WEIGHT_SERIOUS;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0break;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0case 'moderate':
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0score -= AXE_VIOLATION_WEIGHT_MODERATE;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0break;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0// Ignore minor
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\});
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Deduct if privacy policy link is missing
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (!input.hasPrivacyPolicy) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0score -= PRIVACY_POLICY_WEIGHT;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Optional: Deduct slightly if bar mention is missing (or reward if present? TBD)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// if (!input.barMention) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// \'a0 score -= BAR_MENTION_WEIGHT;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Deduct for missing CAN-SPAM elements
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (!input.canSpamResult.hasContactInfo) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0score -= CAN_SPAM_CONTACT_WEIGHT;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (!input.canSpamResult.hasUnsubscribeInfo) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0score -= CAN_SPAM_UNSUBSCRIBE_WEIGHT;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Ensure score doesn't go below 0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const finalScore = Math.max(0, score);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0console.log(`Calculated score: $\{finalScore\}`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0return finalScore;
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/scoreCalculator.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 3.5: Implement Score Calculation**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 3.3, 3.4.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The weighting logic is basic and subjective; it should be reviewed and adjusted based on perceived importance of each check.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The current logic penalizes for missing items. The Bar Association check might need different logic (e.g., is it good or bad to mention it?).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 3.6: Integrate Scanner Logic into POST Endpoint**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create a `scannerService.ts` to encapsulate the entire scanning process. This service will use the utilities created in previous steps (Puppeteer, Axe, custom rules, scoring). We will then modify the `POST /api/v1/scans` handler to invoke this service and store the final `ScanResult` or failure status.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.6.1: Create Scanner Service File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the service file.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/backend/src/services/scannerService.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/services/scannerService.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.6.2: Implement `runScan` Function**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement the main orchestration logic in `scannerService.ts`.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/src/services/scannerService.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ Browser, Page \} from 'puppeteer-core';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ getBrowserInstance, goToPage, captureScreenshot, closeBrowserInstance \} from '../utils/puppeteerHelper';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ runAxeScan \} from '../utils/accessibilityChecker';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ checkPrivacyPolicyLink, checkBarAssociationMention, checkCanSpamBasics \} from '../utils/complianceRules';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ calculateScore \} from '../utils/scoreCalculator';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ storeScanResult \} from './storageService';
\f1\fs24 \

\f0\fs29\fsmilli14667 import type \{ ScanResult, ScanIssue \} from 'shared-types';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ AxeResults \} from 'axe-core';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // Function to map Axe violations to ScanIssue format
\f1\fs24 \

\f0\fs29\fsmilli14667 function mapAxeViolationsToScanIssues(axeResults: AxeResults): ScanIssue[] \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0return axeResults.violations.map(violation => (\{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0id: violation.id,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0title: violation.help,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0description: violation.description,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0severity: violation.impact === 'critical' || violation.impact === 'serious' ? 'high' : (violation.impact === 'moderate' ? 'medium' : 'low'),
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0legalReference: violation.helpUrl, // Or map to specific WCAG rules
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0penalty: "Illustrative Penalty: Fines up to $X,XXX" // Static example
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}));
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // Function to add custom check issues
\f1\fs24 \

\f0\fs29\fsmilli14667 function addCustomIssues(issues: ScanIssue[], hasPrivacyPolicy: boolean, canSpamResult: Awaited<ReturnType<typeof checkCanSpamBasics>>): void \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (!hasPrivacyPolicy) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0issues.push(\{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0id: 'custom-privacy-policy',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0title: 'Missing Privacy Policy Link',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0description: 'A clear link to a privacy policy was not found.',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0severity: 'high',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0legalReference: 'Various (e.g., CCPA, GDPR)',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0penalty: 'Illustrative Penalty: Significant fines, loss of trust'
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (!canSpamResult.hasContactInfo) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0issues.push(\{ /* ... CAN-SPAM Contact Issue ... */ severity: 'medium' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0if (!canSpamResult.hasUnsubscribeInfo) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0issues.push(\{ /* ... CAN-SPAM Unsubscribe Issue ... */ severity: 'high' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export async function runScan(scanId: string, url: string): Promise<void> \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0let browser: Browser | null = null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0let page: Page | null = null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0let scanResult: Partial<ScanResult> = \{ url, status: 'processing' \}; // Start with processing
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0browser = await getBrowserInstance();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0page = await goToPage(browser, url);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Run checks in parallel where possible
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const [screenshot, axeResults, hasPrivacyPolicy, barMention, canSpamResult] = await Promise.all([
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0captureScreenshot(page),
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0runAxeScan(page),
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0checkPrivacyPolicyLink(page),
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0checkBarAssociationMention(page),
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0checkCanSpamBasics(page)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0]);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Process results
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const axeIssues = mapAxeViolationsToScanIssues(axeResults);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const customIssues: ScanIssue[] = [];
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0addCustomIssues(customIssues, hasPrivacyPolicy, canSpamResult);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const allIssues = [...axeIssues, ...customIssues];
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const score = calculateScore(\{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0axeResults,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0hasPrivacyPolicy,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0barMention,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0canSpamResult
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\});
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0scanResult = \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0url,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0status: 'completed',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0complianceScore: score,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0issues: allIssues,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0jurisdiction: barMention, // Use the found mention as jurisdiction note
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0summary: \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0jurisdictionNote: barMention ? `Potential relevance to $\{barMention\}.` : null,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0recommendations: allIssues.filter(i => i.severity === 'high').map(i => i.title) // Simple recommendations
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\},
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0screenshot,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0timestamp: new Date().toISOString(),
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\};
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.log(`Scan $\{scanId\} completed successfully.`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0await storeScanResult(scanId, scanResult as ScanResult);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error(`Scan $\{scanId\} failed for $\{url\}:`, error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const errorMessage = error instanceof Error ? error.message : 'Unknown scanning error';
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0scanResult = \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0...scanResult, // Keep URL
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0status: 'failed',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0error: errorMessage,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0timestamp: new Date().toISOString(),
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\};
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Store failure status
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0await storeScanResult(scanId, scanResult as ScanResult);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\} finally \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Ensure page and browser are closed even on error
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0if (page) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0try \{ await page.close(); \} catch (e) \{ console.error('Error closing page:', e); \}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Don't close browser here if we want to reuse it across invocations
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// await closeBrowserInstance(); // Close browser if not reusing
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/services/scannerService.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 3.6.3: Update POST Handler to Invoke Service**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Modify `apps/backend/api/v1/scans/index.ts` to call `runScan` asynchronously (don't `await` it in the handler response path) and implement basic concurrency control.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/api/v1/scans/index.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 import type \{ VercelRequest, VercelResponse \} from '@vercel/node';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ randomUUID \} from 'crypto';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ storeScanResult, getScanResult /* Import KV methods if needed for concurrency */ \} from '../../src/services/storageService';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ runScan \} from '../../src/services/scannerService';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ kv \} from '@vercel/kv'; // Import KV directly for concurrency example
\f1\fs24 \
\

\f0\fs29\fsmilli14667 const MAX_CONCURRENT_SCANS = 2;
\f1\fs24 \

\f0\fs29\fsmilli14667 const CONCURRENCY_KEY = 'active_scans';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export default async function handler(req: VercelRequest, res: VercelResponse) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (req.method !== 'POST') \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0res.setHeader('Allow', ['POST']);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return res.status(405).end(`Method $\{req.method\} Not Allowed`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0const \{ url \} = req.body;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (!url || typeof url !== 'string' || !url.startsWith('http')) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return res.status(400).json(\{ error: 'Invalid URL provided' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// --- Concurrency Check Example (using Vercel KV) ---
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const currentScans = await kv.get<number>(CONCURRENCY_KEY) ?? 0;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0if (currentScans >= MAX_CONCURRENT_SCANS) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0console.warn('Concurrency limit reached');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0return res.status(429).json(\{ error: 'Concurrency limit reached, please try again shortly.' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Increment counter (potential race condition, use incrby if available/needed)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0await kv.set(CONCURRENCY_KEY, currentScans + 1, \{ ex: 120 \}); // Short TTL for counter
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (concurrencyError) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error('Concurrency check failed:', concurrencyError);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Decide whether to proceed or fail
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// --- End Concurrency Check ---
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0const scanId = randomUUID();
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0await storeScanResult(scanId, \{ status: 'processing' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\} catch (error) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.error(`Failed to store initial status for $\{scanId\}:`, error);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Decrement concurrency counter on error before storing status
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0try \{ await kv.decr(CONCURRENCY_KEY); \} catch (e) \{ console.error('Failed to decrement concurrency counter:', e); \}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return res.status(500).json(\{ error: 'Failed to initiate scan (storage error)' \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Respond immediately with 202 Accepted
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0res.status(202).json(\{ scanId \});
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Run the scan asynchronously (fire and forget in the context of the HTTP response)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// The scan will update the status in KV when done/failed.
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0runScan(scanId, url)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0.catch(scanError => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0// Log unexpected errors during the async scan execution itself
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0console.error(`Unhandled error during async scan $\{scanId\}:`, scanError);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0// Status should already be set to 'failed' within runScan
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\})
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0.finally(async () => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0// Decrement concurrency counter when scan finishes/fails
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0await kv.decr(CONCURRENCY_KEY);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0console.log(`Decremented concurrency counter for scan $\{scanId\}`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\} catch (e) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0console.error(`Failed to decrement concurrency counter for scan $\{scanId\}:`, e);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\});
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0console.log(`Scan $\{scanId\} initiated for $\{url\} (running asynchronously)`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/api/v1/scans/index.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 3.6: Integrate Scanner Logic into POST Endpoint**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 2.5, 3.1, 3.2, 3.3, 3.4, 3.5.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: Ensure Vercel KV setup is complete if used for concurrency.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The `runScan` function is called without `await` before sending the response. This allows the API to return `202 Accepted` quickly while the scan runs in the background (within the serverless function's execution time limit).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Concurrency control is added using Vercel KV; this is a basic example and might need refinement to handle race conditions robustly (e.g., using `kv.incr` and checking the result atomically if possible).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Error handling within `runScan` updates the status in storage. The `.finally` block ensures the concurrency counter is decremented.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Vercel function timeout needs to be sufficient for `runScan` to complete (e.g., 60 seconds, requires Pro plan if >10s).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 After this step, the backend API should be fully functional for the MVP scope.
\f1\fs24 \
\
\
\
\

\f0\fs29\fsmilli14667 ## Task 4: Frontend UI Implementation (React)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 4.1: Create ScanForm Component**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create a new React component (`ScanForm.tsx`) within the `apps/frontend` workspace. This component will contain the input field for the user to enter the website URL and a submit button to trigger the scan. Basic client-side validation for the URL format will be included.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.1.1: Add Shared Types Dependency to Frontend**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Add the `shared-types` package as a dependency for the frontend.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 # Assuming pnpm
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F frontend shared-types@workspace:*
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.1.2: Create ScanForm Component File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the component file within the frontend source structure (e.g., `src/components/ScanForm.tsx`).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 mkdir -p apps/frontend/src/components
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/frontend/src/components/ScanForm.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/ScanForm.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.1.3: Implement ScanForm Component Logic**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement the component using React state for the input value and handling form submission.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/frontend/src/components/ScanForm.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 import React, \{ useState \} from 'react';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 interface ScanFormProps \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0onSubmit: (url: string) => void;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0isLoading: boolean;
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export const ScanForm: React.FC<ScanFormProps> = (\{ onSubmit, isLoading \}) => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const [url, setUrl] = useState<string>('');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const [error, setError] = useState<string | null>(null);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0const handleSubmit = (event: React.FormEvent) => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0event.preventDefault();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0setError(null);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Basic URL validation
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0if (!url || !url.startsWith('http')) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0setError('Please enter a valid URL (starting with http or https).');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0return;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0onSubmit(url);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\};
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<form onSubmit=\{handleSubmit\}>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<input
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0type="url" // Use type="url" for better semantics/mobile keyboards
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0value=\{url\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0onChange=\{(e) => setUrl(e.target.value)\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0placeholder="Enter website URL (e.g., https://example.com)"
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0disabled=\{isLoading\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0required
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0// Add appropriate styling/classNames
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0/>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<button type="submit" disabled=\{isLoading\}>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\{isLoading ? 'Scanning...' : 'Scan Website'\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0</button>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{error && <p style=\{\{ color: 'red' \}\}>\{error\}</p>\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</form>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/ScanForm.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.1.4: Integrate ScanForm into Landing Page**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Import and use the `ScanForm` component within the main landing page component (e.g., `LandingPage.tsx` or `App.tsx`). The `onSubmit` prop will be connected to the API hook later (Step 4.2).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // Example integration in apps/frontend/src/App.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 import React from 'react';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ ScanForm \} from './components/ScanForm';
\f1\fs24 \

\f0\fs29\fsmilli14667 // ... other imports
\f1\fs24 \
\

\f0\fs29\fsmilli14667 function App() \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// Placeholder state/handlers - will be replaced by useScanApi hook
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const [isLoading, setIsLoading] = useState(false);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const handleScanSubmit = (url: string) => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0console.log('Submitting URL:', url);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0setIsLoading(true);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// TODO: Call API hook's submit function
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\};
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<h1>Legal Website Compliance Checker</h1>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<ScanForm onSubmit=\{handleScanSubmit\} isLoading=\{isLoading\} />
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* Other components: LoadingIndicator, ErrorDisplay, ResultsDisplay */\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export default App;
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/App.tsx (or relevant page component)
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 4.1: Create ScanForm Component**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 1.1 (Frontend setup).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Styling is omitted but should be applied according to the existing design system.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The `onSubmit` handler is currently a placeholder.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 4.2: Create API Hook (useScanApi)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create a custom React hook (`useScanApi.ts`) to encapsulate all logic related to interacting with the backend API. This includes: initiating a scan (`POST /api/v1/scans`), polling for results (`GET /api/v1/scans/\{scanId\}`), and managing the state (loading, error, scanId, result data).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.2.1: Create Hook File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the custom hook file.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 mkdir -p apps/frontend/src/hooks
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/frontend/src/hooks/useScanApi.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/hooks/useScanApi.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.2.2: Implement Hook Logic**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement the hook using `useState` and `useEffect` for state management and polling.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/frontend/src/hooks/useScanApi.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ useState, useEffect, useCallback, useRef \} from 'react';
\f1\fs24 \

\f0\fs29\fsmilli14667 import type \{ ScanResult \} from 'shared-types';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 const POLLING_INTERVAL = 3000; // 3 seconds
\f1\fs24 \

\f0\fs29\fsmilli14667 const MAX_POLLING_ATTEMPTS = 20; // Max ~60 seconds total polling
\f1\fs24 \
\

\f0\fs29\fsmilli14667 interface UseScanApiReturn \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0scanId: string | null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0result: ScanResult | null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0isLoading: boolean;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0error: string | null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0submitScan: (url: string) => Promise<void>;
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export const useScanApi = (): UseScanApiReturn => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const [scanId, setScanId] = useState<string | null>(null);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const [result, setResult] = useState<ScanResult | null>(null);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const [isLoading, setIsLoading] = useState<boolean>(false);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const [error, setError] = useState<string | null>(null);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const pollingAttempts = useRef<number>(0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const pollingIntervalId = useRef<NodeJS.Timeout | null>(null);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Function to stop polling
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const stopPolling = useCallback(() => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0if (pollingIntervalId.current) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0clearInterval(pollingIntervalId.current);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0pollingIntervalId.current = null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0pollingAttempts.current = 0;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0// Keep isLoading true until final result/error is processed
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}, []);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Function to fetch results
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const fetchResult = useCallback(async (currentScanId: string) => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0if (pollingAttempts.current >= MAX_POLLING_ATTEMPTS) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0setError('Scan timed out waiting for results.');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0stopPolling();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0setIsLoading(false);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0return;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0pollingAttempts.current++;
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0const response = await fetch(`/api/v1/scans/$\{currentScanId\}`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0if (!response.ok) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0// Handle non-2xx errors (e.g., 404, 500)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0const errorData = await response.json().catch(() => (\{\})); // Try to parse error
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0throw new Error(errorData.error || `Failed to fetch status ($\{response.status\})`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0const data: ScanResult = await response.json();
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0if (data.status === 'completed' || data.status === 'failed') \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0setResult(data);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0setError(data.status === 'failed' ? (data.error || 'Scan failed') : null);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0stopPolling();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0setIsLoading(false);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\} else \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0// Still processing, continue polling
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0setResult(data); // Update with processing status
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\} catch (err) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0console.error('Polling error:', err);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching results.');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0stopPolling();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0setIsLoading(false);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}, [stopPolling]);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Effect to handle polling
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0useEffect(() => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0if (scanId && isLoading && !pollingIntervalId.current) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0// Start polling immediately, then set interval
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0fetchResult(scanId);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0pollingIntervalId.current = setInterval(() => fetchResult(scanId), POLLING_INTERVAL);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Cleanup function to stop polling when component unmounts or scanId/isLoading changes
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return () => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0stopPolling();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\};
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}, [scanId, isLoading, fetchResult, stopPolling]);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Function to submit a new scan
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const submitScan = useCallback(async (url: string) => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0setIsLoading(true);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0setError(null);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0setResult(null);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0setScanId(null);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0stopPolling(); // Stop any previous polling
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0try \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0const response = await fetch('/api/v1/scans', \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0method: 'POST',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0headers: \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0'Content-Type': 'application/json',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\},
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0body: JSON.stringify(\{ url \}),
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\});
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0if (!response.ok) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0// Handle non-2xx errors (e.g., 400, 429, 500)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0const errorData = await response.json().catch(() => (\{\}));
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0throw new Error(errorData.error || `Failed to initiate scan ($\{response.status\})`);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0const data = await response.json();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0setScanId(data.scanId);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0// isLoading remains true, polling starts via useEffect
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\} catch (err) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0console.error('Submit error:', err);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0setError(err instanceof Error ? err.message : 'An unknown error occurred during submission.');
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0setIsLoading(false);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}, [stopPolling]);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return \{ scanId, result, isLoading, error, submitScan \};
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/hooks/useScanApi.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.2.3: Integrate Hook into Landing Page**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Replace the placeholder state and handlers in the landing page component with the `useScanApi` hook.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // Example integration in apps/frontend/src/App.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 import React from 'react';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ ScanForm \} from './components/ScanForm';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ useScanApi \} from './hooks/useScanApi';
\f1\fs24 \

\f0\fs29\fsmilli14667 // Import LoadingIndicator, ErrorDisplay, ResultsDisplay components (created later)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 function App() \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const \{ scanId, result, isLoading, error, submitScan \} = useScanApi();
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<h1>Legal Website Compliance Checker</h1>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<ScanForm onSubmit=\{submitScan\} isLoading=\{isLoading\} />
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* \{isLoading && <LoadingIndicator />\} */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* \{error && <ErrorDisplay message=\{error\} />\} */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* \{result && <ResultsDisplay result=\{result\} />\} */\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* Basic status display for testing */\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{isLoading && <p>Loading...</p>\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{error && <p style=\{\{ color: 'red' \}\}>Error: \{error\}</p>\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{result && <pre>\{JSON.stringify(result, null, 2)\}</pre>\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export default App;
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/App.tsx (or relevant page component)
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 4.2: Create API Hook (useScanApi)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 2.2, 2.3, 2.5 (Backend API), Step 4.1 (ScanForm).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 This hook handles the core client-server communication flow.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Polling logic includes a max attempt limit to prevent infinite polling.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Error handling covers both submission and polling phases.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 The hook provides state (`isLoading`, `error`, `result`) to be used by UI components.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 4.3: Implement Loading & Error States**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create two simple React components: `LoadingIndicator.tsx` to show a visual cue while the scan is in progress, and `ErrorDisplay.tsx` to show error messages returned by the `useScanApi` hook.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.3.1: Create LoadingIndicator Component**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the component file and implement a basic loading indicator (e.g., text or a spinner).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/frontend/src/components/LoadingIndicator.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/LoadingIndicator.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/frontend/src/components/LoadingIndicator.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 import React from 'react';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export const LoadingIndicator: React.FC = () => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<p>Scanning website... Please wait.</p>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* Optional: Add a CSS spinner or animation */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/LoadingIndicator.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.3.2: Create ErrorDisplay Component**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the component file and implement a basic error message display.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/frontend/src/components/ErrorDisplay.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/ErrorDisplay.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/frontend/src/components/ErrorDisplay.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 import React from 'react';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 interface ErrorDisplayProps \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0message: string | null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export const ErrorDisplay: React.FC<ErrorDisplayProps> = (\{ message \}) => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (!message) return null;
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<div style=\{\{ color: 'red', border: '1px solid red', padding: '10px', margin: '10px 0' \}\}>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<strong>Error:</strong> \{message\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/ErrorDisplay.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.3.3: Integrate Components into Landing Page**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Use the `isLoading` and `error` states from the `useScanApi` hook to conditionally render these components in the main application component.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // Example integration in apps/frontend/src/App.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 // ... imports
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ LoadingIndicator \} from './components/LoadingIndicator';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ ErrorDisplay \} from './components/ErrorDisplay';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 function App() \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const \{ result, isLoading, error, submitScan \} = useScanApi();
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<h1>Legal Website Compliance Checker</h1>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<ScanForm onSubmit=\{submitScan\} isLoading=\{isLoading\} />
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{isLoading && <LoadingIndicator />\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<ErrorDisplay message=\{error\} />
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* \{result && !isLoading && !error && <ResultsDisplay result=\{result\} />\} */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* Remove basic status display if components are working */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* \{result && <pre>\{JSON.stringify(result, null, 2)\}</pre>\} */\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // ... export
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/App.tsx (or relevant page component)
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 4.3: Implement Loading & Error States**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 4.2 (useScanApi hook).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 These are basic display components; styling should match the application's design.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Ensure they are rendered conditionally based on the hook's state.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 4.4: Create ResultsDisplay Structure & Hero**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create the main container component (`ResultsDisplay.tsx`) for showing the scan results. This includes creating a sub-component (`ResultsHero.tsx`) for the top section displaying the overall score and the website screenshot.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.4.1: Create ResultsDisplay Component File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the main results container component file.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/frontend/src/components/ResultsDisplay.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/ResultsDisplay.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.4.2: Create ResultsHero Component File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the hero section component file.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/frontend/src/components/ResultsHero.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/ResultsHero.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.4.3: Implement ResultsHero Component**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement the hero component to display the score and screenshot.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/frontend/src/components/ResultsHero.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 import React from 'react';
\f1\fs24 \

\f0\fs29\fsmilli14667 import type \{ ScanResult \} from 'shared-types';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 interface ResultsHeroProps \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0score: number;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0screenshotDataUrl: string;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0url: string;
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export const ResultsHero: React.FC<ResultsHeroProps> = (\{ score, screenshotDataUrl, url \}) => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<h2>Compliance Score: \{score\}/100</h2>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* Basic screenshot display */\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<img\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0src=\{screenshotDataUrl\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0alt=\{`Screenshot of $\{url\}`\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0style=\{\{ maxWidth: '100%', border: '1px solid #ccc' \}\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0/>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* TODO: Add domain overlay if implemented */\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/ResultsHero.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.4.4: Implement ResultsDisplay Structure**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement the main results container, using `ResultsHero` and adding placeholders for the issues list.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/frontend/src/components/ResultsDisplay.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 import React from 'react';
\f1\fs24 \

\f0\fs29\fsmilli14667 import type \{ ScanResult \} from 'shared-types';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ ResultsHero \} from './ResultsHero';
\f1\fs24 \

\f0\fs29\fsmilli14667 // Import RequiredActionItem component (created later)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 interface ResultsDisplayProps \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0result: ScanResult;
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export const ResultsDisplay: React.FC<ResultsDisplayProps> = (\{ result \}) => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// Handle case where result might be processing/failed (though typically called when completed)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (result.status !== 'completed') \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Or render a specific message for failed state if needed
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return <p>Scan status: \{result.status\}</p>;\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<ResultsHero\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0score=\{result.complianceScore\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0screenshotDataUrl=\{result.screenshot\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0url=\{result.url\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0/>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<h3>Required Actions / Issues Found:</h3>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{result.issues.length === 0 ? (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<p>No major compliance issues found!</p>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0) : (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<ul>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\{result.issues.map((issue) => (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<li key=\{issue.id\}>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\{/* Placeholder - Replace with RequiredActionItem component */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<strong>\{issue.title\}</strong> (\{issue.severity\})
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<p>\{issue.description\}</p>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0</li>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0))\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0</ul>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0)\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* Optional: Display summary/jurisdiction info */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{result.summary?.jurisdictionNote && (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<h4>Jurisdiction Note:</h4>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<p>\{result.summary.jurisdictionNote\}</p>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0</div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0)\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/ResultsDisplay.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.4.5: Integrate ResultsDisplay into Landing Page**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Conditionally render the `ResultsDisplay` component in the main application component when a completed result is available.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // Example integration in apps/frontend/src/App.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 // ... imports
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ ResultsDisplay \} from './components/ResultsDisplay';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 function App() \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const \{ result, isLoading, error, submitScan \} = useScanApi();
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* ... ScanForm, LoadingIndicator, ErrorDisplay ... */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{result && !isLoading && !error && result.status === 'completed' && (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<ResultsDisplay result=\{result\} />
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0)\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* Handle failed state explicitly if needed */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{result && result.status === 'failed' && !isLoading && (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<ErrorDisplay message=\{`Scan failed: $\{result.error || 'Unknown reason'\}`\} />
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0)\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // ... export
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/App.tsx (or relevant page component)
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 4.4: Create ResultsDisplay Structure & Hero**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 4.2 (useScanApi hook).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 This sets up the main structure for displaying results. The detailed issue rendering is handled next.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Styling is omitted.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 4.5: Create RequiredActionItem Component**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create a dedicated component (`RequiredActionItem.tsx`) responsible for rendering a single compliance issue found during the scan, including its title, description, severity, and penalty information.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.5.1: Create Component File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the component file.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/frontend/src/components/RequiredActionItem.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/RequiredActionItem.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.5.2: Implement Component Logic**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement the component to display the details of a `ScanIssue`.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/frontend/src/components/RequiredActionItem.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 import React from 'react';
\f1\fs24 \

\f0\fs29\fsmilli14667 import type \{ ScanIssue \} from 'shared-types';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 interface RequiredActionItemProps \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0issue: ScanIssue;
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // Helper to map severity to color/style
\f1\fs24 \

\f0\fs29\fsmilli14667 const getSeverityStyle = (severity: ScanIssue['severity']) => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0switch (severity) \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0case 'high': return \{ color: 'red', fontWeight: 'bold' \};
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0case 'medium': return \{ color: 'orange' \};
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0case 'low': return \{ color: 'gray' \};
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0default: return \{\};
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export const RequiredActionItem: React.FC<RequiredActionItemProps> = (\{ issue \}) => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<li style=\{\{ border: '1px solid #eee', padding: '10px', marginBottom: '10px' \}\}>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<h4 style=\{getSeverityStyle(issue.severity)\}>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\{issue.title\} (\{issue.severity\})
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0</h4>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<p>\{issue.description\}</p>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{issue.legalReference && (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<p><small>Reference: <a href=\{issue.legalReference\} target="_blank" rel="noopener noreferrer">\{issue.legalReference\}</a></small></p>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0)\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{issue.penalty && (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<p><small><em>\{issue.penalty\}</em></small></p>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0)\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</li>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/RequiredActionItem.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 4.5: Create RequiredActionItem Component**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 2.1 (Shared Types).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 This component focuses on presenting a single issue clearly.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Styling is basic and should be refined.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 4.6: Implement Results Rendering**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will update the `ResultsDisplay` component to use the `RequiredActionItem` component created in the previous step to render the list of compliance issues.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.6.1: Update ResultsDisplay Component**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Modify `ResultsDisplay.tsx` to map `result.issues` to `RequiredActionItem` components.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/frontend/src/components/ResultsDisplay.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 import React from 'react';
\f1\fs24 \

\f0\fs29\fsmilli14667 import type \{ ScanResult \} from 'shared-types';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ ResultsHero \} from './ResultsHero';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ RequiredActionItem \} from './RequiredActionItem'; // Import the new component
\f1\fs24 \
\

\f0\fs29\fsmilli14667 interface ResultsDisplayProps \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0result: ScanResult;
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export const ResultsDisplay: React.FC<ResultsDisplayProps> = (\{ result \}) => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (result.status !== 'completed') \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return <p>Scan status: \{result.status\}</p>;\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<ResultsHero\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0score=\{result.complianceScore\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0screenshotDataUrl=\{result.screenshot\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0url=\{result.url\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0/>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<h3>Required Actions / Issues Found:</h3>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{result.issues.length === 0 ? (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<p>No major compliance issues found!</p>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0) : (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<ul style=\{\{ listStyle: 'none', padding: 0 \}\}> \{/* Remove default list styling */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\{result.issues.map((issue) => (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<RequiredActionItem key=\{issue.id\} issue=\{issue\} /> // Use the component
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0))\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0</ul>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0)\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* ... summary/jurisdiction info ... */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/ResultsDisplay.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 4.6: Implement Results Rendering**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 4.4, 4.5.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: None.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 This completes the core results display logic by integrating the individual issue component.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 4.7: Implement ReportSummaryModal**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will create a modal component (`ReportSummaryModal.tsx`) that displays a brief summary of the scan results (e.g., score, number of issues). This modal will be triggered by a "Get Free Report" button/CTA, fulfilling the MVP requirement for this action.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.7.1: Install Modal Library (Optional)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Decide whether to build a simple modal or use a library (e.g., `react-modal`). If using a library:
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F frontend react-modal
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F frontend -D @types/react-modal
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.7.2: Create Modal Component File**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create the component file.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 touch apps/frontend/src/components/ReportSummaryModal.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/ReportSummaryModal.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.7.3: Implement Modal Component**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Implement the modal using the chosen library or basic HTML/CSS.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/frontend/src/components/ReportSummaryModal.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 import React from 'react';
\f1\fs24 \

\f0\fs29\fsmilli14667 import Modal from 'react-modal'; // Assuming react-modal
\f1\fs24 \

\f0\fs29\fsmilli14667 import type \{ ScanResult \} from 'shared-types';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // Set app element for accessibility (usually in your main App.tsx)
\f1\fs24 \

\f0\fs29\fsmilli14667 // Modal.setAppElement('#root');\'a0
\f1\fs24 \
\

\f0\fs29\fsmilli14667 interface ReportSummaryModalProps \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0isOpen: boolean;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0onRequestClose: () => void;
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0result: ScanResult | null;
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 export const ReportSummaryModal: React.FC<ReportSummaryModalProps> = (\{ isOpen, onRequestClose, result \}) => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0if (!result || result.status !== 'completed') \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Don't show modal if no completed result
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0return null;\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<Modal
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0isOpen=\{isOpen\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0onRequestClose=\{onRequestClose\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0contentLabel="Scan Report Summary"
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0// Add styling as needed
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<h2>Scan Summary for \{result.url\}</h2>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<p>Compliance Score: \{result.complianceScore\}/100</p>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<p>Issues Found: \{result.issues.length\}</p>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{result.issues.length > 0 && (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<p>High Severity Issues: \{result.issues.filter(i => i.severity === 'high').length\}</p>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0)\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* Add more summary details if desired */\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<button onClick=\{onRequestClose\}>Close</button>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</Modal>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/ReportSummaryModal.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 4.7.4: Add Trigger Button and State**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Add a button to the `ResultsDisplay` component (or elsewhere) to trigger the modal, and manage the modal's open/close state in the parent component (e.g., `App.tsx`).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // Example integration in apps/frontend/src/App.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 // ... imports
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ ReportSummaryModal \} from './components/ReportSummaryModal';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ useState \} from 'react'; // Add useState
\f1\fs24 \
\

\f0\fs29\fsmilli14667 function App() \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const \{ result, isLoading, error, submitScan \} = useScanApi();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Ensure Modal app element is set
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0React.useEffect(() => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0Modal.setAppElement('#root'); // Or your app's root element ID
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}, []);
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0return (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<div id="root"> \{/* Ensure root element has ID */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* ... ScanForm, LoadingIndicator, ErrorDisplay ... */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{result && !isLoading && !error && result.status === 'completed' && (
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<ResultsDisplay result=\{result\} />
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0<button onClick=\{() => setIsModalOpen(true)\}>Get Free Report Summary</button> \{/* Add trigger */\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0</>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0)\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\{/* ... Failed state handling ... */\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0<ReportSummaryModal\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0isOpen=\{isModalOpen\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0onRequestClose=\{() => setIsModalOpen(false)\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0result=\{result\}\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0/>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0</div>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0);
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // ... export
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/App.tsx (or relevant page component)
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/components/ResultsDisplay.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update) - Optionally move button here
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 4.7: Implement ReportSummaryModal**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 4.4 (ResultsDisplay).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: Setting the modal's app element for accessibility.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 This fulfills the MVP requirement for the "Get Free Report" CTA by showing a summary modal.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Styling for the modal is required.
\f1\fs24 \
\
\
\
\

\f0\fs29\fsmilli14667 ## Task 5: Integration & Testing
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 5.1: End-to-End Frontend-Backend Integration**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will test the complete workflow locally: submitting a URL via the frontend, verifying the backend API receives the request, checking that the scan runs (monitor logs/KV storage), observing the frontend polling for results, and ensuring the final results (or error state) are displayed correctly in the UI.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 5.1.1: Run Backend Locally**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Start the backend Vercel development server.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 # From the monorepo root
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm run -F backend dev
\f1\fs24 \

\f0\fs29\fsmilli14667 # Or: cd apps/backend && vercel dev
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Execution)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 5.1.2: Run Frontend Locally**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Start the frontend development server (assuming Vite).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 # From the monorepo root
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm run -F frontend dev
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Execution)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 5.1.3: Test Scan Submission**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Open the frontend application in a browser (e.g., `http://localhost:5173`), enter a test URL (e.g., a simple personal blog or a known site), and submit the form. Observe:
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Frontend: Loading indicator appears.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Backend logs: Request received, scan initiated, Puppeteer logs (if any).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Vercel KV (if used): `scan:\{scanId\}` key created with `\{ status: 'processing' \}`.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Manual Testing)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 5.1.4: Test Polling and Results Display**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Continue observing:
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Frontend network tab: `GET /api/v1/scans/\{scanId\}` requests are made periodically.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Backend logs: GET requests received, KV lookups performed.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Vercel KV: `scan:\{scanId\}` key updated with `\{ status: 'completed', ... \}` or `\{ status: 'failed', ... \}`.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Frontend: Loading indicator disappears, results (score, screenshot, issues) or error message are displayed.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Manual Testing)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 5.1.5: Test Edge Cases**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Test with:
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Invalid URL format.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 URL that causes Puppeteer to timeout or error.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 URL that returns specific compliance issues (if possible to find/create).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Submitting multiple scans quickly (test concurrency limit if implemented).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Manual Testing)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 5.1: End-to-End Integration**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: All previous implementation steps (Tasks 1-4).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: Running servers, performing tests in browser, checking logs/KV.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Requires local setup of Vercel CLI (`npm i -g vercel`) and potentially logging into Vercel (`vercel login`).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Ensure frontend API requests are correctly proxied to the backend server (Vite config might need `server.proxy` settings if ports differ and Vercel CLI isn't handling it automatically).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 5.2: Implement Basic Unit/Integration Tests**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will add initial automated tests to verify key pieces of functionality. This includes unit tests for pure functions (like `scoreCalculator`) and potentially integration tests for the API hook or backend services, using mocking where appropriate.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 5.2.1: Setup Testing Framework (if needed)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Ensure a testing framework (e.g., Jest, Vitest) is set up for both frontend and backend workspaces.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 # Example using Vitest (install in relevant workspaces)
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F frontend -D vitest @testing-library/react @testing-library/jest-dom jsdom
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F backend -D vitest
\f1\fs24 \

\f0\fs29\fsmilli14667 # Add test scripts to package.json files
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 5.2.2: Write Unit Tests for Score Calculator**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create test file `apps/backend/src/utils/scoreCalculator.test.ts` and write tests for `calculateScore` with various inputs.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/src/utils/scoreCalculator.test.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ describe, it, expect \} from 'vitest';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ calculateScore \} from './scoreCalculator';
\f1\fs24 \

\f0\fs29\fsmilli14667 import \{ AxeResults \} from 'axe-core';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // Mock data examples
\f1\fs24 \

\f0\fs29\fsmilli14667 const mockAxeResultsEmpty: AxeResults = \{ violations: [], passes: [], incomplete: [], inapplicable: [], timestamp: '', url: '', toolOptions: \{\} \};
\f1\fs24 \

\f0\fs29\fsmilli14667 const mockAxeResultsSomeViolations: AxeResults = \{\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0violations: [
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\{ id: 'v1', impact: 'critical', /* ... */ \},
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\{ id: 'v2', impact: 'moderate', /* ... */ \}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0],\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0// ... other fields
\f1\fs24 \

\f0\fs29\fsmilli14667 \};
\f1\fs24 \
\

\f0\fs29\fsmilli14667 describe('calculateScore', () => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0it('should return 100 for perfect input', () => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const score = calculateScore(\{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0axeResults: mockAxeResultsEmpty,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0hasPrivacyPolicy: true,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0barMention: 'Some Bar', // Assuming presence is neutral or good
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0canSpamResult: \{ hasContactInfo: true, hasUnsubscribeInfo: true \}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0expect(score).toBe(100);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\});
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0it('should deduct points for missing privacy policy', () => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const score = calculateScore(\{ /* ... perfect input but hasPrivacyPolicy: false ... */ \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0expect(score).toBeLessThan(100);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// expect(score).toBe(100 - PRIVACY_POLICY_WEIGHT); // Check exact deduction
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\});
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0it('should deduct points for axe violations', () => \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0const score = calculateScore(\{ axeResults: mockAxeResultsSomeViolations, /* ... other fields true ... */ \});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0expect(score).toBeLessThan(100);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// expect(score).toBe(100 - AXE_VIOLATION_WEIGHT_CRITICAL - AXE_VIOLATION_WEIGHT_MODERATE);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\});
\f1\fs24 \
\

\f0\fs29\fsmilli14667 \'a0\'a0// Add more tests for CAN-SPAM, combinations, score floor (0)
\f1\fs24 \

\f0\fs29\fsmilli14667 \});
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/src/utils/scoreCalculator.test.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 5.2.3: Write Tests for Frontend Hook (useScanApi)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create test file `apps/frontend/src/hooks/useScanApi.test.tsx`. Use mocking (`msw` or Jest/Vitest mocks) to simulate API responses and test the hook's state transitions, polling logic, and error handling.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 *Instruction:* This is more complex and involves setting up API mocking. Refer to Vitest/Jest and `@testing-library/react` documentation for mocking `fetch` and testing hooks.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/hooks/useScanApi.test.tsx
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 5.2.4: Run Tests**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Execute the test scripts.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 # From the monorepo root
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm run -r test
\f1\fs24 \

\f0\fs29\fsmilli14667 # Or run in individual workspaces
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Execution)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 5.2: Implement Basic Tests**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Relevant implementation steps (e.g., Step 3.5 for score calculator tests).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: Setting up mocking for hook tests.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Focus on testing critical logic paths for MVP. Comprehensive testing can be expanded later.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Testing Puppeteer/scanner logic itself is harder (integration/e2e tests) and likely out of scope for MVP *unit* tests.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 5.3: Add Analytics (Posthog)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will integrate the PostHog analytics library into the frontend application to track key user events, such as initiating a scan, viewing results, and encountering errors.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 5.3.1: Install PostHog Library**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Install the `posthog-js` library in the frontend workspace.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 pnpm add -F frontend posthog-js
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/package.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 5.3.2: Initialize PostHog**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Initialize PostHog in the main application entry point (e.g., `main.tsx` or `App.tsx`) using the project API key and instance address obtained from PostHog.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 *Instruction to User:* Sign up for PostHog (cloud or self-hosted) and obtain your Project API Key and Host URL. Store these securely, potentially using environment variables (e.g., `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/frontend/src/main.tsx (or App.tsx)
\f1\fs24 \

\f0\fs29\fsmilli14667 import React from 'react';
\f1\fs24 \

\f0\fs29\fsmilli14667 import ReactDOM from 'react-dom/client';
\f1\fs24 \

\f0\fs29\fsmilli14667 import App from './App';
\f1\fs24 \

\f0\fs29\fsmilli14667 import posthog from 'posthog-js';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // Check if in browser environment before initializing
\f1\fs24 \

\f0\fs29\fsmilli14667 if (typeof window !== 'undefined') \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0posthog.init(import.meta.env.VITE_POSTHOG_KEY, \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0// Enable autocapture or configure manually
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0capture_pageview: true, // Capture page views automatically
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0capture_pageleave: true // Capture page leave events
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\});
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ReactDOM.createRoot(document.getElementById('root')!).render(
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0<React.StrictMode>
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0<App />
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0</React.StrictMode>,
\f1\fs24 \

\f0\fs29\fsmilli14667 );
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/main.tsx (or equivalent entry point)
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/.env
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create/Update) - Add VITE_POSTHOG_KEY, VITE_POSTHOG_HOST
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 5.3.3: Implement Event Tracking**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Add `posthog.capture()` calls within the `useScanApi` hook or relevant components to track specific events.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```typescript
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/frontend/src/hooks/useScanApi.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 // ... imports
\f1\fs24 \

\f0\fs29\fsmilli14667 import posthog from 'posthog-js';
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // ... inside submitScan function, after successful submission:
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0setScanId(data.scanId);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0posthog.capture('scan_initiated', \{ url: url, scan_id: data.scanId \});
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // ... inside fetchResult function, after getting completed result:
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0if (data.status === 'completed') \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0setResult(data);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0setError(null);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0stopPolling();
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0setIsLoading(false);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0posthog.capture('scan_completed', \{\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0scan_id: currentScanId,\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0url: data.url,\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0score: data.complianceScore,
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0issue_count: data.issues.length
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0\});
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\}
\f1\fs24 \
\

\f0\fs29\fsmilli14667 // ... inside fetchResult or submitScan, on error:
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0setError(errorMessage);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0setIsLoading(false);
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0posthog.capture('scan_error', \{\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0scan_id: currentScanId || null, // Include scanId if available
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0url: url || null, // Include url if available (from submitScan)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\'a0\'a0error_message: errorMessage\'a0
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0\});
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/frontend/src/hooks/useScanApi.ts
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Update)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 5.3: Add Analytics (Posthog)**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 4.2 (useScanApi hook).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: Setting up PostHog account/instance and environment variables.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Ensure environment variables are correctly configured for Vercel deployment (add them in Vercel project settings).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Choose meaningful event names and properties to track.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ## Task 6: Deployment
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 6.1: Configure Vercel Deployment**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will configure the Vercel project settings (either via the Vercel dashboard or `vercel.json` files) to correctly build and deploy both the frontend React application and the backend Node.js serverless functions from the monorepo structure.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 6.1.1: Configure Root Vercel Settings**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 In the Vercel project settings (dashboard):
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Set the Framework Preset: Turborepo (or None if configuring manually).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Set the Root Directory: `.` (repository root).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Ensure Build Command is appropriate (e.g., `turbo run build` or leave empty if handled by workspaces).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Ensure Ignored Build Step uses Turborepo remote caching if desired (`npx turbo-ignore --fallback=HEAD^1`).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Manual Configuration - Vercel Dashboard)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 6.1.2: Configure Backend Function Settings**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Create/Update `apps/backend/vercel.json` if needed to specify Node.js version or function memory/duration (requires Pro plan for >1GB/10s).
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```json
\f1\fs24 \

\f0\fs29\fsmilli14667 // apps/backend/vercel.json (Example - Optional)
\f1\fs24 \

\f0\fs29\fsmilli14667 \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0"functions": \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0"api/**/*.ts": \{
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0"memory": 1024, // MB
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\'a0\'a0"maxDuration": 60 // seconds (Requires Pro plan)
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \'a0\'a0\}
\f1\fs24 \

\f0\fs29\fsmilli14667 \}
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 /legal-compliance-checker/apps/backend/vercel.json
\f1\fs24 \

\f0\fs29\fsmilli14667 Operation being done (Create/Update - Optional)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 6.1.3: Configure Frontend Build Settings**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Ensure the frontend build command and output directory are correctly set in Vercel project settings (usually auto-detected for React/Vite, but verify).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Build Command: `pnpm run -F frontend build` (or similar)
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Output Directory: `apps/frontend/dist` (or similar)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Manual Configuration - Vercel Dashboard)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 6.1.4: Configure Environment Variables**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Add necessary environment variables to the Vercel project settings (Production, Preview, Development scopes):
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` (if using Vercel KV)
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST` (ensure `VITE_` prefix for frontend exposure)
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Any other required keys.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Manual Configuration - Vercel Dashboard)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 6.1: Configure Vercel Deployment**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: All previous implementation.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: Significant configuration within the Vercel dashboard.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Requires the user to have linked their Git repository (GitHub, GitLab, Bitbucket) to the Vercel project.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Refer to Vercel documentation for Monorepos and specific framework settings.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 6.2: Deploy to Vercel Preview**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 We will trigger a deployment to Vercel's preview environment by pushing the code changes to a Git branch connected to the Vercel project. This allows testing in a production-like environment before merging to main/production.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 6.2.1: Commit and Push Code**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Commit all code changes to a new Git branch.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ```bash
\f1\fs24 \

\f0\fs29\fsmilli14667 git checkout -b feature/mvp-implementation
\f1\fs24 \

\f0\fs29\fsmilli14667 git add .
\f1\fs24 \

\f0\fs29\fsmilli14667 git commit -m "feat: Implement MVP features and backend API"
\f1\fs24 \

\f0\fs29\fsmilli14667 git push origin feature/mvp-implementation
\f1\fs24 \

\f0\fs29\fsmilli14667 ```
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Git commands)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 6.2.2: Monitor Vercel Deployment**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Observe the Vercel dashboard for the new preview deployment triggered by the push. Monitor the build logs for both frontend and backend.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Manual Observation - Vercel Dashboard)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 6.2: Deploy to Vercel Preview**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 6.1.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: Pushing code, monitoring Vercel.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Assumes Git repository is properly linked to Vercel.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Deployment failures will require debugging build logs in Vercel.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 #### **Step 6.3: Test Preview Deployment**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Detailed technical explanation of what we\'92re accomplishing in this step**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Once the preview deployment is successful, we will perform basic end-to-end tests on the generated preview URL to ensure the core functionality works in the deployed environment.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Task Breakdown**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 6.3.1: Access Preview URL**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Open the preview URL provided by Vercel in a browser.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Manual Testing)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **SubTask 6.3.2: Perform Test Scan**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Submit a test URL using the deployed frontend. Verify:
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Scan initiates and completes.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Results are displayed correctly.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Loading and error states work.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Modal summary appears.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Check browser console for errors.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Check Vercel function logs (Runtime logs) for backend errors.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Check PostHog (if configured) to see if events are captured.
\f1\fs24 \
\

\f0\fs29\fsmilli14667 Operation being done (Manual Testing)
\f1\fs24 \
\

\f0\fs29\fsmilli14667 ###### **Other Notes On Step 6.3: Test Preview Deployment**
\f1\fs24 \
\

\f0\fs29\fsmilli14667 * \'a0 Blocked by: Step 6.2.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 Manual tasks: Performing tests on the preview URL.
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 This is a crucial step to catch environment-specific issues (e.g., environment variable problems, Puppeteer issues in the Vercel environment).
\f1\fs24 \

\f0\fs29\fsmilli14667 * \'a0 If tests pass, the branch can be reviewed and merged, triggering a production deployment (if configured).
\f1\fs24 \
\
\
}