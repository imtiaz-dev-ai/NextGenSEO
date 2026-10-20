
import React, { useState } from 'react';
import { analyzeOffPage } from '../services/gemini';
import { OffPageStrategy } from '../types';

const OffPageTool: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<OffPageStrategy | null>(null);

  const handleRun = async () => {
    if (!niche.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeOffPage(niche);
      setStrategy(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4">Off-Page & <span className="text-sky-400">Guest Post</span> Engine</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Discover high-authority backlink opportunities and guest post strategies tailored to your niche.
        </p>
      </div>

      <div className="glass p-8 rounded-3xl mb-12 border-sky-500/10">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g., 'SaaS Digital Marketing' or 'Eco-friendly Fashion'"
            className="flex-1 bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          />
          <button
            onClick={handleRun}
            disabled={loading || !niche}
            className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-sky-500/20"
          >
            {loading ? 'Finding Gems...' : 'Get Strategy'}
          </button>
        </div>
      </div>

      {strategy && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 text-sky-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.101-1.101" />
              </svg>
              Link Building Ideas
            </h3>
            <ul className="space-y-4">
              {strategy.backlinkIdeas.map((idea, i) => (
                <li key={i} className="flex gap-3 text-slate-300">
                  <span className="text-sky-500 font-bold">•</span>
                  {idea}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 text-indigo-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Guest Post Targets
            </h3>
            <div className="space-y-4">
              {strategy.guestPostOpportunities.map((op, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-100">{op.siteType}</span>
                    <span className="text-[10px] px-2 py-1 bg-sky-500/20 text-sky-400 rounded-full font-bold uppercase">{op.authority}</span>
                  </div>
                  <p className="text-sm text-slate-400 italic">"Pitch: {op.pitchAngle}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffPageTool;
