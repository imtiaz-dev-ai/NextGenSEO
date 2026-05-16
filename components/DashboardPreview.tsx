import React, { useEffect, useState } from 'react';

const AnimatedCounter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCount(Math.floor(end * progress));
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [end, duration]);

  return <>{count}{suffix}</>;
};

const DashboardPreview: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6">
            Real-Time <span className="gradient-text">SEO Dashboard</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Track your rankings, traffic, and conversions in one powerful interface
          </p>
        </div>

        <div className="glass p-8 rounded-[3rem] border-purple-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Organic Traffic Card */}
            <div className={`bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20 group cursor-pointer`}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-black uppercase text-purple-400 group-hover:text-purple-300 transition-colors">Organic Traffic</div>
                <div className="text-xs font-bold text-green-400 animate-pulse">↑ 342%</div>
              </div>
              <div className="text-4xl font-black mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
                <AnimatedCounter end={127500} suffix="K" duration={2500} />
              </div>
              <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Monthly visitors</div>
              <div className="mt-4 h-16 flex items-end gap-1">
                {[40, 55, 45, 70, 65, 85, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t transition-all duration-500 hover:opacity-80" style={{ height: `${h}%`, animation: isVisible ? `slideUp 0.6s ease-out ${i * 80}ms forwards` : 'none', opacity: 0 }} />
                ))}
              </div>
            </div>

            {/* Keywords Ranked Card */}
            <div className={`bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/20 group cursor-pointer`} style={{ transitionDelay: '100ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-black uppercase text-cyan-400 group-hover:text-cyan-300 transition-colors">Keywords Ranked</div>
                <div className="text-xs font-bold text-green-400 animate-pulse">↑ 89</div>
              </div>
              <div className="text-4xl font-black mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-300 transition-all">
                <AnimatedCounter end={1247} duration={2500} />
              </div>
              <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Top 10 positions</div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 group/bar">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover/bar:scale-125 transition-transform" />
                  <div className="flex-1 h-2 bg-cyan-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full transition-all duration-1000" style={{ width: isVisible ? '85%' : '0%' }} />
                  </div>
                  <div className="text-xs font-bold text-cyan-400">85%</div>
                </div>
                <div className="flex items-center gap-2 group/bar">
                  <div className="w-2 h-2 rounded-full bg-blue-500 group-hover/bar:scale-125 transition-transform" />
                  <div className="flex-1 h-2 bg-blue-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: isVisible ? '72%' : '0%', transitionDelay: '200ms' }} />
                  </div>
                  <div className="text-xs font-bold text-blue-400">72%</div>
                </div>
              </div>
            </div>

            {/* Domain Authority Card */}
            <div className={`bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/20 group cursor-pointer`} style={{ transitionDelay: '200ms' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-black uppercase text-emerald-400 group-hover:text-emerald-300 transition-colors">Domain Authority</div>
                <div className="text-xs font-bold text-green-400 animate-pulse">↑ 12</div>
              </div>
              <div className="text-4xl font-black mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-300 group-hover:to-teal-300 transition-all">
                <AnimatedCounter end={72} suffix="/100" duration={2500} />
              </div>
              <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">Industry leader</div>
              <div className="mt-4">
                <div className="relative w-24 h-24 mx-auto group-hover:scale-110 transition-transform">
                  <svg className="transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="8" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="none" 
                      stroke="url(#gradient)" 
                      strokeWidth="8" 
                      strokeDasharray="251.2" 
                      strokeDashoffset={isVisible ? '75.36' : '251.2'}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 2.5s ease-out' }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#14b8a6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-emerald-400">72</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performing Pages */}
            <div className={`bg-slate-900/30 border border-white/5 rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} hover:border-white/10 hover:bg-slate-900/50`} style={{ transitionDelay: '300ms' }}>
              <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                Top Performing Pages
              </h3>
              <div className="space-y-3">
                {[
                  { page: 'https://www.hubspot.com/', views: '12.4K', ctr: '8.2%' },
                  { page: 'https://stripe.com/', views: '9.8K', ctr: '6.7%' },
                  { page: 'https://webflow.com/', views: '7.2K', ctr: '5.4%' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-3 px-3 border-b border-white/5 last:border-0 rounded-lg hover:bg-white/5 transition-all group cursor-pointer" style={{ animation: isVisible ? `slideIn 0.5s ease-out ${400 + i * 100}ms forwards` : 'none', opacity: 0 }}>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{p.page}</div>
                      <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{p.views} views</div>
                    </div>
                    <div className="text-sm font-black text-purple-400 group-hover:text-purple-300 transition-colors">{p.ctr}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Backlinks */}
            <div className={`bg-slate-900/30 border border-white/5 rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} hover:border-white/10 hover:bg-slate-900/50`} style={{ transitionDelay: '400ms' }}>
              <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full" />
                Recent Backlinks
              </h3>
              <div className="space-y-3">
                {[
                  { domain: 'https://www.hubspot.com/', da: '95', type: 'Editorial' },
                  { domain: 'https://stripe.com/', da: '94', type: 'Guest Post' },
                  { domain: 'https://webflow.com/', da: '92', type: 'Interview' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center justify-between py-3 px-3 border-b border-white/5 last:border-0 rounded-lg hover:bg-white/5 transition-all group cursor-pointer" style={{ animation: isVisible ? `slideIn 0.5s ease-out ${500 + i * 100}ms forwards` : 'none', opacity: 0 }}>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{b.domain}</div>
                      <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">{b.type}</div>
                    </div>
                    <div className="text-sm font-black text-cyan-400 group-hover:text-cyan-300 transition-colors">DA {b.da}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            height: 0;
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPreview;
