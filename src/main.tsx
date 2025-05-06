// Very early debugging logs
console.log("[DEBUG INIT] main.tsx script starting execution");
try {
  console.log("[DEBUG INIT] Document ready state:", document.readyState);
  console.log("[DEBUG INIT] Root element exists:", !!document.getElementById('root'));
} catch (e) {
  console.error("[DEBUG INIT] Error in early logging:", e);
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Need to handle imports differently - can't use top-level await here
console.log("[DEBUG] main.tsx - About to import App using various methods")

// Immediately-invoked async function to use await inside
;(async () => {
  try {
    // Method 1: Dynamic import with default export
    console.log("[DEBUG] main.tsx - Trying default import method");
    const AppModule = await import('./App');
    console.log("[DEBUG] main.tsx - Import result:", AppModule);
    
    const AppComponent = AppModule.default || AppModule.App;
    console.log("[DEBUG] main.tsx - App component obtained:", typeof AppComponent);
    
    if (!AppComponent) {
      throw new Error("Could not find App component in imports");
    }
    
    const rootElement = document.getElementById('root');
    console.log("[DEBUG] main.tsx - Root element found:", !!rootElement);
    
    if (rootElement) {
      const root = ReactDOM.createRoot(rootElement);
      console.log("[DEBUG] main.tsx - Root created, about to render");
      
      // Hide fallback content when React mounts successfully
      const hideFallbackContent = () => {
        console.log("[DEBUG] main.tsx - Attempting to hide fallback content");
        const fallbackElement = document.querySelector('.fallback-content');
        if (fallbackElement) {
          console.log("[DEBUG] main.tsx - Fallback content found, hiding it");
          fallbackElement.style.display = 'none';
        } else {
          console.log("[DEBUG] main.tsx - No fallback content found to hide");
        }
      };
      
      root.render(
        <React.StrictMode>
          <AppComponent />
        </React.StrictMode>,
      );
      console.log("[DEBUG] main.tsx - Render called");
      
      // Hide fallback content after render
      hideFallbackContent();
      
      // Also attempt to hide after a short delay to ensure it happens after hydration
      setTimeout(hideFallbackContent, 100);
    } else {
      console.error("[DEBUG] main.tsx - Root element not found!");
    }
  } catch (error) {
    console.error("[DEBUG] main.tsx - Error during import/render:", error);
    
    document.body.innerHTML += `
      <div style="color: red; background: #ffeeee; padding: 15px; margin: 15px; border: 1px solid red;">
        <h3>Application Error</h3>
        <p>${error instanceof Error ? error.message : String(error)}</p>
        <pre>${error instanceof Error ? error.stack : 'No stack trace available'}</pre>
      </div>
    `;
  }
})();

console.log("[DEBUG] main.tsx - Setup complete") 