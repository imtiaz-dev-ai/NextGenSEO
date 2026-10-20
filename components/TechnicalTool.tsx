
import React, { useState } from 'react';
import { analyzeTechnicalSEO } from '../services/gemini';
import { TechnicalSEOAudit } from '../types';

const TechnicalTool: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [issues, setIssues] = useState<TechnicalSEOAudit[]>([]);

  const handleAudit = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeTechnicalSEO(domain);
      setIssues(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-4">Technical <span className="text-sky-400">SEO</span> Scanner</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Analyze crawlability, security, and site architecture issues using Gemini's advanced semantic logic.
        </p>
      </div>

      <div className="glass p-8 rounded-3xl mb-12 border-sky-500/10">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter website URL or description..."
            className="flex-1 bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          />
          <button
            onClick={handleAudit}
            disabled={loading || !domain}
            className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-sky-500/20"
          >
            {loading ? 'Scanning Infrastructure...' : 'Scan Domain'}
          </button>
        </div>
      </div>

      {issues.length > 0 && (
        <div className="space-y-4">
          {issues.map((issue, idx) => (
            <div key={idx} className="glass p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-6 items-start">
              <div className={`shrink-0 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest ${
                issue.status === 'Critical' ? 'bg-rose-500/20 text-rose-500' : 
                issue.status === 'Warning' ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'
              }`}>
                {issue.status}
              </div>
              <div className="flex-1">
                <div className="text-slate-400 text-xs font-bold uppercase mb-1">{issue.area}</div>
                <h4 className="text-xl font-bold text-slate-100 mb-2">{issue.issue}</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{issue.solution}</p>
                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold hover:underline cursor-pointer">
                  How to fix this →
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechnicalTool;
