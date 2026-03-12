import React from 'react';
import { HiOutlineCpuChip, HiOutlineChartBar, HiOutlineLink, HiOutlineCog, HiOutlineMagnifyingGlass, HiOutlinePencil, HiOutlineTag, HiOutlineShieldCheck, HiOutlineArrowRight } from 'react-icons/hi2';

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
  ];

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6">
            Our <span className="gradient-text">SEO Services</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Comprehensive SEO solutions powered by AI and 10+ years of expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative glass p-8 rounded-3xl hover-lift cursor-pointer overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {service.icon}
                </div>

                <h3 className="text-2xl font-black mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                  {service.title}
                </h3>

                <p className="text-slate-400 mb-6 leading-relaxed">
                  {service.desc}
                </p>

                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${service.gradient} bg-opacity-10 border border-white/10`}>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-white/50 animate-pulse" />
                  <span className="text-xs font-black uppercase">{service.stats}</span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <HiOutlineArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveServices;
