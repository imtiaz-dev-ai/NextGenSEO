import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import CaseStudies from './components/CaseStudies';
import Pricing from './components/Pricing';
import Newsletter from './components/Newsletter';
import LiveChat from './components/LiveChat';
import ScrollProgress from './components/ScrollProgress';
import FAQ from './components/FAQ';
import BeforeAfter from './components/BeforeAfter';
import Team from './components/Team';
import ParticleBackground from './components/ParticleBackground';
import LiveKeywordSearch from './components/LiveKeywordSearch';
import DashboardPreview from './components/DashboardPreview';
import ScrollReveal from './components/ScrollReveal';
import FloatingActionButton from './components/FloatingActionButton';
import InteractiveServices from './components/InteractiveServices';
import AdminPanel from './components/AdminPanel';
import { ThemeProvider } from './components/ThemeToggle';
import { AppRoute } from './types';
import { HiOutlinePencilSquare, HiOutlineLink, HiOutlineCog6Tooth, HiOutlineSparkles, HiOutlineTag, HiOutlineDocumentText, HiOutlineArrowsRightLeft, HiOutlineClipboardDocumentCheck, HiOutlineQueueList, HiOutlineCursorArrowRays, HiOutlineMegaphone, HiOutlineChartBarSquare, HiOutlineGlobeAlt, HiOutlinePhoto, HiOutlineUserGroup, HiOutlineBolt, HiOutlineCodeBracket, HiOutlineServerStack, HiOutlineLockClosed, HiOutlineDocumentMagnifyingGlass, HiOutlineDevicePhoneMobile, HiOutlineBeaker, HiOutlineMap, HiOutlineRocketLaunch, HiOutlineCpuChip, HiOutlineLightBulb } from 'react-icons/hi2';

