
import React, { useState } from 'react';
import { performSEOAudit } from '../services/gemini';
import { AuditResult } from '../types';

const AuditTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleAudit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const data = await performSEOAudit(input);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold mb-4 text-center">AI Content <span className="text-sky-400">Audit</span></h2>
      <p className="text-slate-400 text-center mb-10 max-w-2xl mx-auto">
        Paste your landing page copy or blog draft below. Our AI will analyze your SEO performance, readability, and provide actionable fixes.
      </p>

      <div className="glass p-6 rounded-2xl mb-12">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your content here (min. 50 words recommended)..."
          className="w-full h-48 bg-slate-900/50 border border-white/10 rounded-xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAudit}
            disabled={loading || !input}
            className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              'Run Audit'
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl text-center">
              <div className="text-4xl font-bold text-sky-400 mb-1">{result.score}/100</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider font-semibold">SEO Health</div>
            </div>
            <div className="glass p-6 rounded-2xl text-center">
              <div className="text-2xl font-bold text-slate-100 mb-1">{result.readability}</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Readability</div>
            </div>
            <div className="glass p-6 rounded-2xl text-center">
              <div className="text-2xl font-bold text-slate-100 mb-1">{result.tone}</div>
              <div className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Tone of Voice</div>
            </div>
          </div>

          <div className="glass p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-sky-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Critical Improvements
            </h3>
            <div className="space-y-4">
              {result.suggestions.map((s, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <span className={`shrink-0 w-2 h-2 rounded-full mt-2 ${
                    s.priority === 'High' ? 'bg-rose-500 shadow-rose-500/50' : 
                    s.priority === 'Medium' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-emerald-500 shadow-emerald-500/50'
                  }`} />
                  <div>
                    <div className="font-bold text-slate-100 mb-1">{s.title}</div>
                    <p className="text-slate-400 text-sm">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditTool;
