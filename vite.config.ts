import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Log configuration loading
console.log("[DEBUG] vite.config.ts - Loading configuration");

// Helper to determine API URL based on environment
const getApiUrl = () => {
  if (process.env.VITE_API_URL) {
    return process.env.VITE_API_URL;
  }
  return 'http://localhost:3000'; // Default to local development API
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Force React refresh to be enabled
      fastRefresh: true,
      // Add babel options if needed
      babel: {
        babelrc: false,
        configFile: false,
        plugins: []
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Explicitly include TypeScript extensions
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    // Make sure module resolution is configured correctly
    mainFields: ['browser', 'module', 'main'],
  },
  // Make sure TypeScript is properly handled
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  server: {
    port: 3190, // Updated port based on logs
    host: true,
    strictPort: false,
    proxy: {
      '/api': {
        target: getApiUrl(),
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
      },
    },
  },
  build: {
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Use minimal bundling
    minify: 'esbuild',
    // Clean up output directory
    emptyOutDir: true,
    // Disable code splitting for simpler output
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}); 