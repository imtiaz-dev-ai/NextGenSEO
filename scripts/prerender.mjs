/**
 * prerender.mjs — Complete static prerender for all routes + blog posts
 * Runs after `vite build`. Creates dist/{route}/index.html for every URL
 * so Googlebot sees unique title, description, canonical WITHOUT needing JS.
 * Also fetches live blog posts from Supabase at build time.
 */

import fs from 'fs';
import path from 'path';

const DIST = path.resolve('dist');
const base = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

// ─── Load env vars from .env.local ───────────────────────────────────────────
function loadEnv() {
  const envPath = path.resolve('.env.local');
  if (!fs.existsSync(envPath)) return {};
  const env = {};
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim();
  });
  return env;
}

const localEnv = loadEnv();
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || localEnv['VITE_SUPABASE_URL'] || 'https://bckkbkodjpotcjkfedds.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || localEnv['VITE_SUPABASE_ANON_KEY'] || '';

// ─── Fetch blog posts from Supabase at build time ────────────────────────────
async function fetchSupabaseBlogPosts() {
  if (!SUPABASE_KEY) {
    console.log('⚠ VITE_SUPABASE_ANON_KEY not set — skipping Supabase blog fetch.');
    return [];
  }
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/app_records?collection_name=eq.blogPosts&select=id,data&order=created_at.desc`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res.ok) {
      console.log(`⚠ Supabase fetch failed: ${res.status}`);
      return [];
    }
    const rows = await res.json();
    return rows.map(row => ({ ...row.data, id: row.id }));
  } catch (e) {
    console.log(`⚠ Supabase fetch error: ${e.message}`);
    return [];
  }
}

function toSlug(title) {
  return (title || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'post';
}

// ─── All static routes ────────────────────────────────────────────────────────
const routes = [
  {
    path: 'about',
    title: 'About Us | NextGen SEO Agency - Tayyab Mehmood',
    description: 'Learn about NextGen SEO Agency founded by Tayyab Mehmood. 10+ years of SEO expertise, 200+ happy clients, proven results.',
    canonical: 'https://nextgenseo.pro/about',
    schema: null,
  },
  {
    path: 'team',
    title: 'Our Team | SEO Experts | NextGen SEO Agency',
    description: 'Meet the NextGen SEO expert team — link builders, SEO specialists, content strategists, and technical SEO experts.',
    canonical: 'https://nextgenseo.pro/team',
    schema: null,
  },
  {
    path: 'blog',
    title: 'Blog | SEO Insights & Strategies | NextGen SEO',
    description: 'Expert SEO insights, link building strategies, and digital marketing tips from the NextGen SEO team.',
    canonical: 'https://nextgenseo.pro/blog',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "NextGen SEO Blog",
      "url": "https://nextgenseo.pro/blog",
      "description": "Expert SEO insights, link building strategies, and digital marketing tips.",
      "publisher": { "@type": "Organization", "name": "NextGen SEO Agency", "url": "https://nextgenseo.pro" }
    }),
  },
  {
    path: 'contact',
    title: 'Contact Us | Get Free SEO Audit | NextGen SEO',
    description: 'Contact NextGen SEO Agency for a free SEO audit. Get expert SEO consultation from Tayyab Mehmood. Reply within 24 hours.',
    canonical: 'https://nextgenseo.pro/contact',
    schema: null,
  },
  {
    path: 'pricing',
    title: 'SEO Pricing Packages | Affordable SEO Services 2026 | NextGen SEO',
    description: 'Affordable SEO packages from $1200/month. Basic, Standard, Premium & Custom plans. Transparent pricing with guaranteed results.',
    canonical: 'https://nextgenseo.pro/pricing',
    schema: null,
  },
  {
    path: 'case_studies',
    title: 'SEO Case Studies | 300%+ Traffic Growth | NextGen SEO',
    description: 'Real SEO case studies showing 300-890% traffic growth. See how NextGen SEO transforms businesses across industries.',
    canonical: 'https://nextgenseo.pro/case_studies',
    schema: null,
  },
  {
    path: 'service_onpage',
    title: 'On-Page SEO Optimization Services 2026 | NextGen SEO',
    description: 'Professional on-page SEO optimization. Keyword strategy, meta tags, content optimization for Google rankings.',
    canonical: 'https://nextgenseo.pro/service_onpage',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "On-Page SEO Optimization",
      "provider": { "@type": "Organization", "name": "NextGen SEO Agency", "url": "https://nextgenseo.pro" },
      "url": "https://nextgenseo.pro/service_onpage",
      "description": "Professional on-page SEO optimization including keyword strategy, meta tags, and content optimization."
    }),
  },
  {
    path: 'service_offpage',
    title: 'Off-Page SEO & Link Building Services 2026 | NextGen SEO',
    description: 'Expert link building and off-page SEO. High-authority backlinks, digital PR, and brand mentions from top sites.',
    canonical: 'https://nextgenseo.pro/service_offpage',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Off-Page SEO & Link Building",
      "provider": { "@type": "Organization", "name": "NextGen SEO Agency", "url": "https://nextgenseo.pro" },
      "url": "https://nextgenseo.pro/service_offpage",
      "description": "Expert link building and off-page SEO services including high-authority backlinks and digital PR."
    }),
  },
  {
    path: 'service_technical',
    title: 'Technical SEO Services | Core Web Vitals | NextGen SEO',
    description: 'Technical SEO services. Core Web Vitals optimization, schema markup, crawlability, and site speed improvements.',
    canonical: 'https://nextgenseo.pro/service_technical',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Technical SEO Services",
      "provider": { "@type": "Organization", "name": "NextGen SEO Agency", "url": "https://nextgenseo.pro" },
      "url": "https://nextgenseo.pro/service_technical",
      "description": "Technical SEO services including Core Web Vitals, schema markup, and crawlability optimization."
    }),
  },
  {
    path: 'service_ai',
    title: 'AI-Powered SEO Services 2026 | NextGen SEO',
    description: 'AI-powered SEO strategies. Predictive analytics, semantic mapping, and automated SEO insights for faster rankings.',
    canonical: 'https://nextgenseo.pro/service_ai',
    schema: null,
  },
  {
    path: 'buy-backlinks',
    title: 'Buy Backlinks | High-Authority Link Building | NextGen SEO',
    description: 'Buy high-authority backlinks for your website. Vetted sites, real traffic, white-hat link building. Browse our marketplace.',
    canonical: 'https://nextgenseo.pro/buy-backlinks',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Buy Backlinks Marketplace",
      "provider": { "@type": "Organization", "name": "NextGen SEO Agency", "url": "https://nextgenseo.pro" },
      "url": "https://nextgenseo.pro/buy-backlinks",
      "description": "Buy high-authority backlinks from vetted sites. White-hat link building marketplace."
    }),
  },
  {
    path: 'free_audit_page',
    title: 'Free Professional SEO Audit | Get Your Growth Plan | NextGen SEO',
    description: 'Get a free professional SEO audit of your website. Technical health check, keyword gaps, and actionable growth plan.',
    canonical: 'https://nextgenseo.pro/free_audit_page',
    schema: null,
  },
  {
    path: 'community',
    title: 'SEO Community | Connect, Share & Grow | NextGen SEO',
    description: 'Join the NextGen SEO community. Connect with founders, share strategies, and grow your organic traffic together.',
    canonical: 'https://nextgenseo.pro/community',
    schema: null,
  },
  {
    path: 'tool_audit',
    title: 'Free SEO Audit Tool | Instant Website Health Check | NextGen SEO',
    description: 'Free instant SEO audit tool. Check your website technical health score and get prioritized SEO fixes in seconds.',
    canonical: 'https://nextgenseo.pro/tool_audit',
    schema: null,
  },
  {
    path: 'tool_keywords',
    title: 'Free Keyword Research Tool | Semantic Keyword Lab | NextGen SEO',
    description: 'Free semantic keyword research tool. Discover keyword clusters, search volume, difficulty, and ranking opportunities.',
    canonical: 'https://nextgenseo.pro/tool_keywords',
    schema: null,
  },
  {
    path: 'tool_writer',
    title: 'Free AI SEO Content Writer | Generate Optimized Drafts | NextGen SEO',
    description: 'Free AI SEO content writer. Generate optimized content drafts with tone control and keyword placement.',
    canonical: 'https://nextgenseo.pro/tool_writer',
    schema: null,
  },
  {
    path: 'tool_competitor',
    title: 'Free Competitor Analysis Tool | SEO Intel | NextGen SEO',
    description: 'Free competitor analysis tool. Reverse-engineer rival backlink profiles and find content gaps to exploit.',
    canonical: 'https://nextgenseo.pro/tool_competitor',
    schema: null,
  },
  {
    path: 'tool_assistant',
    title: 'Free AI SEO Expert Chat | Instant SEO Answers | NextGen SEO',
    description: 'Free AI SEO expert assistant. Get instant answers on SEO strategy, link building, and technical fixes.',
    canonical: 'https://nextgenseo.pro/tool_assistant',
    schema: null,
  },
];

// ─── Blog posts (must match BlogPageNew.tsx defaultPosts) ─────────────────────
const blogPosts = [
  {
    slug: 'the-impact-of-advanced-ai-on-seo-strategies',
    title: 'The Impact of Advanced AI on SEO Strategies | NextGen SEO Blog',
    description: 'Discover how recent advances in AI are reshaping search algorithms and what it means for your SEO strategy in 2025.',
    author: 'Tayyab Mehmood',
    date: '2025-06-12',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
  },
  {
    slug: 'mastering-core-web-vitals-in-2025',
    title: 'Mastering Core Web Vitals in 2025 | NextGen SEO Blog',
    description: 'A comprehensive guide to optimizing LCP, FID, and CLS for better Google rankings and user experience.',
    author: 'Fatima Ahad',
    date: '2025-06-08',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  },
  {
    slug: 'link-building-strategies-that-actually-work-in-2025',
    title: 'Link Building Strategies That Actually Work in 2025 | NextGen SEO Blog',
    description: 'Proven white-hat link building techniques that generate high-quality backlinks and boost domain authority.',
    author: 'Tayyab Mehmood',
    date: '2025-06-05',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
  },
  {
    slug: 'local-seo-domination-how-small-businesses-win-google-maps',
    title: 'Local SEO Domination: How Small Businesses Win Google Maps | NextGen SEO Blog',
    description: 'Complete guide to ranking #1 in Google Maps and local search results for your small business.',
    author: 'Fatima Ahad',
    date: '2025-06-01',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80',
  },
  {
    slug: 'e-commerce-seo-ranking-products-and-categories',
    title: 'E-commerce SEO: Ranking Products and Categories | NextGen SEO Blog',
    description: 'Advanced SEO strategies specifically designed for e-commerce websites to increase product visibility and sales.',
    author: 'Tayyab Mehmood',
    date: '2025-05-28',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&q=80',
  },
  {
    slug: 'content-marketing-strategy-creating-content-that-ranks',
    title: 'Content Marketing Strategy: Creating Content That Ranks | NextGen SEO Blog',
    description: 'How to create SEO-optimized content that ranks on Google and drives organic traffic consistently.',
    author: 'Fatima Ahad',
    date: '2025-05-24',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80',
  },
  {
    slug: 'top-saas-link-building-services-in-2026-how-to-choose-the-right-partner',
    title: 'Top SaaS Link Building Services in 2026 | NextGen SEO Blog',
    description: 'How to choose the right SaaS link building partner in 2026. Compare top services, pricing, and results.',
    author: 'Tayyab Mehmood',
    date: '2026-07-12',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
  },
  {
    slug: 'the-complete-guide-to-seo-services-for-small-businesses',
    title: 'The Complete Guide to SEO Services for Small Businesses | NextGen SEO Blog',
    description: 'Everything small businesses need to know about SEO services — what to buy, what to avoid, and how to grow.',
    author: 'Tayyab Mehmood',
    date: '2026-06-10',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  },
];

// ─── Patch function ───────────────────────────────────────────────────────────
function patch(html, { title, description, canonical, ogImage = 'https://nextgenseo.pro/pics/logo.png', schema }) {
  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/,   `$1${description.replace(/"/g, '&quot;')}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/,          `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/,   `$1${title.replace(/"/g, '&quot;')}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/,`$1${description.replace(/"/g, '&quot;')}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/,     `$1${canonical}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/,   `$1${ogImage}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/,  `$1${title.replace(/"/g, '&quot;')}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/,`$1${description.replace(/"/g, '&quot;')}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/,  `$1${ogImage}$2`);

  // Inject extra schema if provided (before </head>)
  if (schema) {
    out = out.replace('</head>', `<script type="application/ld+json">${schema}</script>\n</head>`);
  }

  return out;
}

