import React, { useState } from 'react';
import { HiOutlineLink, HiOutlineChartBar, HiOutlineStar } from 'react-icons/hi2';

const LinkBuildingServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      title: 'High Authority Backlinks',
      icon: <HiOutlineLink className="w-6 h-6" />,
      items: [
        'Editorial placements',
        'Relevant publisher outreach',
        'Manual prospecting',
        'Niche-aligned mentions',
        'Publisher quality checks',
        'Unlinked brand mention recovery',
        'Natural link acquisition',
        'Campaign reporting',
      ]
    },
    {
      title: 'DR & Traffic Based Sites',
      icon: <HiOutlineChartBar className="w-6 h-6" />,
      items: [
        'Organic traffic review',
        'Audience and niche fit',
        'Domain rating checks',
        'Contextual placements',
        'Followed link options',
        'Publisher traffic checks',
        'Editorial standards',
        'Transparent site metrics',
      ]
    },
    {
      title: 'Premium Link Building',
      icon: <HiOutlineStar className="w-6 h-6" />,
      items: [
        'Expert commentary outreach',
        'Digital PR campaigns',
        'Resource page placements',
        'Broken link reclamation',
        'Competitor gap review',
        'Content-led campaigns',
        'Industry publication features',
        'Monthly placement reports',
      ]
    },
  ];

  return (
    <div className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">
            Explore More <span className="gradient-text">Link Building Services</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base">
            Earn relevant mentions from trusted sites to build authority and attract qualified visitors.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mt-8 sm:mt-12 flex-wrap justify-center">
          {services.map((service, i) => (
            <button
              key={i}
              type="button"
              aria-pressed={activeTab === i}
              onClick={() => setActiveTab(i)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all flex items-center gap-2 text-xs sm:text-sm ${
                activeTab === i
                  ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-white shadow-lg shadow-cyan-400/30'
                  : 'glass text-slate-300 hover:text-white hover:border-cyan-400/50'
              }`}
            >
              <span className="flex items-center">{service.icon}</span>
              <span className="hidden sm:inline">{service.title}</span>
              <span className="sm:hidden">{service.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto px-4 sm:px-6">
        {services[activeTab].items.map((item) => (
          <li key={item} className="glass px-5 py-4 rounded-xl border border-white/10 flex items-center gap-3 text-slate-200 text-sm font-semibold">
            <svg className="w-5 h-5 text-cyan-400 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkBuildingServices;
