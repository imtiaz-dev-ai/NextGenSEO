import React from 'react';

const DashboardPreview: React.FC = () => {
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
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-black uppercase text-purple-400">Organic Traffic</div>
                <div className="text-xs font-bold text-green-400">↑ 342%</div>
              </div>
              <div className="text-4xl font-black mb-2">127.5K</div>
              <div className="text-xs text-slate-400">Monthly visitors</div>
              <div className="mt-4 h-16 flex items-end gap-1">
                {[40, 55, 45, 70, 65, 85, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-black uppercase text-cyan-400">Keywords Ranked</div>
                <div className="text-xs font-bold text-green-400">↑ 89</div>
              </div>
              <div className="text-4xl font-black mb-2">1,247</div>
              <div className="text-xs text-slate-400">Top 10 positions</div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <div className="flex-1 h-2 bg-cyan-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <div className="text-xs font-bold text-cyan-400">85%</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="flex-1 h-2 bg-blue-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '72%' }} />
                  </div>
                  <div className="text-xs font-bold text-blue-400">72%</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-black uppercase text-emerald-400">Domain Authority</div>
                <div className="text-xs font-bold text-green-400">↑ 12</div>
              </div>
              <div className="text-4xl font-black mb-2">72/100</div>
              <div className="text-xs text-slate-400">Industry leader</div>
              <div className="mt-4">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="75.36" strokeLinecap="round" />
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
            <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-black mb-4">Top Performing Pages</h3>
              <div className="space-y-3">
                {[
                  { page: 'https://www.hubspot.com/', views: '12.4K', ctr: '8.2%' },
                  { page: 'https://stripe.com/', views: '9.8K', ctr: '6.7%' },
                  { page: 'https://webflow.com/', views: '7.2K', ctr: '5.4%' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-200">{p.page}</div>
                      <div className="text-xs text-slate-500">{p.views} views</div>
                    </div>
                    <div className="text-sm font-black text-purple-400">{p.ctr}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-black mb-4">Recent Backlinks</h3>
              <div className="space-y-3">
                {[
                  { domain: 'https://www.hubspot.com/', da: '95', type: 'Editorial' },
                  { domain: 'https://stripe.com/', da: '94', type: 'Guest Post' },
                  { domain: 'https://webflow.com/', da: '92', type: 'Interview' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-200">{b.domain}</div>
                      <div className="text-xs text-slate-500">{b.type}</div>
                    </div>
                    <div className="text-sm font-black text-cyan-400">DA {b.da}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