// ─── Noscript nav links (helps Googlebot crawl all pages without JS) ──────────
function buildNoscript() {
  return `<noscript>
<style>body{font-family:Arial,sans-serif;background:#020617;color:#f8fafc;padding:2rem;text-align:center}</style>
<h1>NextGen SEO Agency — Professional SEO Services</h1>
<p>Expert SEO services, link building, and technical SEO by Tayyab Mehmood.</p>
<nav><ul style="list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;margin:1rem 0">
<li><a href="/" style="color:#a855f7">Home</a></li>
<li><a href="/about" style="color:#a855f7">About</a></li>
<li><a href="/service_onpage" style="color:#a855f7">On-Page SEO</a></li>
<li><a href="/service_offpage" style="color:#a855f7">Link Building</a></li>
<li><a href="/service_technical" style="color:#a855f7">Technical SEO</a></li>
<li><a href="/service_ai" style="color:#a855f7">AI SEO</a></li>
<li><a href="/buy-backlinks" style="color:#a855f7">Buy Backlinks</a></li>
<li><a href="/pricing" style="color:#a855f7">Pricing</a></li>
<li><a href="/case_studies" style="color:#a855f7">Case Studies</a></li>
<li><a href="/blog" style="color:#a855f7">Blog</a></li>
<li><a href="/team" style="color:#a855f7">Team</a></li>
<li><a href="/contact" style="color:#a855f7">Contact</a></li>
<li><a href="/tool_audit" style="color:#a855f7">Free SEO Audit</a></li>
<li><a href="/community" style="color:#a855f7">Community</a></li>
</ul></nav>
</noscript>`;
}

