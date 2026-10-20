
import React, { useState } from 'react';
import { compareCompetitors } from '../services/gemini';
import { CompetitorComparison } from '../types';

const CompetitorTool: React.FC = () => {
  const [mine, setMine] = useState('');
  const [theirs, setTheirs] = useState('');
  const [loading, setLoading] = useState(false);
  const [comparisons, setComparisons] = useState<CompetitorComparison[]>([]);

  const handleRun = async () => {
    if (!mine.trim() || !theirs.trim()) return;
    setLoading(true);
    try {
      const data = await compareCompetitors(mine, theirs);
      setComparisons(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4">Competitor <span className="text-sky-400">Intelligence</span> Lab</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Uncover the strategic gap between you and your top rivals. Analyze metrics and capture market share.
        </p>
      </div>

      <div className="glass p-8 rounded-3xl mb-12 border-sky-500/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            value={mine}
            onChange={(e) => setMine(e.target.value)}
            placeholder="Your Domain (e.g., mysite.com)"
            className="bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          />
          <input
            type="text"
            value={theirs}
            onChange={(e) => setTheirs(e.target.value)}
            placeholder="Competitor Domain (e.g., rival.com)"
            className="bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleRun}
            disabled={loading || !mine || !theirs}
            className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 px-12 py-4 rounded-2xl font-black transition-all shadow-xl shadow-sky-500/20"
          >
            {loading ? 'Mining Insights...' : 'Compare Performance'}
          </button>
        </div>
      </div>

      {comparisons.length > 0 && (
        <div className="grid grid-cols-1 gap-6 animate-in slide-in-from-bottom-8 duration-700">
          {comparisons.map((c, idx) => (
            <div key={idx} className="glass p-6 rounded-3xl border border-white/5 flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-48 text-center lg:text-left">
                <div className="text-xs font-bold text-slate-500 uppercase mb-1">{c.metric}</div>
                <div className={`text-sm font-black px-2 py-1 rounded-lg inline-block ${
                  c.advantage === 'You' ? 'bg-emerald-500/20 text-emerald-400' :
                  c.advantage === 'Competitor' ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-700 text-slate-300'
                }`}>
                  Advantage: {c.advantage}
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-8 w-full">
                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">You</div>
                  <div className="text-xl font-black text-slate-100">{c.you}</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Them</div>
                  <div className="text-xl font-black text-slate-100">{c.competitor}</div>
                </div>
              </div>
              <div className="w-full lg:w-72">
                <div className="text-xs font-bold text-sky-400 mb-2 uppercase">Recommendation</div>
                <p className="text-xs text-slate-400 leading-relaxed">{c.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompetitorTool;
