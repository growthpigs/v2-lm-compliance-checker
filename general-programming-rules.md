{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 General Programming Guidelines for AI Assistance\
These rules guide AI code generation and modification to promote code quality, consistency, and maintainability across projects.\
\
Core Principles:\
\
Clarity and Simplicity:\
\
Prefer simple, clear, and idiomatic solutions using the project's established tech stack.\
\
Write readable code. Add comments primarily for complex logic, non-obvious decisions, or // TODO markers.\
\
Iterate Before Replacing:\
\
When modifying existing code, attempt to iterate on current patterns first.\
\
Only introduce significantly new patterns, libraries, or architectural changes if the existing approach is clearly insufficient and after explicit confirmation. If a pattern is replaced, ensure the old implementation is cleanly removed.\
\
Focus and Precision:\
\
Only make changes directly related to the requested task. Do not refactor or modify unrelated code without specific instruction.\
\
Be precise about file paths, function names, and variable names when making changes.\
\
Development Workflow & Code Quality:\
\
Modularity and Componentization (for UI projects):\
\
Break down features into small, reusable, and well-defined components or functions.\
\
Place new files in logical directories according to project structure conventions (e.g., components/, lib/, utils/, features/).\
\
Define clear interfaces/types for function arguments, component props, and return values (especially in TypeScript projects).\
\
Keep files concise (e.g., aim for under ~300 lines for components/modules). Refactor larger files into smaller, focused units.\
\
Code Duplication (DRY - Don't Repeat Yourself):\
\
Actively avoid duplicating code. Before writing new logic, check if similar functionality exists elsewhere that can be reused or abstracted into a shared function or component.\
\
Error Handling:\
\
Implement appropriate error handling for potential runtime issues (e.g., try/catch for async operations, checking API responses, handling invalid inputs, using error boundaries in UI frameworks).\
\
API Interaction:\
\
Use defined API client functions or data-fetching hooks where available.\
\
Handle API loading and error states gracefully in the UI (e.g., showing loading indicators, user-friendly error messages).\
\
Data Handling:\
\
No Mock Data (Dev/Prod): Do not add mock data, stubs, or fake data patterns directly into code used in development or production builds. Use actual data sources (APIs, props, state). Mock data should typically only be used within test files or Storybook-like environments.\
\
Null/Undefined Checks: Always perform necessary checks for potentially null or undefined data (especially data fetched asynchronously or optional inputs) before attempting to access its properties or use it in logic.\
\
State Management (for UI projects):\
\
Use standard framework mechanisms for local component state (e.g., React useState).\
\
For shared state, prefer established patterns like React Context API, or common state management libraries (e.g., Zustand, Redux, Pinia) if already integrated into the project.\
\
Environment & Configuration:\
\
Environment Variables: Never hardcode sensitive keys or environment-specific configurations. Use environment variables (process.env or framework-specific methods) accessed via configuration files or services. Do not modify .env files without explicit instruction.\
\
Configuration Files: Do not modify core configuration files (e.g., next.config.js, vite.config.js, tailwind.config.js, tsconfig.json, package.json) unless specifically instructed as part of the task.\
\
Testing (Guidance for AI):\
\
Test Generation: When requested, generate test file structures (e.g., using common frameworks like Jest, Vitest, Cypress, Playwright, and libraries like React Testing Library). Focus on setting up the test structure, mocking imports/dependencies, and writing basic test cases for the core functionality being implemented. Do not write overly complex or exhaustive test suites unless specifically asked.}