// Inject noscript into base index.html (root) if not already there
let rootHtml = base;
if (!rootHtml.includes('<noscript>')) {
  rootHtml = rootHtml.replace('<div id="root">', `${buildNoscript()}\n    <div id="root">`);
  fs.writeFileSync(path.join(DIST, 'index.html'), rootHtml, 'utf-8');
  console.log('✓ / (noscript injected into root index.html)');
}

// ─── Generate static pages ────────────────────────────────────────────────────
let count = 0;

for (const route of routes) {
  const dir = path.join(DIST, route.path);
  fs.mkdirSync(dir, { recursive: true });
  let html = patch(rootHtml, route);
  // Inject noscript if not present
  if (!html.includes('<noscript>')) {
    html = html.replace('<div id="root">', `${buildNoscript()}\n    <div id="root">`);
  }
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  console.log(`✓ /${route.path}`);
  count++;
}

// ─── Generate blog post pages ─────────────────────────────────────────────────
const supabasePosts = await fetchSupabaseBlogPosts();

// Merge: Supabase posts + hardcoded defaults (deduplicate by slug)
const slugSeen = new Set();
const allBlogPosts = [];

// Supabase posts first (they take priority)
for (const post of supabasePosts) {
  const slug = post.slug || toSlug(post.title);
  if (!slug || slugSeen.has(slug)) continue;
  slugSeen.add(slug);
  allBlogPosts.push({
    slug,
    title: `${post.title} | NextGen SEO Blog`,
    description: post.excerpt || post.description || `${post.title} - Read on NextGen SEO Blog.`,
    author: post.author || 'NextGen SEO',
    date: post.date || post.createdAt || new Date().toISOString().split('T')[0],
    image: post.image || 'https://nextgenseo.pro/pics/logo.png',
  });
}

