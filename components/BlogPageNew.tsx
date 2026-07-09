import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getBlogsFromFirebase } from '../utils/firebase';

export const getPostSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const defaultPosts = [
  {
    title: "The Impact of Advanced AI on SEO Strategies",
    category: "AI & Trends",
    date: "June 12, 2025",
    excerpt: "Discover how recent advances in AI are reshaping search algorithms and what it means for your SEO strategy.",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format&fit=crop",
    author: "Tayyab Mehmood",
    content: `<h2>How AI is Transforming SEO in 2025</h2><p>Artificial Intelligence has fundamentally changed how search engines understand and rank content. Machine learning algorithms now power Google's ranking system, with RankBrain being one of the top three ranking factors.</p><h3>Key AI Applications in SEO</h3><ul><li>Natural Language Processing for better content understanding</li><li>Predictive analytics for search trend forecasting</li><li>Automated content optimization using AI tools</li><li>AI-driven link building and outreach</li></ul><p>Businesses leveraging AI-powered SEO strategies are seeing 40-60% improvements in organic visibility within 6 months.</p>`
  },
  {
    title: "Mastering Core Web Vitals in 2025",
    category: "Technical SEO",
    date: "June 08, 2025",
    excerpt: "A comprehensive guide to optimizing LCP, FID, and CLS for better rankings and user experience.",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
    author: "Fatima Ahad",
    content: `<h2>Understanding Core Web Vitals</h2><p>Core Web Vitals are Google's official metrics for measuring user experience and are now confirmed ranking factors.</p><h3>The Three Core Web Vitals</h3><p><strong>Largest Contentful Paint (LCP):</strong> Should be under 2.5 seconds.</p><p><strong>First Input Delay (FID):</strong> Should be under 100 milliseconds.</p><p><strong>Cumulative Layout Shift (CLS):</strong> Should be under 0.1.</p><h3>Quick Optimization Tips</h3><ul><li>Minimize CSS and JavaScript</li><li>Use lazy loading for images</li><li>Optimize server response time</li><li>Use CDN for faster content delivery</li></ul>`
  },
  {
    title: "Link Building Strategies That Actually Work in 2025",
    category: "Link Building",
    date: "June 05, 2025",
    excerpt: "Proven white-hat link building techniques that generate high-quality backlinks and boost domain authority.",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
    author: "Tayyab Mehmood",
    content: `<h2>The New Era of Link Building</h2><p>Link building has evolved significantly. Google now prioritizes quality over quantity.</p><h3>Top White-Hat Link Building Methods</h3><ul><li><strong>Broken Link Building:</strong> Find broken links on relevant sites and suggest your content as replacement</li><li><strong>Resource Page Links:</strong> Get listed on industry resource pages</li><li><strong>Guest Posting:</strong> Write high-quality content for authoritative blogs</li><li><strong>Skyscraper Technique:</strong> Create better version of existing content and reach out for links</li><li><strong>Press Coverage:</strong> Get featured in news outlets and industry publications</li></ul>`
  },
  {
    title: "Local SEO Domination: How Small Businesses Win Google Maps",
    category: "Local SEO",
    date: "June 01, 2025",
    excerpt: "Complete guide to ranking #1 in Google Maps and local search results for your business.",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80&auto=format&fit=crop",
    author: "Fatima Ahad",
    content: `<h2>Why Local SEO Matters</h2><p>76% of people who search for local services visit or call the business within 24 hours.</p><h3>Essential Local SEO Factors</h3><ul><li>Google Business Profile optimization</li><li>Local citations and NAP consistency</li><li>Local keyword optimization</li><li>Customer reviews and ratings</li><li>Local link building</li></ul><h3>Step-by-Step Local SEO Strategy</h3><ol><li>Claim and optimize Google Business Profile</li><li>Ensure NAP consistency across all platforms</li><li>Get verified on local directories</li><li>Generate customer reviews</li><li>Build local citations</li><li>Target location-specific keywords</li></ol>`
  },
  {
    title: "E-commerce SEO: Ranking Products and Categories",
    category: "E-commerce",
    date: "May 28, 2025",
    excerpt: "Advanced SEO strategies specifically designed for e-commerce websites to increase product visibility and sales.",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80&auto=format&fit=crop",
    author: "Tayyab Mehmood",
    content: `<h2>E-commerce SEO Challenges</h2><p>E-commerce sites face unique SEO challenges including duplicate content, poor site structure, and thin product descriptions.</p><h3>Critical E-commerce SEO Elements</h3><ul><li>Unique product descriptions (minimum 200 words)</li><li>High-quality product images with alt text</li><li>Proper URL structure for categories</li><li>Schema markup for products</li><li>Customer reviews and ratings</li></ul>`
  },
  {
    title: "Content Marketing Strategy: Creating Content That Ranks",
    category: "Content Marketing",
    date: "May 24, 2025",
    excerpt: "How to create SEO-optimized content that ranks on Google and drives organic traffic consistently.",
    readTime: "13 min",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&auto=format&fit=crop",
    author: "Fatima Ahad",
    content: `<h2>Content is Still King</h2><p>Your content must be strategically optimized for search engines and user intent.</p><h3>The Content Creation Process</h3><ol><li><strong>Keyword Research:</strong> Find keywords your audience is searching for</li><li><strong>Search Intent Analysis:</strong> Understand what searchers want</li><li><strong>Content Outline:</strong> Create comprehensive, well-structured outline</li><li><strong>High-Quality Writing:</strong> Write engaging, valuable content</li><li><strong>On-Page SEO:</strong> Optimize title, meta, headers, and keywords</li></ol><h3>Content Types That Rank</h3><ul><li>Comprehensive guides (2000+ words)</li><li>Case studies with real results</li><li>How-to tutorials</li><li>Industry reports</li><li>Comparison articles</li></ul>`
  },
];

