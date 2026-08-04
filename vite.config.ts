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
            passes: 2,
            pure_funcs: isProduction ? ['console.log', 'console.info', 'console.warn'] : [],
          },
          mangle: true,
          output: { comments: false },
        },
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) return 'vendor';
              if (id.includes('node_modules/firebase')) return 'firebase';
              if (id.includes('node_modules/react-icons')) return 'icons';
              if (id.includes('components/Admin')) return 'admin';
              if (id.includes('components/Blog')) return 'blog';
              if (id.includes('components/Testimonials') || id.includes('components/CaseStudies') || id.includes('components/Team')) return 'social-proof';
              if (id.includes('components/Pricing') || id.includes('components/FAQ') || id.includes('components/Newsletter')) return 'secondary';
            },
          },
        },
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
        reportCompressedSize: false,
        cssCodeSplit: true,
        assetsInlineLimit: 4096,
        target: 'es2020',
        cssMinify: true,
      },
    };
});
