import React, { useState } from 'react';

const LiveKeywordSearch: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const useCases = [
    {
      title: 'E-Commerce Store',
      icon: '🛍️',
      keywords: [
        { keyword: 'best running shoes', volume: '74.2K', difficulty: 'High', cpc: '$2.45' },
        { keyword: 'buy organic coffee online', volume: '12.8K', difficulty: 'Medium', cpc: '$1.85' },
        { keyword: 'affordable winter jackets', volume: '28.5K', difficulty: 'High', cpc: '$3.12' },
        { keyword: 'eco-friendly water bottles', volume: '8.9K', difficulty: 'Low', cpc: '$0.95' },
        { keyword: 'premium leather bags', volume: '35.2K', difficulty: 'High', cpc: '$2.85' },
        { keyword: 'sustainable fashion brands', volume: '19.4K', difficulty: 'Medium', cpc: '$1.65' },
      ]
    },
    {
      title: 'SaaS Product',
      icon: '💻',
      keywords: [
        { keyword: 'project management software', volume: '45.3K', difficulty: 'High', cpc: '$4.20' },
        { keyword: 'best CRM for small business', volume: '22.1K', difficulty: 'Medium', cpc: '$3.85' },
        { keyword: 'cloud storage solutions', volume: '31.7K', difficulty: 'High', cpc: '$5.10' },
        { keyword: 'team collaboration tools', volume: '15.4K', difficulty: 'Medium', cpc: '$2.75' },
        { keyword: 'HR management software', volume: '28.9K', difficulty: 'High', cpc: '$4.50' },
        { keyword: 'accounting software for startups', volume: '18.6K', difficulty: 'Medium', cpc: '$3.20' },
      ]
    },
    {
      title: 'Local Service Business',
      icon: '🏢',
      keywords: [
        { keyword: 'plumber near me', volume: '89.2K', difficulty: 'Medium', cpc: '$1.50' },
        { keyword: 'best dental clinic in [city]', volume: '18.6K', difficulty: 'Low', cpc: '$0.85' },
        { keyword: 'emergency locksmith services', volume: '42.3K', difficulty: 'Medium', cpc: '$2.20' },
        { keyword: 'affordable house cleaning', volume: '25.7K', difficulty: 'Low', cpc: '$1.10' },
        { keyword: 'professional electrician nearby', volume: '56.8K', difficulty: 'Medium', cpc: '$1.75' },
        { keyword: 'trusted HVAC repair services', volume: '32.1K', difficulty: 'Low', cpc: '$1.40' },
      ]
    },
  ];

  return (
    <div className="py-20 px-6 bg-gradient-to-r from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Live Keyword <span className="gradient-text">Explorer</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Real-time SEO keyword insights for different business types
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-12 flex-wrap justify-center">
          {useCases.map((useCase, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeTab === i
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'glass text-slate-300 hover:text-white hover:border-purple-500/50'
              }`}
            >
              <span className="text-xl">{useCase.icon}</span>
              {useCase.title}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-scroll-keywords">
            {/* First set */}
            {useCases[activeTab].keywords.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 glass rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 hover:scale-105 transition-all cursor-pointer group"
              >
                <div className="mb-4">
                  <h4 className="font-bold text-lg group-hover:text-purple-400 transition-colors line-clamp-2 mb-3">
                    {item.keyword}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className={`text-xs font-black px-3 py-1 rounded-lg ${
                      item.difficulty === 'High' ? 'bg-red-500/20 text-red-400' :
                      item.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {item.difficulty}
                    </div>
                    <div className="text-xs font-black px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400">
                      CPC: {item.cpc}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Monthly Searches</span>
                    <span className="font-bold text-purple-400">{item.volume}</span>
                  </div>
                  <div className="w-full bg-slate-900/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${Math.min(parseInt(item.volume) / 1000, 100)}%` }}
                    />
                  </div>
                </div>

                <button className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/40 hover:to-pink-500/40 text-sm font-bold text-purple-400 transition-all group-hover:text-white">
                  Analyze Keyword →
                </button>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {useCases[activeTab].keywords.map((item, i) => (
              <div
                key={`duplicate-${i}`}
                className="flex-shrink-0 w-72 glass rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 hover:scale-105 transition-all cursor-pointer group"
              >
                <div className="mb-4">
                  <h4 className="font-bold text-lg group-hover:text-purple-400 transition-colors line-clamp-2 mb-3">
                    {item.keyword}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className={`text-xs font-black px-3 py-1 rounded-lg ${
                      item.difficulty === 'High' ? 'bg-red-500/20 text-red-400' :
                      item.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {item.difficulty}
                    </div>
                    <div className="text-xs font-black px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400">
                      CPC: {item.cpc}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Monthly Searches</span>
                    <span className="font-bold text-purple-400">{item.volume}</span>
                  </div>
                  <div className="w-full bg-slate-900/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${Math.min(parseInt(item.volume) / 1000, 100)}%` }}
                    />
                  </div>
                </div>

                <button className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/40 hover:to-pink-500/40 text-sm font-bold text-purple-400 transition-all group-hover:text-white">
                  Analyze Keyword →
                </button>
              </div>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
        </div>

        {/* Pro Tip */}
        <div className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-bold mb-2">Pro Tip</h4>
              <p className="text-sm text-slate-300">
                Focus on keywords with high search volume but medium difficulty for faster ranking wins. Long-tail variations often have lower competition and higher conversion rates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-keywords {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-keywords {
          animation: scroll-keywords 40s linear infinite;
        }

        .animate-scroll-keywords:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LiveKeywordSearch;
