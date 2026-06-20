import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isProduction = mode === 'production';
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        __DEV__: !isProduction,
        'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'https://api.nextgenseo.com'),
        'process.env.VITE_CONTACT_EMAIL': JSON.stringify(env.VITE_CONTACT_EMAIL || 'tayyab@nextgenseo.pro'),
        'process.env.VITE_ENABLE_ANALYTICS': JSON.stringify(env.VITE_ENABLE_ANALYTICS || 'true'),
        'process.env.VITE_ENABLE_LOGGING': JSON.stringify(env.VITE_ENABLE_LOGGING || 'false'),
        'process.env.VITE_ENABLE_ADMIN_PANEL': JSON.stringify(env.VITE_ENABLE_ADMIN_PANEL || 'true'),
        'process.env.VITE_ENABLE_BACKLINKS': JSON.stringify(env.VITE_ENABLE_BACKLINKS || 'true'),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: isProduction,
            drop_debugger: isProduction,
          },
          mangle: true,
          output: {
            comments: false,
          },
        },
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor': ['react', 'react-dom'],
              'icons': ['react-icons'],
            },
          },
        },
        sourcemap: !isProduction,
        chunkSizeWarningLimit: 1000,
        reportCompressedSize: false,
      },
    };
});