// Then hardcoded defaults
for (const post of blogPosts) {
  if (slugSeen.has(post.slug)) continue;
  slugSeen.add(post.slug);
  allBlogPosts.push(post);
}

console.log(`\n📝 Blog posts to prerender: ${allBlogPosts.length} (${supabasePosts.length} from Supabase + ${allBlogPosts.length - supabasePosts.length} defaults)`);

for (const post of allBlogPosts) {
  const dir = path.join(DIST, 'blog', post.slug);
  fs.mkdirSync(dir, { recursive: true });

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title.replace(' | NextGen SEO Blog', ''),
    "description": post.description,
    "image": post.image,
    "author": { "@type": "Person", "name": post.author },
    "publisher": { "@type": "Organization", "name": "NextGen SEO Agency", "url": "https://nextgenseo.pro", "logo": { "@type": "ImageObject", "url": "https://nextgenseo.pro/pics/logo.png" } },
    "datePublished": post.date,
    "url": `https://nextgenseo.pro/blog/${post.slug}`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://nextgenseo.pro/blog/${post.slug}` }
  });

  let html = patch(rootHtml, {
    title: post.title,
    description: post.description,
    canonical: `https://nextgenseo.pro/blog/${post.slug}`,
    ogImage: post.image,
    schema,
  });

  if (!html.includes('<noscript>')) {
    html = html.replace('<div id="root">', `${buildNoscript()}\n    <div id="root">`);
  }

  // Inject article content into noscript for crawlers
  const articleContent = post.content ? `
    <article>
      <h1>${post.title.replace(' | NextGen SEO Blog', '').replace(/"/g, '&quot;')}</h1>
      <p><strong>By ${post.author}</strong> | ${post.date}</p>
      ${post.content}
    </article>
  ` : `
    <article>
      <h1>${post.title.replace(' | NextGen SEO Blog', '').replace(/"/g, '&quot;')}</h1>
      <p>${post.description.replace(/"/g, '&quot;')}</p>
      <p>By ${post.author} | ${post.date}</p>
    </article>
  `;
  
  html = html.replace('</noscript>', `${articleContent}</noscript>`);

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  console.log(`✓ /blog/${post.slug}`);
  count++;
}

console.log(`\n✅ Prerender complete — ${count} pages generated.\n`);
