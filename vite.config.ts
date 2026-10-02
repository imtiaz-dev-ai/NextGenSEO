import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isProduction = mode === 'production';
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
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
              // Keep the framework in one cacheable chunk, and let each lazily
              // imported component become its own tiny on-demand chunk.
              if (id.includes('node_modules')) {
                if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'react-core';
                if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router/')) return 'router';
                if (id.includes('node_modules/@google')) return 'google-ai';
                if (id.includes('node_modules/react-icons')) return 'icons';
                // Everything else from node_modules -> one shared vendor chunk.
                return 'vendor';
              }
              // Above-the-fold components must be in the initial payload.
              if (id.includes('components/Hero') || id.includes('components/Navbar')) return 'critical';
              // Admin is rarely visited — keep it isolated.
              if (id.includes('components/Admin')) return 'admin';
            },
          },
        },
        sourcemap: false,
        chunkSizeWarningLimit: 500,
        reportCompressedSize: false,
        cssCodeSplit: true,
        assetsInlineLimit: 8192,
        target: 'es2020',
        cssMinify: true,
      },
      plugins: [
        react(),
        compression({ algorithm: 'gzip', exclude: [/\.(png|jpg|jpeg|webp|gif|svg|ico)$/] }),
        compression({ algorithm: 'brotliCompress', exclude: [/\.(png|jpg|jpeg|webp|gif|svg|ico)$/] }),
        // Inject <link rel="preload"> for the entry chunks that the browser
        // would otherwise only discover after the entry JS has executed.
        isProduction && {
          name: 'preload-entry-chunks',
          enforce: 'post' as const,
          generateBundle(_options: unknown, bundle: Record<string, any>) {
            const entry = Object.values(bundle).find(
              (c: any) => c.type === 'chunk' && c.isEntry && c.name === 'index',
            ) as any;
            if (!entry) return;

            const cssFile = Object.keys(bundle).find(
              (f) => f.startsWith(entry.fileName.replace(/\.js$/, '')) && f.endsWith('.css'),
            );

            const tags = entry.imports
              .map((imp: string) => `<link rel="preload" as="script" href="/${imp}" crossorigin>`)
              .concat([`<link rel="preload" as="script" href="/${entry.fileName}" crossorigin>`])
              .concat(cssFile ? [`<link rel="preload" as="style" href="/${cssFile}" crossorigin>`] : [])
              .join('');

            // Inject inside <head> — appending after </html> is invalid markup.
            const html = String(bundle['index.html'].source);
            if (html.includes('</head>')) {
              bundle['index.html'].source = html.replace('</head>', `${tags}</head>`);
            } else {
              bundle['index.html'].source = `${html}${tags}`;
            }
          },
        },
      ].filter(Boolean),
    };
});
