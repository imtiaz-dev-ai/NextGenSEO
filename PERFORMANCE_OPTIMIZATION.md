// PERFORMANCE OPTIMIZATION GUIDE
// Lighthouse Score: 30 → Target: 90+

// ============================================
// 1. CRITICAL: Remove Unused JavaScript (2,934 KiB)
// ============================================

// ISSUE: react-icons library is 500+ KiB
// FIX: Replace with inline SVGs or use a smaller icon library

// BEFORE (Bad):
import { HiOutlinePencilSquare } from 'react-icons/hi2';

// AFTER (Good):
const PencilIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

// ============================================
// 2. CRITICAL: Reduce Unused CSS (98 KiB)
// ============================================

// ISSUE: Tailwind generating unused classes
// FIX: Add content paths to tailwind.config.js

// tailwind.config.js:
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // Remove unused colors/utilities
  safelist: [],
  theme: {
    extend: {},
  },
};

// ============================================
// 3. CRITICAL: Optimize Images (2,117 KiB savings)
// ============================================

// ISSUE: Large unoptimized images
// FIX: Use next-gen formats and responsive images

// BEFORE:
<img src="/pics/New folder/Tayyab.png" alt="Tayyab" />

// AFTER:
<img 
  src="/pics/New folder/Tayyab.webp" 
  alt="Tayyab Mehmood - Founder and CEO"
  width="400"
  height="400"
  loading="lazy"
  decoding="async"
  className="w-full h-auto"
/>

// ============================================
// 4. CRITICAL: Reduce JavaScript Execution (12.1s)
// ============================================

// ISSUE: Heavy components loaded on initial page load
// FIX: Implement code splitting and lazy loading

// BEFORE:
import Testimonials from './components/Testimonials';
import CaseStudies from './components/CaseStudies';

// AFTER:
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const CaseStudies = React.lazy(() => import('./components/CaseStudies'));

// Wrap in Suspense:
<Suspense fallback={<div>Loading...</div>}>
  <Testimonials />
</Suspense>

// ============================================
// 5. CRITICAL: Defer Non-Critical JavaScript
// ============================================

// ISSUE: LiveChat and FloatingActionButton loaded immediately
// FIX: Load after page interactive

// Create a deferred loader:
const DeferredComponent = ({ component: Component }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => setIsVisible(true));
    } else {
      setTimeout(() => setIsVisible(true), 3000);
    }
  }, []);

  return isVisible ? <Component /> : null;
};

// Usage:
<DeferredComponent component={LiveChat} />
<DeferredComponent component={FloatingActionButton} />

// ============================================
// 6. OPTIMIZE: Minify JavaScript
// ============================================

// vite.config.ts already has terser configured
// Verify it's working:
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
    },
    mangle: true,
  },
}

// ============================================
// 7. OPTIMIZE: Enable Gzip Compression
// ============================================

// Add to vercel.json:
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Encoding",
          "value": "gzip"
        }
      ]
    }
  ]
}

// ============================================
// 8. OPTIMIZE: Cache Strategy
// ============================================

// Add cache headers to vercel.json:
{
  "headers": [
    {
      "source": "/dist/**",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}

// ============================================
// 9. OPTIMIZE: Remove Render-Blocking Resources
// ============================================

// ISSUE: CSS/JS blocking initial render
// FIX: Inline critical CSS, defer non-critical

// index.html:
<head>
  <!-- Critical CSS inline -->
  <style>
    /* Only critical above-the-fold styles */
  </style>
  <!-- Defer non-critical CSS -->
  <link rel="preload" href="/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
</head>

// ============================================
// 10. OPTIMIZE: Preload Critical Resources
// ============================================

// index.html:
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="dns-prefetch" href="https://mail.google.com">
  
  <!-- Preload critical images -->
  <link rel="preload" as="image" href="/pics/logo.png">
</head>

// ============================================
// IMPLEMENTATION CHECKLIST
// ============================================

// [ ] Replace react-icons with inline SVGs (saves 500+ KiB)
// [ ] Lazy load all route components with Suspense
// [ ] Defer LiveChat and FloatingActionButton
// [ ] Optimize all images to WebP format
// [ ] Add loading="lazy" to all images
// [ ] Minify CSS/JS in build
// [ ] Enable Gzip compression on Vercel
// [ ] Add cache headers for static assets
// [ ] Inline critical CSS
// [ ] Preload critical resources
// [ ] Remove unused Tailwind classes
// [ ] Split vendor chunks in Vite
// [ ] Monitor bundle size with vite-plugin-visualizer

// ============================================
// EXPECTED RESULTS
// ============================================

// Current: Performance 30, LCP 7.4s, TBT 5,660ms
// Target:  Performance 90+, LCP <2.5s, TBT <300ms

// Estimated improvements:
// - Remove react-icons: -500 KiB (saves 2-3s)
// - Lazy load components: -1,500 KiB (saves 3-4s)
// - Image optimization: -2,117 KiB (saves 2-3s)
// - Defer non-critical JS: -1s TBT
// - Total: ~8-10s improvement in LCP
