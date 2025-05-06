import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('[SIMPLIFIED] Entry point script starting');

// Very basic component that doesn't import anything else
const SimpleApp = () => {
  const [count, setCount] = React.useState(0);
  
  React.useEffect(() => {
    console.log('[SIMPLIFIED] Component mounted');
    document.querySelector('.fallback-content')?.classList.add('hidden');
  }, []);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333' }}>Simple React App</h1>
      <p>This is a simplified React app to test basic rendering.</p>
      
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <p>Counter: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ padding: '8px 15px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Increment
        </button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '5px' }}>
        <p>This component renders without using:</p>
        <ul>
          <li>Router</li>
          <li>Custom hooks</li>
          <li>External components</li>
        </ul>
      </div>
    </div>
  );
};

// Wrap rendering in try/catch with detailed error reporting
try {
  const rootElement = document.getElementById('root');
  console.log('[SIMPLIFIED] Root element found:', !!rootElement);
  
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    console.log('[SIMPLIFIED] About to render simple app');
    
    root.render(
      <React.StrictMode>
        <SimpleApp />
      </React.StrictMode>
    );
    
    console.log('[SIMPLIFIED] Render complete');
  } else {
    console.error('[SIMPLIFIED] Root element not found in DOM!');
    document.body.innerHTML += `
      <div style="color: red; background: #ffeeee; padding: 15px; margin: 15px; border: 1px solid red;">
        Error: Could not find root element to mount React application.
      </div>
    `;
  }
} catch (error) {
  console.error('[SIMPLIFIED] Fatal error during render:', error);
  
  // Display error on page
  document.body.innerHTML += `
    <div style="color: red; background: #ffeeee; padding: 15px; margin: 15px; border: 1px solid red;">
      <h3>React Render Error</h3>
      <p>${error instanceof Error ? error.message : String(error)}</p>
      <pre>${error instanceof Error ? error.stack : 'No stack trace available'}</pre>
    </div>
  `;
} 