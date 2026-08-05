import React, { useRef } from 'react';
import { HiOutlineCpuChip, HiOutlineChartBar, HiOutlineLink, HiOutlineCog, HiOutlineMagnifyingGlass, HiOutlinePencil, HiOutlineTag, HiOutlineShieldCheck, HiOutlineArrowRight, HiOutlineMapPin, HiOutlineClipboardDocumentList } from 'react-icons/hi2';

const Card3D: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(10px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0) scale(1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: 'transform 0.15s ease-out', willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

const InteractiveServices: React.FC = () => {
  const services = [
    {
      icon: <HiOutlineCpuChip className="w-8 h-8" />,
      title: 'AI-Powered SEO Analysis',
      desc: 'Leverage cutting-edge AI for deep semantic analysis, advanced keyword research, competitor SEO intelligence, and predictive insights for professional SEO optimization worldwide.',
      gradient: 'from-purple-500 to-pink-500',
      stats: 'AI-Driven',
    },
    {
      icon: <HiOutlineChartBar className="w-8 h-8" />,
      title: 'Real-Time SEO Reporting',
      desc: 'Live dashboards with keyword rankings, organic traffic analytics, Google Search Console integration, and actionable SEO metrics updated daily for maximum visibility.',
      gradient: 'from-cyan-500 to-blue-500',
      stats: 'Live Data',
    },
    {
      icon: <HiOutlineLink className="w-8 h-8" />,
      title: 'Premium Link Building',
      desc: 'Professional white-hat link building and high-quality backlink acquisition from 10,000+ authority sites. Domain authority growth through ethical link building strategies.',
      gradient: 'from-emerald-500 to-teal-500',
      stats: '10K+ Sites',
    },
    {
      icon: <HiOutlineCog className="w-8 h-8" />,
      title: 'Technical SEO Excellence',
      desc: 'Core Web Vitals optimization, schema markup implementation, XML sitemap management, crawl budget optimization, and mobile responsiveness for maximum search engine visibility.',
      gradient: 'from-orange-500 to-red-500',
      stats: '99/100 Score',
    },
    {
      icon: <HiOutlineMagnifyingGlass className="w-8 h-8" />,
      title: 'Competitor SEO Intelligence',
      desc: 'Reverse-engineer competitor SEO strategies, analyze keyword positions, examine backlink profiles, and identify organic search market gaps for competitive advantage.',
      gradient: 'from-violet-500 to-purple-500',
      stats: 'Deep Analysis',
    },
    {
      icon: <HiOutlinePencil className="w-8 h-8" />,
      title: 'SEO Content Strategy',
      desc: 'AI-assisted on-page SEO content creation, topic clustering, semantic keyword optimization, and content marketing strategies that rank on Google and convert customers.',
      gradient: 'from-pink-500 to-rose-500',
      stats: 'AI Content',
    },
    {
      icon: <HiOutlineTag className="w-8 h-8" />,
      title: 'Advanced Keyword Research',
      desc: 'Semantic keyword mapping, search intent analysis, long-tail keyword discovery, keyword clustering, and trend forecasting for high-converting organic search traffic.',
      gradient: 'from-blue-500 to-indigo-500',
      stats: 'Smart Research',
    },
    {
      icon: <HiOutlineShieldCheck className="w-8 h-8" />,
      title: 'White-Hat SEO Only',
      desc: '100% ethical search engine optimization practices. No black-hat techniques, no spam, no penalties. Sustainable organic growth through Google-approved strategies.',
      gradient: 'from-green-500 to-emerald-500',
      stats: '100% Ethical',
    },
    {
      icon: <HiOutlineMapPin className="w-8 h-8" />,
      title: 'Local SEO Mastery',
      desc: 'Google Business Profile optimization, local citation building, location-based keyword targeting, and map pack domination for maximum local search visibility.',
      gradient: 'from-amber-500 to-orange-500',
      stats: 'Local Dominance',
    },
    {
      icon: <HiOutlineClipboardDocumentList className="w-8 h-8" />,
      title: 'Complete SEO Audit',
      desc: 'In-depth website SEO audit covering on-page issues, technical errors, backlink profile analysis, Core Web Vitals, duplicate content, and a prioritized action plan for rapid ranking improvements.',
      gradient: 'from-sky-500 to-cyan-500',
      stats: '200+ Checks',
    },
  ];

  return (
    <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
            Our <span className="gradient-text">SEO Services</span>
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-slate-400 max-w-2xl mx-auto">
            Comprehensive SEO solutions powered by AI and 10+ years of expertise
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {services.map((service, i) => (
            <Card3D
              key={i}
              className="group relative glass shine-3d glow-border-3d p-3 sm:p-6 md:p-8 rounded-xl sm:rounded-3xl cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-9 h-9 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-2 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 icon-3d shadow-3d`}>
                  <span className="scale-75 sm:scale-100">{service.icon}</span>
                </div>

                <h3 className="text-xs sm:text-xl md:text-2xl font-black mb-1 sm:mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                  {service.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm mb-2 sm:mb-6 leading-relaxed hidden sm:block">
                  {service.desc}
                </p>

                <div className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-xl bg-gradient-to-r ${service.gradient} bg-opacity-10 border border-white/10`}>
                  <div className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-[9px] sm:text-xs font-black uppercase">{service.stats}</span>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveServices;