const SvgIcon = ({ path, className = "w-5 h-5" }: { path: string; className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
);
const ServicePage = ({ title, description, features, benefits, route, setRoute, icon }: any) => (
  <div className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
    <div className="mb-12 sm:mb-20 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
        <div className="flex-1 w-full">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto lg:mx-0">
            {icon}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight text-center lg:text-left">{title} <span className="gradient-text">Service</span></h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-400 leading-relaxed text-center lg:text-left">{description}</p>
        </div>
        <div className="flex-1 w-full">
          <div className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-purple-500/20">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[{v:"300%+",l:"Avg Growth"},{v:"6-12",l:"Months"},{v:"100%",l:"White-Hat"},{v:"24/7",l:"Support"}].map((s,i)=>(
                <div key={i} className="text-center"><div className="text-4xl font-black gradient-text mb-2">{s.v}</div><div className="text-slate-400 text-sm font-bold">{s.l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-20">
      {features.map((f: any, i: number) => (
        <div key={i} className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-white/5 hover:border-purple-500/30 transition-all hover:-translate-y-2 group hover-lift">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
            {f.icon}
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-colors">{f.title}</h3>
          <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
        </div>
      ))}
    </div>
    <div className="glass p-8 sm:p-12 rounded-2xl sm:rounded-[3rem] border-purple-500/20 bg-purple-500/[0.02] text-center">
      <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6">Drive Real Growth with NextGen SEO</h2>
      <p className="text-slate-400 mb-6 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base">{benefits}</p>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
        <button onClick={() => { setRoute(AppRoute.CONTACT); window.scrollTo(0, 0); }} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-purple-500/20 transition-all w-full sm:w-auto">Start Your Project</button>
        <button onClick={() => { setRoute(AppRoute.CONTACT); window.scrollTo(0, 0); }} className="glass px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg hover:bg-white/5 transition-all w-full sm:w-auto">Get a Consultation</button>
      </div>
    </div>
  </div>
);

const AboutPage = ({ setCurrentRoute }: { setCurrentRoute: (route: AppRoute) => void }) => (
  <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
    <div className="text-center mb-12 sm:mb-16 md:mb-20">
      <div className="inline-block px-4 sm:px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 text-xs font-black uppercase mb-4 sm:mb-6">About NextGen SEO</div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6">Professional <span className="gradient-text">SEO Services</span> Agency</h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">Leading SEO agency providing expert SEO services, professional link building services, and SEO consultants. Trusted by 200+ businesses worldwide.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-16 sm:mb-24 md:mb-32">
      <div className="glass p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[3rem] border-purple-500/20">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
          <img 
            src="/pics/New folder/Tayyab.png" 
            alt="Tayyab Mehmood - Founder and CEO of NextGen SEO Agency"
            width="400"
            height="400"
            loading="lazy"
            className="relative w-full h-auto rounded-3xl border-2 border-purple-500/30"
          />
        </div>
        <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 text-xs font-black uppercase mb-4">Founder & CEO</div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4"><span className="gradient-text">Tayyab Mehmood</span></h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-4 sm:mb-6">
          With 10+ years of experience as an SEO expert and consultant, Tayyab founded NextGen SEO to provide affordable SEO services for small businesses. His expertise spans professional link building, local SEO, and content marketing strategies that get real results.
        </p>
              <div className="flex gap-2">
                {[{ href: 'https://www.linkedin.com/company/nextgenseo-official/', label: 'LinkedIn', hover: 'hover:bg-blue-600', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                  { href: 'https://x.com/next_genseo', label: 'Twitter', hover: 'hover:bg-sky-500', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                  { href: 'https://www.instagram.com/tayyab_backlinks?igsh=cnQ1cXF0OGV0cnBt', label: 'Instagram', hover: 'hover:bg-pink-600', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' }].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-xl bg-white/5 ${social.hover} transition-all flex items-center justify-center`}>
                    <SvgIcon path={social.path} />
                  </a>
                ))}
              </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-purple-500/20 hover-lift">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3">Our Vision</h3>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">To become the best SEO agency by delivering affordable, transparent, and results-driven SEO services that empower small businesses to dominate Google search results.</p>
        </div>

        <div className="glass p-8 rounded-3xl border-cyan-500/20 hover-lift">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h3 className="text-2xl font-black mb-3">Our Promise</h3>
          <p className="text-slate-400 leading-relaxed">Affordable SEO packages with complete transparency in reporting and a relentless focus on ROI. We don't just improve rankings—we help your business grow.</p>
        </div>

        <div className="glass p-8 rounded-3xl border-emerald-500/20 hover-lift">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h3 className="text-2xl font-black mb-3">Our Approach</h3>
          <p className="text-slate-400 leading-relaxed">Data-driven SEO strategies combined with expert link building and local SEO. Every campaign is custom-built for your unique business goals and budget.</p>
        </div>
      </div>
    </div>

    <div className="mb-16 sm:mb-24 md:mb-32">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 text-center">Why Choose <span className="gradient-text">NextGen SEO</span></h2>
      <p className="text-center text-slate-400 mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto text-sm sm:text-base px-4">We're not just another SEO agency. Here's what sets us apart.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {[{ value: '200+', title: 'Happy Clients', desc: 'Businesses trust us worldwide' },
          { value: '300%', title: 'Avg Growth', desc: 'Organic traffic increase' },
          { value: '10+', title: 'Years Experience', desc: 'Industry expertise' },
          { value: '24/7', title: 'Support', desc: 'Always here for you' }].map((stat, i) => (
          <div key={i} className="glass p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl text-center hover-lift">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black gradient-text mb-2 sm:mb-3 md:mb-4">{stat.value}</div>
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-black mb-1 sm:mb-2">{stat.title}</h3>
            <p className="text-slate-400 text-xs sm:text-sm">{stat.desc}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="mb-16 sm:mb-24 md:mb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <div className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover-lift">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-3 sm:mb-4">Affordable SEO</h3>
          <p className="text-sm sm:text-base text-slate-400">Budget-friendly SEO packages designed for small businesses. Get professional SEO services without breaking the bank.</p>
        </div>
        <div className="glass p-8 rounded-3xl hover-lift">
          <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <h3 className="text-2xl font-black mb-4">Expert Team</h3>
          <p className="text-slate-400">SEO experts, link building specialists, and content marketers working together to boost your Google rankings.</p>
        </div>
        <div className="glass p-8 rounded-3xl hover-lift">
          <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h3 className="text-2xl font-black mb-4">Proven Results</h3>
          <p className="text-slate-400">200+ businesses trust us for their SEO needs. Real rankings, real traffic, real growth for your business.</p>
        </div>
      </div>
    </div>

    <div className="glass p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl md:rounded-[3rem] border-purple-500/20 bg-purple-500/[0.02] text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 sm:mb-6">Ready to Transform Your Business?</h2>
      <p className="text-slate-400 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">Join 200+ companies that trust NextGen SEO for their organic growth strategy.</p>
      <button onClick={() => { setCurrentRoute(AppRoute.CONTACT); window.scrollTo(0, 0); }} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base md:text-lg lg:text-xl shadow-xl shadow-purple-500/20 transition-all">Get Started Today</button>
    </div>
  </div>
);

const BlogPage = () => {
  const [customBlogs, setCustomBlogs] = React.useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [selectedPost, setSelectedPost] = React.useState<any>(null);
  
  React.useEffect(() => {
    const saved = localStorage.getItem('blogPosts');
    if (saved) setCustomBlogs(JSON.parse(saved));
  }, []);

  const defaultPosts = [
    { 
      title: "The Impact of Advanced AI on SEO Strategies", 
      category: "AI & Trends", 
      date: "June 12, 2025", 
      excerpt: "Discover how recent advances in AI are reshaping search algorithms and what it means for your SEO strategy.", 
      readTime: "8 min", 
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", 
      author: "Tayyab Mehmood", 
      content: `<h2>How AI is Transforming SEO in 2025</h2>
<p>Artificial Intelligence has fundamentally changed how search engines understand and rank content. Google's AI algorithms now analyze user intent, content quality, and semantic relationships with unprecedented accuracy.</p>

<h3>Key AI Technologies Impacting SEO:</h3>
<ul>
<li><strong>Natural Language Processing (NLP):</strong> Understanding context and meaning beyond keywords</li>
<li><strong>Machine Learning:</strong> Predicting user behavior and personalizing search results</li>
<li><strong>RankBrain:</strong> Google's AI system for processing search queries</li>
<li><strong>BERT:</strong> Understanding conversational queries and long-tail keywords</li>
</ul>

<h3>What This Means for Your SEO Strategy:</h3>
<p>Focus on creating comprehensive, user-focused content that answers real questions. Use semantic keywords, optimize for voice search, and ensure your content provides genuine value. AI rewards quality over quantity.</p>

<p><strong>Action Steps:</strong> Conduct thorough keyword research, create topic clusters, optimize for featured snippets, and monitor user engagement metrics closely.</p>` 
    },
    { 
      title: "Mastering Core Web Vitals in 2025", 
      category: "Technical SEO", 
      date: "June 08, 2025", 
      excerpt: "A comprehensive guide to optimizing LCP, FID, and CLS for better rankings and user experience.", 
      readTime: "12 min", 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", 
      author: "Fatima Ahad", 
      content: `<h2>Understanding Core Web Vitals</h2>
<p>Core Web Vitals are Google's official metrics for measuring user experience. These three metrics directly impact your search rankings and user satisfaction.</p>

<h3>The Three Core Web Vitals:</h3>
<ol>
<li><strong>Largest Contentful Paint (LCP):</strong> Measures loading performance. Target: under 2.5 seconds</li>
<li><strong>First Input Delay (FID):</strong> Measures interactivity. Target: under 100 milliseconds</li>
<li><strong>Cumulative Layout Shift (CLS):</strong> Measures visual stability. Target: under 0.1</li>
</ol>

<h3>Optimization Techniques:</h3>
<p><strong>For LCP:</strong> Optimize images, use CDN, implement lazy loading, minimize CSS/JS, and use browser caching.</p>
<p><strong>For FID:</strong> Reduce JavaScript execution time, break up long tasks, use web workers, and optimize third-party scripts.</p>
<p><strong>For CLS:</strong> Set size attributes for images/videos, avoid inserting content above existing content, and use transform animations.</p>

<p>Tools like Google PageSpeed Insights, Lighthouse, and Chrome DevTools help monitor and improve these metrics.</p>` 
    },
    { 
      title: "Why Backlinks Still Rule the SERPs", 
      category: "Off-Page", 
      date: "June 05, 2025", 
      excerpt: "Despite algorithm changes, quality backlinks remain the #1 ranking factor. Here's how to build them ethically.", 
      readTime: "10 min", 
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80", 
      author: "Mahmood Akhtar", 
      content: `<h2>The Power of Quality Backlinks</h2>
<p>Backlinks remain Google's strongest ranking signal. A single high-quality backlink from an authoritative site can boost your rankings more than hundreds of low-quality links.</p>

<h3>White-Hat Link Building Strategies:</h3>
<ul>
<li><strong>Guest Blogging:</strong> Write valuable content for industry publications</li>
<li><strong>Digital PR:</strong> Get featured in news outlets and industry blogs</li>
<li><strong>Broken Link Building:</strong> Find broken links and offer your content as replacement</li>
<li><strong>Resource Page Link Building:</strong> Get listed on industry resource pages</li>
<li><strong>Skyscraper Technique:</strong> Create better content than competitors and reach out</li>
</ul>

<h3>What Makes a Quality Backlink?</h3>
<p>Domain authority, relevance to your niche, editorial placement (not footer/sidebar), dofollow attribute, and natural anchor text distribution.</p>

<p><strong>Avoid:</strong> Link farms, PBNs, paid links, reciprocal link schemes, and automated link building tools. Focus on earning links through exceptional content and genuine relationships.</p>` 
    },
    { 
      title: "Voice Search Optimization Essentials", 
      category: "Future Tech", 
      date: "May 29, 2025", 
      excerpt: "With 50% of searches now voice-based, learn how to optimize for conversational queries.", 
      readTime: "9 min", 
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&q=80", 
      author: "Islam Mehmood", 
      content: `<h2>The Rise of Voice Search</h2>
<p>Voice search is changing how people find information online. Smart speakers, mobile assistants, and voice-enabled devices are making conversational queries the new normal.</p>

<h3>Voice Search Optimization Strategies:</h3>
<ul>
<li><strong>Target Question Keywords:</strong> Who, what, where, when, why, how</li>
<li><strong>Use Natural Language:</strong> Write conversationally, as people speak</li>
<li><strong>Optimize for Featured Snippets:</strong> Voice assistants often read from position zero</li>
<li><strong>Focus on Local SEO:</strong> "Near me" searches are predominantly voice-based</li>
<li><strong>Improve Page Speed:</strong> Voice search favors fast-loading pages</li>
</ul>

<h3>Schema Markup for Voice Search:</h3>
<p>Implement FAQ schema, HowTo schema, and local business schema to help search engines understand your content structure and increase chances of being selected for voice results.</p>

<p>Create content that directly answers common questions in your industry. Use tools like AnswerThePublic and Google's People Also Ask to find voice search opportunities.</p>` 
    },
    { 
      title: "Local SEO: Dominate Your Market", 
      category: "Strategy", 
      date: "May 25, 2025", 
      excerpt: "Complete guide to ranking #1 in local search results and Google Maps for your business.", 
      readTime: "11 min", 
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", 
      author: "Haroon Hussain", 
      content: `<h2>Local SEO Mastery</h2>
<p>Local SEO is crucial for businesses serving specific geographic areas. 46% of all Google searches have local intent, making local optimization essential for visibility.</p>

<h3>Google Business Profile Optimization:</h3>
<ul>
<li>Complete all profile sections with accurate information</li>
<li>Choose the most specific business categories</li>
<li>Add high-quality photos and videos regularly</li>
<li>Respond to all reviews promptly and professionally</li>
<li>Post updates, offers, and events weekly</li>
</ul>

<h3>Local Citation Building:</h3>
<p>Ensure NAP (Name, Address, Phone) consistency across all directories: Yelp, Yellow Pages, Facebook, industry-specific directories, and local chambers of commerce.</p>

<h3>Local Content Strategy:</h3>
<p>Create location-specific landing pages, write about local events and news, showcase local customer testimonials, and build relationships with local businesses for backlinks.</p>

<p><strong>Pro Tip:</strong> Encourage satisfied customers to leave Google reviews. Reviews are a major local ranking factor and build trust with potential customers.</p>` 
    },
    { 
      title: "Content Strategy That Converts", 
      category: "Content", 
      date: "May 20, 2025", 
      excerpt: "Learn how to create content that ranks on Google and converts visitors into customers.", 
      readTime: "13 min", 
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", 
      author: "Muhammad Fahad", 
      content: `<h2>Building a Conversion-Focused Content Strategy</h2>
<p>Great content does two things: ranks well in search engines and converts visitors into customers. Here's how to achieve both.</p>

<h3>Content Research & Planning:</h3>
<ol>
<li><strong>Keyword Research:</strong> Find high-intent keywords with commercial value</li>
<li><strong>Competitor Analysis:</strong> Identify content gaps and opportunities</li>
<li><strong>Topic Clustering:</strong> Organize content into pillar pages and supporting articles</li>
<li><strong>User Intent Mapping:</strong> Match content to different stages of buyer journey</li>
</ol>

<h3>Content Creation Best Practices:</h3>
<p><strong>Structure:</strong> Use clear headings, short paragraphs, bullet points, and visual elements. Make content scannable.</p>
<p><strong>Depth:</strong> Cover topics comprehensively. Long-form content (2000+ words) typically ranks better.</p>
<p><strong>Originality:</strong> Provide unique insights, data, or perspectives. Don't just rehash existing content.</p>

<h3>Conversion Optimization:</h3>
<ul>
<li>Include clear CTAs throughout content</li>
<li>Add lead magnets (ebooks, checklists, templates)</li>
<li>Use social proof (testimonials, case studies, statistics)</li>
<li>Implement exit-intent popups</li>
<li>A/B test headlines, CTAs, and content formats</li>
</ul>

<p>Track metrics: organic traffic, time on page, bounce rate, conversion rate, and keyword rankings. Continuously optimize based on data.</p>` 
    },
  ];
  
  const allPosts = [...customBlogs, ...defaultPosts];
  const categories = ['All', ...Array.from(new Set(allPosts.map(p => p.category)))];
  const filteredPosts = selectedCategory === 'All' ? allPosts : allPosts.filter(p => p.category === selectedCategory);
  
  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6">Intelligence <span className="gradient-text">Hub</span></h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">Expert insights, strategies, and trends from the NextGen SEO team</p>
      </div>
      
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredPosts.map((p, i) => (
          <div key={i} onClick={() => setSelectedPost(p)} className="glass rounded-2xl sm:rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-all cursor-pointer group hover-lift">
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <img src={p.image} alt={`${p.title} - Blog article cover`} width="800" height="400" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm text-white text-[10px] sm:text-xs font-black uppercase">{p.category}</div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-3 sm:mb-4 text-slate-500 text-[10px] sm:text-xs font-bold">
                <span>{p.author}</span>
                <span>{p.readTime} read</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-colors leading-tight">{p.title}</h3>
              <div className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed line-clamp-3">{p.excerpt}</div>
              <div className="flex justify-between items-center text-slate-500 text-[10px] sm:text-xs font-bold uppercase pt-3 sm:pt-4 border-t border-white/5">
                <span>{p.date}</span>
                <span className="text-purple-400 group-hover:translate-x-2 transition-transform">Read More →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 sm:mt-16 text-center">
        <button className="glass px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-white/10 transition-all w-full sm:w-auto">Load More Articles</button>
      </div>

      {selectedPost && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[99999] overflow-y-auto pt-24" onClick={() => setSelectedPost(null)}>
          <div className="max-w-4xl w-full mx-auto my-8 px-4">
            <div className="glass rounded-3xl p-8 sm:p-12" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white text-xs font-black uppercase mb-3">{selectedPost.category}</div>
                <h1 className="text-3xl sm:text-4xl font-black mb-4">{selectedPost.title}</h1>
                <div className="flex gap-4 text-sm text-slate-400">
                  <span>{selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime} read</span>
                </div>
              </div>
              <button onClick={() => setSelectedPost(null)} className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-64 object-cover rounded-2xl mb-8" />
              <div className="prose prose-invert prose-purple max-w-none" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '', service: '', message: '' });

  const handleGmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.name.trim() || !formData.message.trim()) return;

    const subject = formData.service ? `${formData.service} - Inquiry from ${formData.name}` : `Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n${formData.service ? `Service: ${formData.service}\n` : ''}\nMessage:\n${formData.message}`;
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=nextgenseotool@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
    
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 text-xs font-black uppercase mb-6">Get In Touch</div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">Ready to <span className="gradient-text">Rank #1 on Google?</span></h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">Connect with Tayyab Mehmood's expert SEO team to discuss affordable SEO services, professional link building, and local SEO strategies for your business.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass p-10 rounded-[3rem] border-purple-500/20 hover-lift">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-black">Send us a message</h2>
            </div>
            <form onSubmit={handleGmailSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Full Name" 
                  required
                  className="bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-500/50 focus:outline-none" 
                />
                <input 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  type="email"
                  placeholder="Work Email" 
                  required
                  className="bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-purple-500/50 focus:outline-none" 
                />
              </div>
              <input 
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                placeholder="Service Interested In (e.g., Technical SEO, Link Building)" 
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 mb-6 focus:ring-2 focus:ring-purple-500/50 focus:outline-none" 
              />
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Tell us about your project..." 
                required
                className="w-full h-32 bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 mb-8 focus:ring-2 focus:ring-purple-500/50 focus:outline-none" 
              />
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-5 rounded-2xl font-black text-xl shadow-xl shadow-purple-500/40 transition-all hover:scale-[1.02] flex items-center justify-center gap-3 group"
              >
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Send via Gmail
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="glass p-8 rounded-3xl border-purple-500/20 hover-lift group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" role="img" aria-label="Email icon">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-black mb-2">Email Us</h3>
              <p className="text-slate-400 mb-4 text-sm">Get a response within 24 hours</p>
              <a href="mailto:nextgenseotool@gmail.com" className="text-purple-400 font-bold hover:text-purple-300 transition-colors block mb-3">nextgenseotool@gmail.com</a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nextgenseotool@gmail.com&su=SEO Inquiry&body=Hi NextGen SEO Team," 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors group/link"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Open in Gmail
                <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="glass p-8 rounded-3xl border-cyan-500/20 hover-lift group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" role="img" aria-label="Phone icon">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-black mb-2">Call / WhatsApp</h3>
              <p className="text-slate-400 mb-4 text-sm">Mon-Fri, 9AM-6PM PKT</p>
              <a href="tel:+923480440402" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors flex items-center gap-2 mb-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                +92 348 0440402
              </a>
              <a href="https://wa.me/923480440402" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-bold hover:bg-green-500/20 hover:border-green-500/50 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp Us
              </a>
            </div>

            <div className="glass p-8 rounded-3xl border-violet-500/20 hover-lift group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" role="img" aria-label="Location icon">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-black mb-2">Visit Us</h3>
              <p className="text-slate-400 text-sm leading-relaxed">123 SEO Street, Digital City<br/>New York, NY 10001</p>
            </div>

            <div className="glass p-8 rounded-3xl border-pink-500/20 hover-lift">
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <span className="gradient-text">Follow Us</span>
              </h3>
              <div className="flex gap-4">
                {[{ href: 'https://www.linkedin.com/company/nextgenseo-official/', label: 'LinkedIn', hover: 'bg-blue-600', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                  { href: 'https://x.com/next_genseo', label: 'Twitter', hover: 'bg-sky-500', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                  { href: 'https://www.instagram.com/next.genseo/', label: 'Instagram', hover: 'bg-pink-600', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' }].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className={`w-12 h-12 rounded-xl bg-white/5 hover:${social.hover} transition-all flex items-center justify-center`}>
                    <SvgIcon path={social.path} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    // Check URL hash for admin panel
    const hash = window.location.hash.slice(1);
    if (hash === 'admin') return AppRoute.ADMIN;
    return AppRoute.HOME;
  });

  // Initialize sample data on first load
  React.useEffect(() => {
    const sampleCases = [
      {
        id: "case1",
        client: "EcoShop Online",
        industry: "E-commerce",
        challenge: "New online store with zero organic traffic and no backlinks",
        trafficGrowth: "+720%",
        keywordsRanked: "+540",
        revenueIncrease: "+680%",
        duration: "9 months",
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
        color: "emerald"
      },
      {
        id: "case2",
        client: "LegalPro Services",
        industry: "Legal Services",
        challenge: "High competition in legal niche, poor local SEO rankings",
        trafficGrowth: "+490%",
        keywordsRanked: "+360",
        revenueIncrease: "+520%",
        duration: "8 months",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
        color: "blue"
      },
      {
        id: "case3",
        client: "TravelHub Agency",
        industry: "Travel & Tourism",
        challenge: "Seasonal traffic drops, weak content strategy, low engagement",
        trafficGrowth: "+580%",
        keywordsRanked: "+410",
        revenueIncrease: "+640%",
        duration: "7 months",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
        color: "cyan"
      },
      {
        id: "case4",
        client: "MediCare Plus",
        industry: "Healthcare",
        challenge: "Strict compliance requirements, low domain authority, poor mobile SEO",
        trafficGrowth: "+650%",
        keywordsRanked: "+480",
        revenueIncrease: "+710%",
        duration: "10 months",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
        color: "pink"
      },
      {
        id: "case5",
        client: "TechStartup Pro",
        industry: "SaaS Technology",
        challenge: "Zero brand awareness, competing with established players, no organic presence",
        trafficGrowth: "+890%",
        keywordsRanked: "+620",
        revenueIncrease: "+850%",
        duration: "12 months",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
        color: "purple"
      },
      {
        id: "case6",
        client: "FoodieHub Restaurant",
        industry: "Food & Hospitality",
        challenge: "Poor local visibility, not showing in Google Maps, low online orders",
        trafficGrowth: "+760%",
        keywordsRanked: "+510",
        revenueIncrease: "+820%",
        duration: "6 months",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        color: "emerald"
      }
    ];

    const sampleTeamMembers = [
      {
        id: "team1",
        name: "Sarah Johnson",
        role: "Content Strategist",
        bio: "Expert in SEO content creation with 8+ years experience in digital marketing",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      },
      {
        id: "team2",
        name: "David Chen",
        role: "Technical SEO Lead",
        bio: "Specializes in Core Web Vitals optimization and technical audits",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        linkedin: "https://linkedin.com",
        twitter: ""
      },
      {
        id: "team3",
        name: "Emily Rodriguez",
        role: "Link Building Manager",
        bio: "Built 10,000+ high-quality backlinks for Fortune 500 companies",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    ];

    // Initialize sample data if not exists
    const existingCases = localStorage.getItem('caseStudies');
    if (!existingCases || JSON.parse(existingCases).length < 6) {
      localStorage.setItem('caseStudies', JSON.stringify(sampleCases));
    }
    if (!localStorage.getItem('teamMembers')) {
      localStorage.setItem('teamMembers', JSON.stringify(sampleTeamMembers));
    }
  }, []);

  // Update URL when route changes and handle browser back/forward
  React.useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'admin') {
        setCurrentRoute(AppRoute.ADMIN);
      } else if (hash) {
        setCurrentRoute(hash as AppRoute);
      } else {
        setCurrentRoute(AppRoute.HOME);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL when route changes
  React.useEffect(() => {
    if (currentRoute === AppRoute.ADMIN) {
      window.history.pushState(null, '', '#admin');
    } else if (currentRoute === AppRoute.HOME) {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.history.pushState(null, '', `#${currentRoute}`);
    }
  }, [currentRoute]);

  const ToolPage = ({ title, desc }: { title: string; desc: string }) => (
    <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black mb-4">{title}</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">{desc}</p>
      </div>
      <div className="glass p-8 rounded-2xl">
        <p className="text-slate-300">This is a lightweight interface for the tool. You can wire up APIs and interactive UI here.</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.HOME: return (
        <>
          <Hero onStart={setCurrentRoute} />
          <ScrollReveal>
            <InteractiveServices />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <LiveKeywordSearch />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <DashboardPreview />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <BeforeAfter />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Testimonials />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQ />
          </ScrollReveal>
          <Newsletter />
        </>
      );
      // Services
      case AppRoute.SERVICE_ONPAGE: return (
        <ServicePage 
          icon={<HiOutlinePencilSquare className="w-12 h-12 text-white" />}
          title="On-Page SEO Optimization" 
          description="Transform your content into a high-performance ranking machine with our professional semantic optimization frameworks. Advanced keyword placement, meta tag optimization, and content strategy for Google dominance."
          features={[
            { icon: <HiOutlineTag className="w-8 h-8 text-purple-400" />, title: "Keyword Optimization Strategy", desc: "AI-driven semantic keyword placement and search intent alignment." },
            { icon: <HiOutlineDocumentText className="w-8 h-8 text-purple-400" />, title: "Meta Tags & Title Tags", desc: "CTR-focused title and meta description optimization for Google." },
            { icon: <HiOutlineArrowsRightLeft className="w-8 h-8 text-purple-400" />, title: "Internal Linking Strategy", desc: "Building powerful site silos to distribute authority and improve rankings." },
            { icon: <HiOutlineClipboardDocumentCheck className="w-8 h-8 text-purple-400" />, title: "On-Page SEO Audit", desc: "Complete analysis and improvement of page-level SEO factors." },
            { icon: <HiOutlineQueueList className="w-8 h-8 text-purple-400" />, title: "Heading Structure Optimization", desc: "H1-H6 hierarchy implementation for better crawling and rankings." },
            { icon: <HiOutlineCursorArrowRays className="w-8 h-8 text-purple-400" />, title: "User Experience & SEO", desc: "Matching content intent with user behavior for higher rankings and conversions." }
          ]}
          benefits="Join hundreds of businesses that saw a 300% increase in organic traffic and Google rankings through on-page SEO mastery."
          route={currentRoute}
          setRoute={setCurrentRoute}
        />
      );
      case AppRoute.SERVICE_OFFPAGE: return (
        <ServicePage 
          icon={<HiOutlineLink className="w-12 h-12 text-white" />}
          title="Off-Page SEO & Link Building" 
          description="Build high-authority digital ecosystems and professional backlink profiles that establish your brand as a market leader. Expert link building from high-authority sites and digital PR strategies."
          features={[
            { icon: <HiOutlineLink className="w-8 h-8 text-purple-400" />, title: "Professional Link Building", desc: "Quality-vetted backlinks from Tier 1 industry authoritative websites." },
            { icon: <HiOutlineMegaphone className="w-8 h-8 text-purple-400" />, title: "Digital PR & Outreach", desc: "Earning brand mentions and backlinks from high-authority news outlets." },
            { icon: <HiOutlineChartBarSquare className="w-8 h-8 text-purple-400" />, title: "Backlink Gap Analysis", desc: "Analyzing competitor backlink profiles and reclaiming lost link equity." },
            { icon: <HiOutlineGlobeAlt className="w-8 h-8 text-purple-400" />, title: "Social Media & SEO", desc: "Amplifying content reach across social networks for domain authority." },
            { icon: <HiOutlinePhoto className="w-8 h-8 text-purple-400" />, title: "Content Assets for Links", desc: "Creating linkable infographics, case studies, and data resources." },
            { icon: <HiOutlineUserGroup className="w-8 h-8 text-purple-400" />, title: "Competitor Link Strategy", desc: "Reverse-engineering and beating competitor link profiles." }
          ]}
          benefits="NextGen SEO's off-page and link building team secures quality backlinks and placements that your competitors cannot reach."
          route={currentRoute}
          setRoute={setCurrentRoute}
        />
      );
      case AppRoute.SERVICE_TECHNICAL: return (
        <ServicePage 
          icon={<HiOutlineCog6Tooth className="w-12 h-12 text-white" />}
          title="Technical SEO & Site Performance" 
          description="Fix the foundation with our comprehensive technical SEO deep-scans that eliminate barriers between your site and Google's index. Core Web Vitals optimization, schema markup, and crawlability improvements."
          features={[
            { icon: <HiOutlineBolt className="w-8 h-8 text-purple-400" />, title: "Core Web Vitals Optimization", desc: "LCP, CLS, and FID optimization for Google's ranking factors." },
            { icon: <HiOutlineCodeBracket className="w-8 h-8 text-purple-400" />, title: "JavaScript & SEO", desc: "Ensuring dynamic and React content is properly rendered and indexed by Google." },
            { icon: <HiOutlineServerStack className="w-8 h-8 text-purple-400" />, title: "Crawl Budget & Indexation", desc: "Directing search bot crawlers to your most valuable pages efficiently." },
            { icon: <HiOutlineLockClosed className="w-8 h-8 text-purple-400" />, title: "HTTPS & Security", desc: "SSL certificates and server-side security protocols for trust ranking." },
            { icon: <HiOutlineDocumentMagnifyingGlass className="w-8 h-8 text-purple-400" />, title: "Schema Markup Implementation", desc: "Advanced JSON-LD structured data for Rich Snippets and SERP enhancements." },
            { icon: <HiOutlineDevicePhoneMobile className="w-8 h-8 text-purple-400" />, title: "Mobile SEO & Responsiveness", desc: "Mobile-first indexing compliance and flawless responsive design." }
          ]}
          benefits="Technical SEO excellence is the minimum requirement for modern Google rankings. We ensure you never fall behind competitors."
          route={currentRoute}
          setRoute={setCurrentRoute}
        />
      );
      case AppRoute.SERVICE_AI: return (
        <ServicePage 
          icon={<HiOutlineSparkles className="w-12 h-12 text-white" />}
          title="AI-Powered SEO" 
          description="The future is now. We use advanced AI models to predict search trends before they happen."
          features={[
            { icon: <HiOutlineBeaker className="w-8 h-8 text-purple-400" />, title: "Predictive Analytics", desc: "Forecasting seasonal search shifts with AI." },
            { icon: <HiOutlineMap className="w-8 h-8 text-purple-400" />, title: "Semantic Mapping", desc: "Mapping topic clusters using NLP logic." },
            { icon: <HiOutlineRocketLaunch className="w-8 h-8 text-purple-400" />, title: "Automated Insights", desc: "Real-time auditing of millions of data points." },
            { icon: <HiOutlineCpuChip className="w-8 h-8 text-purple-400" />, title: "AI Content Studio", desc: "Generating high-authority drafts for scale." },
            { icon: <HiOutlineChartBarSquare className="w-8 h-8 text-purple-400" />, title: "SERP Simulations", desc: "Testing ranking changes in a sandbox environment." },
            { icon: <HiOutlineLightBulb className="w-8 h-8 text-purple-400" />, title: "Personalized Outreach", desc: "AI-enhanced communication for better link success." }
          ]}
          benefits="Leverage the same technology as Silicon Valley giants with NextGen's AI SEO Suite."
          route={currentRoute}
          setRoute={setCurrentRoute}
        />
      );

        // AI Tools
        case AppRoute.TOOL_AUDIT: return <ToolPage title="AI SEO Audit" desc="Run an automated site audit powered by our AI pipeline to surface critical SEO issues and prioritized fixes." />;
        case AppRoute.TOOL_KEYWORDS: return <ToolPage title="Semantic Keyword Lab" desc="Explore semantic keyword clusters and discover high-opportunity search terms." />;
        case AppRoute.TOOL_WRITER: return <ToolPage title="AI Content Writer" desc="Generate SEO-optimized content drafts with tone, structure, and keyword guidance." />;
        case AppRoute.TOOL_COMPETITOR: return <ToolPage title="Competitor Intel" desc="Reverse-engineer competitor strategies, backlink profiles, and top-performing content." />;
        case AppRoute.TOOL_ASSISTANT: return <ToolPage title="AI Expert Chat" desc="Ask the AI Expert Chat for recommendations, audits, and on-the-fly strategy guidance." />;

      // Corporate
      case AppRoute.ABOUT: return <AboutPage setCurrentRoute={setCurrentRoute} />;
      case AppRoute.TEAM: return (
        <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 text-xs font-black uppercase mb-6">Our Team</div>
            <h1 className="text-6xl md:text-7xl font-black mb-6">Meet The <span className="gradient-text">Experts</span></h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">A diverse team of SEO specialists, content strategists, and technical experts united by one goal: your success.</p>
          </div>
          <Team />
          <div className="mt-20 glass p-12 rounded-[3rem] border-purple-500/20 bg-purple-500/[0.02] text-center">
            <h2 className="text-4xl font-black mb-6">Join Our Growing Team</h2>
            <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg">We're always looking for talented individuals passionate about SEO and digital marketing. If you're driven, creative, and results-oriented, we'd love to hear from you.</p>
            <button onClick={() => { window.location.href = 'mailto:nextgenseotool@gmail.com?subject=Career Opportunity'; }} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-12 py-5 rounded-2xl font-black text-xl shadow-xl shadow-purple-500/20 transition-all">View Open Positions</button>
          </div>
        </div>
      );
      case AppRoute.BLOG: return <BlogPage />;
      case AppRoute.CONTACT: return <ContactPage />;
      case AppRoute.PRICING: return <Pricing onContact={() => { setCurrentRoute(AppRoute.CONTACT); window.scrollTo(0, 0); }} />;
      case AppRoute.CASE_STUDIES: return <CaseStudies />;
      case AppRoute.ADMIN: return <AdminPanel />;

      default: return <Hero onStart={setCurrentRoute} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen selection:bg-purple-500/30 relative">
        <ParticleBackground />
        <ScrollProgress />
        <Navbar currentRoute={currentRoute} setRoute={setCurrentRoute} />
        <main className="pt-20 sm:pt-24 min-h-[80vh] relative z-10">{renderContent()}</main>
        <LiveChat />
        <FloatingActionButton />

      <footer className="border-t border-white/5 py-12 px-6 mt-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-900 dark:from-[#010410] dark:to-[#020617]">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-pink-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] opacity-30" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Logo & About */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <button className="flex items-center gap-2 mb-4 group cursor-pointer" onClick={() => { setCurrentRoute(AppRoute.HOME); window.scrollTo(0, 0); }}>
                <img src="/pics/logo.png" alt="NextGen SEO" className="w-20 h-20 object-contain group-hover:scale-110 transition-transform" />
                <span className="text-lg font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">NextGen<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">SEO</span></span>
              </button>
              <p className="text-white text-sm leading-relaxed mb-6 max-w-xs">
                Premium search intelligence platform founded by <span className="text-white font-semibold">Tayyab Mehmood</span>. We build the future of search visibility.
              </p>
              <div className="flex gap-2">
                {[{ href: 'https://www.linkedin.com/company/nextgenseo-official/', label: 'LinkedIn', hover: 'bg-blue-600' },
                  { href: 'https://x.com/next_genseo', label: 'Twitter', hover: 'bg-sky-500' },
                  { href: 'https://www.instagram.com/next.genseo/', label: 'Instagram', hover: 'bg-pink-600' }].map((social, i) => {
                  const paths = ['M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'];
                  return (
                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className={`w-9 h-9 min-w-[44px] min-h-[44px] rounded-lg bg-white/5 flex items-center justify-center hover:${social.hover} hover:text-white transition-all border border-white/10 text-slate-400 hover:scale-110`}>
                      <SvgIcon path={paths[i]} className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-black mb-4 uppercase tracking-wider text-xs text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Services</h4>
              <ul className="space-y-2 text-white text-sm">
                <li><button onClick={() => { setCurrentRoute(AppRoute.SERVICE_ONPAGE); window.scrollTo(0, 0); }} className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all hover:translate-x-1">On-Page SEO</button></li>
                <li><button onClick={() => { setCurrentRoute(AppRoute.SERVICE_OFFPAGE); window.scrollTo(0, 0); }} className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all hover:translate-x-1">Off-Page & PR</button></li>
                <li><button onClick={() => { setCurrentRoute(AppRoute.SERVICE_TECHNICAL); window.scrollTo(0, 0); }} className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all hover:translate-x-1">Technical SEO</button></li>
                <li><button onClick={() => { setCurrentRoute(AppRoute.SERVICE_AI); window.scrollTo(0, 0); }} className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all hover:translate-x-1">AI Solutions</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-black mb-4 uppercase tracking-wider text-xs text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Company</h4>
              <ul className="space-y-2 text-white text-sm">
                <li><button onClick={() => { setCurrentRoute(AppRoute.HOME); window.scrollTo(0, 0); }} aria-label="Go to home page" className="hover:text-sky-400 transition-all hover:translate-x-1">Home</button></li>
                <li><button onClick={() => { setCurrentRoute(AppRoute.ABOUT); window.scrollTo(0, 0); }} aria-label="Go to about page" className="hover:text-sky-400 transition-all hover:translate-x-1">About Us</button></li>
                <li><button onClick={() => { setCurrentRoute(AppRoute.TEAM); window.scrollTo(0, 0); }} aria-label="Go to team page" className="hover:text-sky-400 transition-all hover:translate-x-1">Our Team</button></li>
                <li><button onClick={() => { setCurrentRoute(AppRoute.BLOG); window.scrollTo(0, 0); }} aria-label="Go to blog page" className="hover:text-sky-400 transition-all hover:translate-x-1">Blog</button></li>
                <li><button onClick={() => { setCurrentRoute(AppRoute.CONTACT); window.scrollTo(0, 0); }} aria-label="Go to contact page" className="hover:text-sky-400 transition-all hover:translate-x-1">Contact</button></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-black mb-4 uppercase tracking-wider text-xs text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Resources</h4>
              <ul className="space-y-2 text-white text-sm">
                <li><button onClick={() => { setCurrentRoute(AppRoute.PRICING); window.scrollTo(0, 0); }} aria-label="View pricing" className="hover:text-sky-400 transition-all hover:translate-x-1">Pricing</button></li>
                <li><button onClick={() => { setCurrentRoute(AppRoute.CASE_STUDIES); window.scrollTo(0, 0); }} aria-label="View case studies" className="hover:text-sky-400 transition-all hover:translate-x-1">Case Studies</button></li>
                <li><a href="mailto:nextgenseotool@gmail.com" className="hover:text-sky-400 transition-all hover:translate-x-1 cursor-pointer">Email Us</a></li>
                <li><a href="tel:+923480440402" className="hover:text-sky-400 transition-all hover:translate-x-1 cursor-pointer">Call Us</a></li>
                <li><a href="https://wa.me/923480440402" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-all hover:translate-x-1 cursor-pointer">WhatsApp</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-white text-xs font-semibold">
            <p className="text-center sm:text-left">© 2025 NextGen SEO. Masterminded by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Tayyab Mehmood</span></p>
            <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all">Privacy Policy</a>
          </div>
        </div>
      </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;

