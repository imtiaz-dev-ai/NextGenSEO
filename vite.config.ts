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
        alias: {}
      },
      build: {
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: isProduction,
            drop_debugger: isProduction,
            passes: 3,
            pure_funcs: isProduction ? ['console.log', 'console.info', 'console.warn', 'console.debug'] : [],
            dead_code: true,
            unused: true,
          },
          mangle: true,
          output: { comments: false },
        },
        rollupOptions: {
          output: {
            manualChunks(id) {
              // React core — smallest possible critical chunk
              if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'react-core';
              if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router/')) return 'router';
              // Firebase — separate heavy chunk, loaded lazily
              if (id.includes('node_modules/firebase/firestore') || id.includes('@firebase/firestore')) return 'firebase-firestore';
              if (id.includes('node_modules/firebase/auth') || id.includes('@firebase/auth')) return 'firebase-auth';
              if (id.includes('node_modules/firebase/storage') || id.includes('@firebase/storage')) return 'firebase-storage';
              if (id.includes('node_modules/firebase') || id.includes('@firebase')) return 'firebase-core';
              // Google AI — separate, very heavy
              if (id.includes('node_modules/@google')) return 'google-ai';
              // Icons
              if (id.includes('node_modules/react-icons')) return 'icons';
              // Admin — rarely visited
              if (id.includes('components/Admin')) return 'admin';
              // Blog — separate
              if (id.includes('components/Blog')) return 'blog';
              // Above-fold critical
              if (id.includes('components/Hero') || id.includes('components/Navbar') || id.includes('components/AnimatedStats')) return 'critical';
              // Heavy effects — deferred
              if (id.includes('components/Particle') || id.includes('components/Scroll') || id.includes('components/Floating')) return 'ui-effects';
              // Social proof
              if (id.includes('components/Testimonials') || id.includes('components/CaseStudies') || id.includes('components/Team')) return 'social-proof';
              // Secondary
              if (id.includes('components/Pricing') || id.includes('components/FAQ') || id.includes('components/Newsletter')) return 'secondary';
            },
          },
        },
        sourcemap: false,
        chunkSizeWarningLimit: 500,
        reportCompressedSize: false,
        cssCodeSplit: true,
        assetsInlineLimit: 8192, // inline small assets as base64
        target: 'es2020',
        cssMinify: true,
      },
    };
});
