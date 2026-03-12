import React, { useState } from 'react';

interface ComparisonData {
  metric: string;
  before: string | number;
  after: string | number;
  improvement: string;
}

const comparisonData: ComparisonData[] = [
  { metric: "Organic Traffic", before: "2,500", after: "13,750", improvement: "+450%" },
  { metric: "Keyword Rankings", before: "45", after: "325", improvement: "+622%" },
  { metric: "Domain Authority", before: "28", after: "67", improvement: "+139%" },
  { metric: "Backlinks", before: "180", after: "2,400", improvement: "+1,233%" },
  { metric: "Page Speed", before: "3.2s", after: "0.8s", improvement: "+75%" },
  { metric: "Conversion Rate", before: "1.2%", after: "4.8%", improvement: "+300%" }
];

const BeforeAfter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');

  return (
    <div className="py-16 sm:py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 px-0">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6">
            The <span className="gradient-text">Transformation</span> - Real SEO Results
          </h2>
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed">Real metrics from a proven 6-month professional SEO optimization campaign with keyword ranking improvements and organic traffic growth</p>
        </div>

        <div className="glass p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-[3rem] border-purple-500/20">
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
            <button
              onClick={() => setActiveTab('before')}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-2xl font-black text-xs sm:text-base md:text-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'before' 
                  ? 'bg-red-500/20 text-red-400 border-2 border-red-500' 
                  : 'glass text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Before Optimization
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-2xl font-black text-xs sm:text-base md:text-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'after' 
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-2 border-purple-500' 
                  : 'glass text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              After SEO Service
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
            {comparisonData.map((item, i) => (
              <div key={i} className="glass p-4 sm:p-6 rounded-lg sm:rounded-2xl border-white/5 relative overflow-hidden group hover-lift">
                <div className={`absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 rounded-full blur-2xl transition-all ${
                  activeTab === 'before' ? 'bg-red-500/10 group-hover:bg-red-500/20' : 'bg-purple-500/10 group-hover:bg-purple-500/20'
                }`} />
                <div className="relative z-10">
                  <div className="text-slate-500 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 sm:mb-4">
                    {item.metric}
                  </div>
                  <div className="flex items-end gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className={`text-2xl sm:text-3xl md:text-4xl font-black transition-all ${
                      activeTab === 'before' ? 'text-red-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                    }`}>
                      {activeTab === 'before' ? item.before : item.after}
                    </div>
                    {activeTab === 'after' && (
                      <div className="text-purple-400 font-black text-[10px] sm:text-xs">
                        {item.improvement}
                      </div>
                    )}
                  </div>
                  <div className="h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        activeTab === 'before' ? 'bg-red-500 w-1/4' : 'bg-gradient-to-r from-purple-500 to-pink-500 w-full'
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm mb-6">
              {activeTab === 'before' 
                ? "Struggling with low visibility and minimal organic growth" 
                : "Dominating search results with sustainable, long-term growth"}
            </p>
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-black text-sm ${
              activeTab === 'before' 
                ? 'bg-red-500/10 text-red-400' 
                : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30'
            }`}>
              {activeTab === 'before' ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                  Typical DIY Results
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  NextGen SEO Results
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
