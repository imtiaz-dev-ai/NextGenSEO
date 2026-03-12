import React, { useState } from 'react';

const LiveKeywordSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{ keyword: string; volume: string; difficulty: string }>>([]);

  const mockKeywords = [
    { keyword: 'seo services', volume: '49.5K', difficulty: 'High' },
    { keyword: 'seo agency', volume: '33.1K', difficulty: 'High' },
    { keyword: 'technical seo', volume: '22.2K', difficulty: 'Medium' },
    { keyword: 'keyword research', volume: '18.1K', difficulty: 'Medium' },
    { keyword: 'link building', volume: '14.8K', difficulty: 'Medium' },
    { keyword: 'on page seo', volume: '12.1K', difficulty: 'Low' },
    { keyword: 'seo optimization', volume: '27.3K', difficulty: 'High' },
    { keyword: 'local seo', volume: '9.9K', difficulty: 'Low' },
  ];

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      const filtered = mockKeywords.filter(k => 
        k.keyword.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="glass p-8 rounded-3xl max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-black">Live Keyword Explorer</h3>
          <p className="text-xs text-slate-400">Real-time SEO keyword insights</p>
        </div>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search keywords... (e.g., 'seo')"
          className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 pl-12 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
        />
        <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {results.length > 0 && (
        <div className="space-y-2 animate-in fade-in">
          {results.map((r, i) => (
            <div key={i} className="bg-slate-900/30 border border-white/5 rounded-xl p-4 hover:border-purple-500/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="font-bold text-sm group-hover:text-purple-400 transition-colors">{r.keyword}</div>
                  <div className="text-xs text-slate-500 mt-1">Monthly searches: {r.volume}</div>
                </div>
                <div className={`text-xs font-black px-3 py-1 rounded-lg ${
                  r.difficulty === 'High' ? 'bg-red-500/20 text-red-400' :
                  r.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {r.difficulty}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {query.length > 0 && results.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm">
          No keywords found. Try different terms.
        </div>
      )}
    </div>
  );
};

export default LiveKeywordSearch;
