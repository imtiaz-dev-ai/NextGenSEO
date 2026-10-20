
import React, { useState } from 'react';
import { generateKeywords } from '../services/gemini';
import { KeywordRecommendation } from '../types';

const KeywordExplorer: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<KeywordRecommendation[]>([]);

  const handleSearch = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const data = await generateKeywords(topic);
      setKeywords(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Semantic <span className="text-sky-400">Keyword</span> Discovery</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Unlock hidden search opportunities by exploring semantically related keywords and user intent clusters.
        </p>
      </div>

      <div className="flex gap-2 max-w-2xl mx-auto mb-12">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a broad topic or seed keyword..."
          className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !topic}
          className="bg-sky-500 hover:bg-sky-600 px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap"
        >
          {loading ? 'Analyzing...' : 'Explore'}
        </button>
      </div>

      {keywords.length > 0 && (
        <div className="glass overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-widest font-semibold">
                <th className="px-6 py-4">Keyword</th>
                <th className="px-6 py-4">Search Volume</th>
                <th className="px-6 py-4">Difficulty</th>
                <th className="px-6 py-4">Intent</th>
                <th className="px-6 py-4">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {keywords.map((k, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-100 group-hover:text-sky-400 transition-colors">{k.keyword}</td>
                  <td className="px-6 py-4 text-slate-400">{k.volume}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${k.difficulty > 70 ? 'bg-rose-500' : k.difficulty > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${k.difficulty}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono">{k.difficulty}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-slate-800 text-slate-300 border border-white/5">
                      {k.intent}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-sm ${
                      k.trend === 'Up' ? 'text-emerald-400' : k.trend === 'Down' ? 'text-rose-400' : 'text-slate-400'
                    }`}>
                      {k.trend === 'Up' ? '↑' : k.trend === 'Down' ? '↓' : '→'}
                      {k.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default KeywordExplorer;
