import React, { useState } from 'react';
import { HiOutlineLink, HiOutlineChartBar, HiOutlineStar } from 'react-icons/hi2';

const LinkBuildingServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      title: 'High Authority Backlinks',
      icon: <HiOutlineLink className="w-6 h-6" />,
      items: [
        'High Authority Backlinks',
        'Guest Posting Outreach',
        'Manual White Hat Links',
        'Niche Relevant Links',
        'Premium Blogger Outreach',
        'Brand Authority Building',
        'Google Friendly Strategy',
        'Natural Link Growth',
      ]
    },
    {
      title: 'DR & Traffic Based Sites',
      icon: <HiOutlineChartBar className="w-6 h-6" />,
      items: [
        'DR & Traffic Based Sites',
        'Contextual Link Placement',
        'SEO Safe Link Building',
        'DoFollow Backlinks',
        'High Authority Backlinks',
        'Guest Posting Outreach',
        'Manual White Hat Links',
        'Niche Relevant Links',
      ]
    },
    {
      title: 'Premium Link Building',
      icon: <HiOutlineStar className="w-6 h-6" />,
      items: [
        'Premium Blogger Outreach',
        'Brand Authority Building',
        'Google Friendly Strategy',
        'Natural Link Growth',
        'Contextual Link Placement',
        'DR & Traffic Based Sites',
        'SEO Safe Link Building',
        'DoFollow Backlinks',
      ]
    },
  ];

  return (
    <div className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Explore More <span className="gradient-text">Link Building Services</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Professional white-hat link building strategies for maximum SEO impact
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-12 flex-wrap justify-center">
          {services.map((service, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeTab === i
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-lg shadow-cyan-400/30'
                  : 'glass text-slate-300 hover:text-white hover:border-cyan-400/50'
              }`}
            >
              <span className="text-xl flex items-center">{service.icon}</span>
              {service.title}
            </button>
          ))}
        </div>
      </div>

      {/* Service Rows */}
      <div className="space-y-0">
        {/* Row 1 */}
        <div className="relative overflow-hidden w-full">
          <div className="flex gap-4 animate-scroll-services p-6">
            {services[activeTab].items.slice(0, 4).map((item, i) => (
              <div key={i} className="flex-shrink-0 px-6 py-4 glass rounded-xl hover:border-cyan-400/50 transition-all cursor-pointer group min-w-max">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="font-bold text-slate-200 text-sm">{item}</span>
                </div>
              </div>
            ))}
            {services[activeTab].items.slice(0, 4).map((item, i) => (
              <div key={`dup1-${i}`} className="flex-shrink-0 px-6 py-4 glass rounded-xl hover:border-cyan-400/50 transition-all cursor-pointer group min-w-max">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="font-bold text-slate-200 text-sm">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative overflow-hidden w-full py-6">
          <div className="flex gap-4 animate-scroll-services-reverse">
            {/* First set */}
            {services[activeTab].items.slice(4, 8).map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer group min-w-max"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="font-bold text-white text-sm">{item}</span>
                </div>
              </div>
            ))}
            
            {/* Duplicate set */}
            {services[activeTab].items.slice(4, 8).map((item, i) => (
              <div
                key={`dup2-${i}`}
                className="flex-shrink-0 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer group min-w-max"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="font-bold text-white text-sm">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="relative overflow-hidden w-full">
          <div className="flex gap-4 animate-scroll-services p-6">
            {services[activeTab].items.slice(0, 4).map((item, i) => (
              <div key={i} className="flex-shrink-0 px-6 py-4 glass rounded-xl hover:border-cyan-400/50 transition-all cursor-pointer group min-w-max">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="font-bold text-slate-200 text-sm">{item}</span>
                </div>
              </div>
            ))}
            {services[activeTab].items.slice(0, 4).map((item, i) => (
              <div key={`dup3-${i}`} className="flex-shrink-0 px-6 py-4 glass rounded-xl hover:border-cyan-400/50 transition-all cursor-pointer group min-w-max">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="font-bold text-slate-200 text-sm">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-services {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-services-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-services {
          animation: scroll-services 12s linear infinite;
        }

        .animate-scroll-services:hover {
          animation-play-state: paused;
        }

        .animate-scroll-services-reverse {
          animation: scroll-services-reverse 12s linear infinite;
        }

        .animate-scroll-services-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LinkBuildingServices;