// ─── Single Blog Post Page ───────────────────────────────────────────────────
const BlogPostPage = ({ post, onBack }: { post: any; onBack: () => void }) => {
  React.useEffect(() => {
    document.title = `${post.title} | NextGen SEO Blog`;
    window.scrollTo(0, 0);
  }, [post]);

  return (
    <div className="pb-16 px-4 sm:px-6 max-w-4xl mx-auto" style={{ minHeight: '60vh' }}>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 mt-2 group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </button>

      {/* Hero image */}
      <div className="rounded-2xl overflow-hidden mb-8" style={{ contain: 'paint' }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto block"
          style={{ filter: 'none', backdropFilter: 'none', WebkitBackdropFilter: 'none' }}
          onError={(e: any) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
        />
      </div>

      {/* Meta */}
      <div className="mb-6">
        <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white text-xs font-black uppercase mb-4">
          {post.category}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">{post.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime} read</span>
        </div>
      </div>

      {/* Content */}
      <div className="glass rounded-2xl p-6 sm:p-10">
        <div
          className="prose prose-invert prose-purple max-w-none prose-headings:font-black prose-h2:text-2xl prose-h3:text-xl prose-p:text-slate-300 prose-li:text-slate-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Back button bottom */}
      <button
        onClick={onBack}
        className="mt-10 flex items-center gap-2 text-purple-400 hover:text-white transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to all articles
      </button>
    </div>
  );
};

// ─── Blog Post by Slug (for direct URL / new tab) ──────────────────────────
export const BlogPostBySlug = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    // First check defaultPosts immediately
    const defaultMatch = defaultPosts.find(p => getPostSlug(p.title) === slug);
    if (defaultMatch) {
      setPost(defaultMatch);
      setLoading(false);
      return;
    }
    // Then check firebase blogs
    getBlogsFromFirebase()
      .then(blogs => {
        const match = blogs.find((p: any) => getPostSlug(p.title) === slug);
        if (match) setPost(match);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="text-center py-20">
      <p className="text-slate-400 text-xl mb-6">Blog post not found.</p>
      <button onClick={() => navigate('/blog')} className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-xl font-bold">Back to Blog</button>
    </div>
  );

  return <BlogPostPage post={post} onBack={() => navigate('/blog')} />;
};

// ─── Blog List Page ───────────────────────────────────────────────────────────
const BlogPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [customBlogs, setCustomBlogs] = React.useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [selectedPost, setSelectedPost] = React.useState<any>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Load Firebase blogs + check URL for deep link
  React.useEffect(() => {
    window.scrollTo(0, 0);

    // Check deep link immediately with defaultPosts
    const path = location.pathname;
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      const match = defaultPosts.find(p => getPostSlug(p.title) === slug);
      if (match) setSelectedPost(match);
    }

    getBlogsFromFirebase()
      .then(blogs => {
        setCustomBlogs(blogs);
        const currentPath = location.pathname;
        if (currentPath.startsWith('/blog/')) {
          const slug = currentPath.replace('/blog/', '');
          const firebaseMatch = blogs.find((p: any) => getPostSlug(p.title) === slug);
          if (firebaseMatch) setSelectedPost(firebaseMatch);
        }
      })
      .catch(() => {});
  }, []);

  // Update URL & title when post changes
  React.useEffect(() => {
    if (selectedPost) {
      document.title = `${selectedPost.title} | NextGen SEO Blog`;
      navigate(`/blog/${getPostSlug(selectedPost.title)}`);
      window.scrollTo(0, 0);
    } else {
      document.title = 'Blog | SEO Insights & Strategies | NextGen SEO';
      if (location.pathname !== '/blog') navigate('/blog');
    }
  }, [selectedPost]);

  const allPosts = [...customBlogs, ...defaultPosts];
  const categories = ['All', ...Array.from(new Set(allPosts.map(p => p.category)))];
  let filteredPosts = selectedCategory === 'All' ? allPosts : allPosts.filter(p => p.category === selectedCategory);

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(p =>
      p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
    );
  }

  // Show single post page
  if (selectedPost) {
    return <BlogPostPage post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div className="pb-12 sm:pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">
          Intelligence <span className="gradient-text">Hub</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
          Expert insights, strategies, and trends from the NextGen SEO team
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12">
        <div className="flex-1 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search articles, authors, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-12 py-3 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 sm:mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                : 'glass text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredPosts.map((p, i) => (
          <a
            key={i}
            href={`/blog/${getPostSlug(p.title)}`}
            onClick={(e) => {
              if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
              e.preventDefault();
              setSelectedPost(p);
            }}
            className="glass rounded-2xl sm:rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-all cursor-pointer group hover-lift block"
          >
            <div className="relative w-full overflow-hidden bg-slate-900" style={{ aspectRatio: '16/9' }}>
              <img
                src={p.image}
                alt={p.title}
                width="800"
                height="450"
                loading="lazy"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                onError={(e: any) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm text-white text-[10px] sm:text-xs font-black uppercase">
                {p.category}
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-3 sm:mb-4 text-slate-500 text-[10px] sm:text-xs font-bold">
                <span>{p.author}</span>
                <span>{p.readTime}</span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-colors leading-tight">
                {p.title}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-3">{p.excerpt}</p>
              <div className="flex justify-between items-center text-slate-500 text-[10px] sm:text-xs font-bold uppercase pt-3 sm:pt-4 border-t border-white/5">
                <span>{p.date}</span>
                <span className="text-purple-400 group-hover:translate-x-2 transition-transform">Read More →</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
