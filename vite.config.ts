import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
          output: {
            manualChunks: {
              // Core React libraries
              vendor: ['react', 'react-dom'],
              
              // UI Components - split into smaller chunks
              'ui-base': [
                '@radix-ui/react-dialog', 
                '@radix-ui/react-select', 
                '@radix-ui/react-dropdown-menu',
                '@radix-ui/react-popover',
                '@radix-ui/react-tooltip'
              ],
              'ui-forms': [
                '@radix-ui/react-checkbox',
                '@radix-ui/react-radio-group',
                '@radix-ui/react-switch',
                '@radix-ui/react-slider',
                'react-hook-form',
                '@hookform/resolvers'
              ],
              'ui-navigation': [
                '@radix-ui/react-navigation-menu',
                '@radix-ui/react-tabs',
                '@radix-ui/react-accordion',
                'react-router-dom'
              ],
              
              // Performance and optimization
              'performance': [
                'react-error-boundary',
                '@tanstack/react-virtual'
              ],
              
              // Pages - separate chunks for better loading
              'page-orders': [],
              'page-products': [],
              'page-sales': [],
              'page-dashboard': [],
              
              // Charts and visualization
              charts: ['recharts'],
              
              // Utilities and helpers
              utils: ['date-fns', 'clsx', 'tailwind-merge', 'class-variance-authority'],
              
              // Query and state management
              query: ['@tanstack/react-query'],
              
              // PDF and document generation
              pdf: ['jspdf', 'html2canvas'],
              
              // Icons
              icons: ['lucide-react'],
              
              // Animation and motion
              motion: ['framer-motion']
            },
            // Optimize chunk loading
            chunkFileNames: (chunkInfo) => {
              if (chunkInfo.name?.startsWith('page-')) {
                return 'pages/[name]-[hash].js';
              }
              return 'chunks/[name]-[hash].js';
            }
          }
    }
  }
}));
