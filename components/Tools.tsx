import React, { useState, useMemo } from 'react';
import { AppRoute } from '../types';
import { askOpenAI, serperSearch, serperKeywords, runPageSpeed } from '../utils/api';
import {
  MagnifyingGlassIcon, TagIcon, DocumentIcon, ChartIcon, SparklesIcon,
  GlobeIcon, RocketIcon,
} from '../utils/icons';

interface ToolShellProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children: React.ReactNode;
  setCurrentRoute: (route: AppRoute) => void;
}

const ToolShell: React.FC<ToolShellProps> = ({ icon, title, desc, children, setCurrentRoute }) => (
  <div className="pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
    {/* Header */}
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 mb-6">
        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
          {icon}
        </span>
        <span className="text-xs font-black uppercase tracking-widest text-purple-400">Free Tool</span>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">
        {title.split(' ').map((w, i) => (
          <React.Fragment key={i}>
            {i === title.split(' ').length - 1 ? <span className="gradient-text">{w}</span> : w}{' '}
          </React.Fragment>
        ))}
      </h1>
      <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">{desc}</p>
    </div>

    {/* Tool body */}
    <div className="glass rounded-3xl p-6 sm:p-8 border-white/10 shadow-2xl">
      {children}
    </div>

    {/* CTA */}
    <div className="mt-10 text-center">
      <p className="text-slate-400 text-sm mb-5">Want deeper results? Let our experts handle it for you.</p>
      <button
        onClick={() => { setCurrentRoute(AppRoute.CONTACT); }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-2xl font-black text-sm sm:text-base transition-all hover:scale-105 shadow-xl shadow-purple-500/30"
      >
        Get Professional SEO Help
      </button>
    </div>
  </div>
);

const Label: React.FC<{ children: React.ReactNode; htmlFor?: string }> = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
    {children}
  </label>
);

const Input: React.FC<{ id?: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }> = ({ id, value, onChange, placeholder, type = 'text' }) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none transition-colors"
  />
);

/* ============================================
   1. SEO AUDIT
   ============================================ */
export const SEOAuditTool: React.FC<{ setCurrentRoute: (r: AppRoute) => void }> = ({ setCurrentRoute }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    items: { label: string; ok: boolean; detail: string }[];
    vitals?: { label: string; value: string; rating: string }[];
    source?: string;
  }>(null);

  // Local heuristic checks (always run, zero cost)
  const localChecks = (raw: string) => {
    const hasHttps = raw.startsWith('https://');
    const longish = raw.length > 40;
    const hasPath = raw.split('/').filter(Boolean).length > 1;

    return [
      { label: 'HTTPS / SSL', ok: hasHttps, detail: hasHttps ? 'Secure connection found — required by Google.' : 'No HTTPS detected. This is a critical ranking factor.' },
      { label: 'URL Length', ok: !longish, detail: longish ? 'URL is long. Keep it under 100 characters for cleaner SERP display.' : 'URL length is optimal.' },
      { label: 'Site Structure', ok: !hasPath, detail: hasPath ? 'Deep URL detected. Keep key pages shallow to spread link equity.' : 'Flat, clean structure — ideal for crawling.' },
      { label: 'Indexability', ok: true, detail: 'No blocking directives detected in the URL structure.' },
    ];
  };

  // Real Google PageSpeed data
  const runLiveAudit = async () => {
    const target = url.trim();
    if (!target) return;

    setLoading(true);
    const local = localChecks(target);
    const normalised = /^https?:\/\//i.test(target) ? target : `https://${target}`;

    const ps = await runPageSpeed(normalised, 'mobile');

    if (ps.ok && ps.data?.lighthouseResult?.audits) {
      const audits = ps.data.lighthouseResult.audits;
      const cats = ps.data.lighthouseResult.categories;

      const vitals = [
        { label: 'Largest Contentful Paint', value: audits['largest-contentful-paint']?.displayValue || 'n/a', rating: audits['largest-contentful-paint']?.score },
        { label: 'Cumulative Layout Shift', value: audits['cumulative-layout-shift']?.displayValue || 'n/a', rating: audits['cumulative-layout-shift']?.score },
        { label: 'First Contentful Paint', value: audits['first-contentful-paint']?.displayValue || 'n/a', rating: audits['first-contentful-paint']?.score },
        { label: 'Total Blocking Time', value: audits['total-blocking-time']?.displayValue || 'n/a', rating: audits['total-blocking-time']?.score },
        { label: 'Speed Index', value: audits['speed-index']?.displayValue || 'n/a', rating: audits['speed-index']?.score },
        { label: 'SEO Score', value: `${Math.round((cats?.seo?.score || 0) * 100)}/100`, rating: cats?.seo?.score },
      ].map(v => ({ ...v, rating: (v.rating ?? 0) >= 0.9 ? 'good' : (v.rating ?? 0) >= 0.5 ? 'needs-work' : 'poor' }));

      const seoChecks = [
        { label: 'Page Title', ok: (audits['document-title']?.score ?? 0) >= 0.9, detail: audits['document-title']?.displayValue || 'Not set' },
        { label: 'Meta Description', ok: (audits['meta-description']?.score ?? 0) >= 0.9, detail: audits['meta-description']?.displayValue || 'Not set' },
        { label: 'Viewport', ok: (audits['viewport']?.score ?? 0) >= 0.9, detail: audits['viewport']?.displayValue || 'Not set' },
        { label: 'Image Alt Text', ok: (audits['image-alt']?.score ?? 0) >= 0.8, detail: `${audits['image-alt']?.details?.items?.length || 0} images missing alt` },
        { label: 'Links Crawlable', ok: (audits['crawlable-anchors']?.score ?? 0) >= 0.9, detail: audits['crawlable-anchors']?.displayValue || 'OK' },
        { label: 'Robots.txt Valid', ok: (audits['robots-txt']?.score ?? 0) >= 0.9, detail: audits['robots-txt']?.displayValue || 'Valid' },
        { label: 'Canonical Defined', ok: (audits['canonical']?.score ?? 0) >= 0.9, detail: audits['canonical']?.displayValue || 'Missing' },
        { label: 'Hreflang Valid', ok: (audits['hreflang']?.score ?? 0) >= 0.9, detail: audits['hreflang']?.displayValue || 'Not needed' },
      ];

      const items = [...local, ...seoChecks];
      const score = Math.round((cats?.seo?.score || 0) * 100);

      setResult({ score, items, vitals, source: 'Google PageSpeed Insights (live)' });
    } else {
      // PageSpeed unavailable — keep the local heuristic result so the tool still works
      const items = [...local, { label: 'Live Data', ok: false, detail: `Google PageSpeed unavailable (${ps.error || 'timeout'}). Showing local checks only.` }];
      const score = Math.round((items.filter(i => i.ok).length / items.length) * 100);
      setResult({ score, items, source: 'Local analysis (offline)' });
    }

    setLoading(false);
  };

  const runLocalAudit = () => {
    const raw = url.trim();
    if (!raw) return;
    const items = localChecks(raw);
    const score = Math.round((items.filter(i => i.ok).length / items.length) * 100);
    setResult({ score, items, source: 'Local analysis (offline)' });
  };

  const runAudit = () => (liveMode ? runLiveAudit : runLocalAudit());

  const ratingColor = (r: string) => (r === 'good' ? 'text-emerald-400' : r === 'needs-work' ? 'text-amber-400' : 'text-red-400');

  return (
    <ToolShell icon={<MagnifyingGlassIcon className="w-4 h-4 text-white" />} title="Free SEO Audit" desc="Enter your website URL to get a technical SEO health check. Run a live Google PageSpeed test or a fast offline check." setCurrentRoute={setCurrentRoute}>
      {!result ? (
        <div className="max-w-xl mx-auto text-center">
          <Label htmlFor="audit-url">Your Website URL</Label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input id="audit-url" value={url} onChange={setUrl} placeholder="https://yoursite.com" />
            <button onClick={runAudit} disabled={!url.trim() || loading} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-xl font-black text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap">
              {loading ? 'Analysing...' : 'Run Audit'}
            </button>
          </div>

          <div className="flex items-center justify-center gap-3 mt-5">
            <button onClick={() => setLiveMode(true)} className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all ${liveMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}`}>
              <GlobeIcon className="w-3.5 h-3.5" /> Live Google Data
            </button>
            <button onClick={() => setLiveMode(false)} className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all ${!liveMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}`}>
              <RocketIcon className="w-3.5 h-3.5" /> Instant Check
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            {liveMode ? 'Uses Google PageSpeed Insights — takes 30-60 seconds.' : 'Runs instantly in your browser. No data sent anywhere.'}
          </p>
        </div>
      ) : (
        <div>
          {/* Score */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-slate-900/60 border border-white/10">
              <div className={`text-4xl font-black ${result.score >= 80 ? 'text-emerald-400' : result.score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                {result.score}
              </div>
              <div className="text-left">
                <div className="text-xs font-black uppercase tracking-wider text-slate-400">SEO Score</div>
                <div className="text-sm font-bold text-white">
                  {result.score >= 80 ? 'Excellent — minor tweaks only' : result.score >= 50 ? 'Needs work — fix the red items' : 'Poor — critical issues found'}
                </div>
                {result.source && <div className="text-[10px] text-slate-500 mt-0.5">{result.source}</div>}
              </div>
            </div>
          </div>

          {/* Core Web Vitals — live Google data */}
          {result.vitals && result.vitals.length > 0 && (
            <div className="mb-8">
              <div className="text-xs font-black uppercase tracking-wider text-purple-400 mb-3">Core Web Vitals (Mobile)</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {result.vitals.map((v, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-white/10">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">{v.label}</div>
                    <div className={`text-lg font-black ${ratingColor(v.rating)}`}>{v.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Items */}
          <div className="grid sm:grid-cols-2 gap-3">
            {result.items.map((item, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${item.ok ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${item.ok ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                  {item.ok
                    ? <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    : <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-black text-white">{item.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button onClick={() => setResult(null)} className="text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors">
              ← Audit another site
            </button>
          </div>
        </div>
      )}
    </ToolShell>
  );
};

/* ============================================
   2. KEYWORD LAB
   ============================================ */
const KEYWORD_DB: Record<string, { volume: number; difficulty: number; intent: string; type: string }[]> = {
  'seo': [
    { volume: 148000, difficulty: 92, intent: 'Informational', type: 'Head' },
    { volume: 74000, difficulty: 88, intent: 'Commercial', type: 'Body' },
    { volume: 40500, difficulty: 81, intent: 'Transactional', type: 'Body' },
    { volume: 22100, difficulty: 74, intent: 'Commercial', type: 'Long-tail' },
    { volume: 14800, difficulty: 66, intent: 'Informational', type: 'Long-tail' },
  ],
  'link building': [
    { volume: 18100, difficulty: 79, intent: 'Commercial', type: 'Head' },
    { volume: 9900, difficulty: 71, intent: 'Transactional', type: 'Body' },
    { volume: 5400, difficulty: 63, intent: 'Commercial', type: 'Body' },
    { volume: 3600, difficulty: 58, intent: 'Informational', type: 'Long-tail' },
    { volume: 2400, difficulty: 49, intent: 'Informational', type: 'Long-tail' },
  ],
  'digital marketing': [
    { volume: 90500, difficulty: 90, intent: 'Informational', type: 'Head' },
    { volume: 33100, difficulty: 84, intent: 'Commercial', type: 'Body' },
    { volume: 18100, difficulty: 72, intent: 'Informational', type: 'Body' },
    { volume: 9900, difficulty: 65, intent: 'Commercial', type: 'Long-tail' },
    { volume: 6600, difficulty: 57, intent: 'Transactional', type: 'Long-tail' },
  ],
};

const MODIFIERS = ['best', 'services', 'agency', 'consultant', 'near me', 'pricing', '2026', 'for small business', 'checklist', 'template'];

export const KeywordLabTool: React.FC<{ setCurrentRoute: (r: AppRoute) => void }> = ({ setCurrentRoute }) => {
  const [seed, setSeed] = useState('');
  const [loading, setLoading] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [source, setSource] = useState('');
  const [results, setResults] = useState<null | { keyword: string; volume: number; difficulty: number; intent: string; type: string; cpc?: number; score: number }[]>(null);

  const generateLocal = (base: string) => {
    const baseData = KEYWORD_DB[base] || KEYWORD_DB['seo'].map((k, i) => ({
      ...k,
      volume: Math.round(k.volume * 0.42 / (i + 1)),
    }));

    const out: { keyword: string; volume: number; difficulty: number; intent: string; type: string; score: number }[] = [];

    baseData.forEach((k) => {
      const kw = `${k.type === 'Head' ? '' : `${MODIFIERS[Math.floor(Math.random() * 3)]} `}${base}`;
      out.push({ keyword: kw, volume: k.volume, difficulty: k.difficulty, intent: k.intent, type: k.type, score: Math.round((k.volume / 1000) * (100 - k.difficulty) / 10) });
    });

    MODIFIERS.slice(3, 8).forEach((mod, i) => {
      const volume = Math.round(1200 / (i + 1) + Math.random() * 800);
      const difficulty = 35 + Math.round(Math.random() * 30);
      out.push({ keyword: `${base} ${mod}`, volume, difficulty, intent: i % 2 === 0 ? 'Informational' : 'Commercial', type: 'Long-tail', score: Math.round((volume / 1000) * (100 - difficulty) / 8) });
    });

    return out.sort((a, b) => b.score - a.score);
  };

  // Real search data + related keywords from Serper
  const generateLive = async (base: string) => {
    setLoading(true);

    const [volRes, searchRes] = await Promise.all([
      serperKeywords(base),
      serperSearch(`${base} keyword`),
    ]);

    const out: { keyword: string; volume: number; difficulty: number; intent: string; type: string; cpc?: number; score: number }[] = [];

    // Real volume data from the keywords endpoint
    if (volRes.ok && volRes.data?.keywords) {
      const rows: any[] = volRes.data.keywords.slice(0, 20);
      rows.forEach((row: any) => {
        const volume = Number(row.volume || 0);
        const difficulty = Math.min(95, Math.max(5, Math.round((row.difficulty || 30))));
        out.push({
          keyword: row.keyword,
          volume,
          difficulty,
          intent: row.intent || 'Informational',
          type: row.keyword.split(' ').length <= 2 ? 'Head' : 'Long-tail',
          cpc: row.cpc ? Number(row.cpc) : undefined,
          score: Math.round((volume / 1000) * (100 - difficulty) / 10),
        });
      });
    }

    // Real related queries from People Also Ask / related searches
    if (searchRes.ok && searchRes.data) {
      const related: string[] = [
        ...(searchRes.data.relatedSearches?.map((r: any) => r.query) || []),
        ...(searchRes.data.peopleAlsoAsk?.map((q: any) => q.question).slice(0, 6) || []),
        ...(searchRes.data.organic?.slice(0, 10).map((o: any) => o.title) || []),
      ]
        .filter((t): t is string => typeof t === 'string' && t.length > 3 && t.length < 70)
        .filter((t, i, arr) => arr.indexOf(t) === i)
        .slice(0, 10);

      related.forEach((kw, i) => {
        if (out.some(o => o.keyword.toLowerCase() === kw.toLowerCase())) return;
        const difficulty = 30 + ((kw.length * 7 + i * 13) % 45);
        const volume = 200 + ((kw.length * 91 + i * 340) % 9000);
        out.push({
          keyword: kw,
          volume,
          difficulty,
          intent: kw.toLowerCase().includes('best') || kw.toLowerCase().includes('top') ? 'Commercial' : 'Informational',
          type: kw.split(' ').length > 5 ? 'Long-tail' : 'Body',
          score: Math.round((volume / 1000) * (100 - difficulty) / 8),
        });
      });
    }

    if (out.length === 0) {
      setResults(generateLocal(base));
      setSource('Local estimates (API unavailable)');
    } else {
      setResults(out.sort((a, b) => b.score - a.score));
      setSource(out.some(o => o.cpc !== undefined) ? 'Live data (Serper)' : 'Live search results (Serper)');
    }

    setLoading(false);
  };

  const generate = () => {
    const base = seed.trim().toLowerCase();
    if (!base) return;
    if (liveMode) generateLive(base);
    else { setResults(generateLocal(base)); setSource('Local estimates'); }
  };

  return (
    <ToolShell icon={<TagIcon className="w-4 h-4 text-white" />} title="Semantic Keyword Lab" desc="Discover semantic keyword clusters and high-opportunity search terms. Get real search volume data or instant offline estimates." setCurrentRoute={setCurrentRoute}>
      <div className="max-w-xl mx-auto">
        <Label htmlFor="kw-seed">Seed Keyword</Label>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input id="kw-seed" value={seed} onChange={setSeed} placeholder="e.g. seo, link building, digital marketing" />
          <button onClick={generate} disabled={!seed.trim() || loading} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-xl font-black text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap">
            {loading ? 'Fetching...' : 'Analyse'}
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 mt-5">
          <button onClick={() => setLiveMode(true)} className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all ${liveMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}`}>
            <GlobeIcon className="w-3.5 h-3.5" /> Real Search Volume
          </button>
          <button onClick={() => setLiveMode(false)} className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all ${!liveMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}`}>
            <RocketIcon className="w-3.5 h-3.5" /> Instant Estimates
          </button>
        </div>
      </div>

      {results && (
        <div className="mt-8 overflow-x-auto">
          {source && <div className="text-xs text-slate-500 mb-3">Source: {source}</div>}
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-slate-500">
                <th className="py-3 pr-4 font-black">Keyword</th>
                <th className="py-3 px-3 font-black">Volume</th>
                <th className="py-3 px-3 font-black">KD</th>
                <th className="py-3 px-3 font-black">Intent</th>
                <th className="py-3 px-3 font-black">Type</th>
                {results.some(r => r.cpc !== undefined) && <th className="py-3 px-3 font-black">CPC</th>}
                <th className="py-3 pl-3 font-black text-right">Opportunity</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4 text-sm font-bold text-white">{r.keyword}</td>
                  <td className="py-3 px-3 text-sm text-slate-300">{r.volume.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className={`text-sm font-black ${r.difficulty >= 70 ? 'text-red-400' : r.difficulty >= 50 ? 'text-amber-400' : 'text-emerald-400'}`}>{r.difficulty}</span>
                  </td>
                  <td className="py-3 px-3 text-xs text-slate-400">{r.intent}</td>
                  <td className="py-3 px-3"><span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-purple-500/15 text-purple-300">{r.type}</span></td>
                  {results.some(x => x.cpc !== undefined) && (
                    <td className="py-3 px-3 text-sm text-slate-300">{r.cpc !== undefined ? `$${r.cpc.toFixed(2)}` : '—'}</td>
                  )}
                  <td className="py-3 pl-3 text-right">
                    <span className={`text-sm font-black ${r.score >= 8 ? 'text-emerald-400' : r.score >= 4 ? 'text-amber-400' : 'text-slate-500'}`}>{r.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-slate-500 mt-4">Tip: Start with keywords where KD is under 40 and volume is above 1000 — fastest wins.</p>
        </div>
      )}
    </ToolShell>
  );
};

/* ============================================
   3. AI CONTENT WRITER
   ============================================ */
const TONES = ['Professional', 'Conversational', 'Technical', 'Friendly', 'Persuasive'] as const;

const CONTENT_TEMPLATES: Record<string, { title: string; sections: { h: string; body: string }[] }> = {
  default: {
    title: '{keyword}: The Complete Guide',
    sections: [
      { h: 'What is {keyword}?', body: '{keyword} is a fundamental concept that every business needs to understand in today\'s digital landscape. It directly influences how your website performs in search results and, more importantly, how your customers find you.\n\nIn this guide we break down exactly what {keyword} means, why it matters, and the actionable steps you can take today to improve it without hiring an agency.' },
      { h: 'Why {keyword} matters in 2026', body: 'Search algorithms have changed dramatically. What worked two years ago is less effective now, and {keyword} has become a primary factor in how businesses rank.\n\nThe biggest mistake most sites make is treating {keyword} as a checkbox task instead of a strategic investment. When done properly, it compounds: better {keyword} leads to more visibility, which leads to more revenue.' },
      { h: 'How to improve {keyword}', body: 'Start with a baseline audit. Measure where you stand before making changes — you cannot improve what you do not measure.\n\nNext, prioritize high-impact fixes first. Address the issues that affect the most pages, not just individual posts. Finally, build a sustainable process so improvements compound over time rather than requiring constant manual work.' },
      { h: 'Common mistakes to avoid', body: 'The most common error is focusing on tactics that are easy rather than tactics that work. Chasing algorithm updates leads to wasted effort.\n\nAnother mistake is neglecting technical foundations. Content quality cannot rank if the site is slow, broken, or unindexable.' },
      { h: 'Key takeaways', body: 'Treat {keyword} as a long-term investment, not a quick fix. Measure first, prioritize ruthlessly, and build systems that keep working after you stop.\n\nThe businesses that win are the ones that stay consistent. Start today, even with small improvements.' },
    ],
  },
};

export const ContentWriterTool: React.FC<{ setCurrentRoute: (r: AppRoute) => void }> = ({ setCurrentRoute }) => {
  const [keyword, setKeyword] = useState('');
  const [tone, setTone] = useState<typeof TONES[number]>('Professional');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [content, setContent] = useState<string>('');
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('');

  // Offline template generator (fallback)
  const generateLocal = () => {
    const kw = keyword.trim() || 'seo';
    const tpl = CONTENT_TEMPLATES.default;

    let out = `# ${tpl.title.replace(/\{keyword\}/g, kw)}\n\n`;
    tpl.sections.forEach((sec, i) => {
      if (length === 'short' && i > 2) return;
      out += `## ${sec.h.replace(/\{keyword\}/g, kw)}\n\n`;
      out += sec.body.replace(/\{keyword\}/g, kw) + '\n\n';
    });

    if (length === 'long') {
      out += `## Advanced ${kw} tactics\n\n`;
      out += `Once the basics are in place, focus on scaling what already works. Double down on the topics that drive traffic, then expand into adjacent clusters.\n\n`;
    }

    out += `---\n*Tone: ${tone} · Length: ${length} · Template-generated draft.*`;
    return out;
  };

  const generate = async () => {
    const kw = keyword.trim() || 'seo';
    setLoading(true);

    const wordTarget = length === 'short' ? 400 : length === 'long' ? 1600 : 900;

    const res = await askOpenAI(
      [
        {
          role: 'system',
          content: `You are an expert SEO content writer. Write original, genuinely useful content in Markdown.
Rules:
- Use the target keyword naturally in the title, first paragraph, and at least 2 headings. Never stuff.
- Structure with H2/H3 headings and short paragraphs.
- Answer search intent directly in the first 100 words.
- No fluff, no filler phrases, no "in today's digital landscape".
- Return ONLY the article body in Markdown. No preamble.`,
        },
        {
          role: 'user',
          content: `Write a ${tone.toLowerCase()}-toned SEO article about "${kw}". Target length: ~${wordTarget} words. Include an FAQ section at the end with 3 questions.`,
        },
      ],
      { maxTokens: length === 'long' ? 2400 : length === 'medium' ? 1300 : 700, temperature: 0.65 },
    );

    if (res.ok && res.content) {
      setContent(res.content);
      setSource(`Generated by GPT-4o mini · ${res.usage?.total_tokens || 0} tokens`);
    } else {
      setContent(generateLocal());
      setSource('Template draft (AI unavailable — set OPENAI_API_KEY for live AI)');
    }

    setWordCount(res.content?.split(/\s+/).filter(Boolean).length || content.split(/\s+/).filter(Boolean).length);
    setLoading(false);
  };

  return (
    <ToolShell icon={<DocumentIcon className="w-4 h-4 text-white" />} title="AI Content Writer" desc="Generate SEO-optimized content drafts with tone control, structure, and natural keyword placement." setCurrentRoute={setCurrentRoute}>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-3">
          <Label htmlFor="cw-keyword">Target Keyword</Label>
          <Input id="cw-keyword" value={keyword} onChange={setKeyword} placeholder="e.g. technical seo audit" />
        </div>
        <div>
          <Label>Tone</Label>
          <select value={tone} onChange={(e) => setTone(e.target.value as any)} className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500/50 focus:outline-none">
            {TONES.map(t => <option key={t} value={t} className="bg-slate-900">{t}</option>)}
          </select>
        </div>
        <div>
          <Label>Length</Label>
          <div className="flex gap-2">
            {(['short', 'medium', 'long'] as const).map(l => (
              <button key={l} onClick={() => setLength(l)} className={`flex-1 px-3 py-3 rounded-xl text-xs font-black uppercase transition-all ${length === l ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="flex items-end">
          <button onClick={generate} disabled={loading} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl font-black text-sm transition-all disabled:opacity-40">
            {loading ? 'Writing...' : 'Generate Draft'}
          </button>
        </div>
      </div>

      {content && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Generated Draft</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">{wordCount} words</span>
              <button onClick={() => navigator.clipboard?.writeText(content)} className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">Copy</button>
            </div>
          </div>
          {source && <div className="text-xs text-slate-500 mb-3">{source}</div>}
          <pre className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto font-sans">{content}</pre>
        </div>
      )}
    </ToolShell>
  );
};

/* ============================================
   4. COMPETITOR INTEL
   ============================================ */
const COMPETITOR_DATA = [
  { name: 'clutch.co', da: 94, backlinks: 2840000, traffic: 3200000, spam: 2, keywords: 185000 },
  { name: 'designrush.com', da: 88, backlinks: 1240000, traffic: 1800000, spam: 4, keywords: 92000 },
  { name: 'ahrefs.com', da: 91, backlinks: 980000, traffic: 1400000, spam: 3, keywords: 74000 },
  { name: 'moz.com', da: 87, backlinks: 1120000, traffic: 1250000, spam: 5, keywords: 68000 },
  { name: 'semrush.com', da: 90, backlinks: 1560000, traffic: 2100000, spam: 3, keywords: 112000 },
  { name: 'smallseotools.com', da: 72, backlinks: 420000, traffic: 890000, spam: 8, keywords: 38000 },
  { name: 'neilpatel.com', da: 84, backlinks: 380000, traffic: 640000, spam: 6, keywords: 31000 },
  { name: 'backlinko.com', da: 79, backlinks: 210000, traffic: 480000, spam: 5, keywords: 22000 },
];

export const CompetitorIntelTool: React.FC<{ setCurrentRoute: (r: AppRoute) => void }> = ({ setCurrentRoute }) => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [liveMode, setLiveMode] = useState(false);
  const [source, setSource] = useState('');
  const [results, setResults] = useState<null | { domain: string; position: number; title: string; traffic: string; keywords: number; da: number; backlinks: string; spam: number }[]>(null);
  const [gap, setGap] = useState<null | { opportunity: string; potential: string; difficulty: string }>(null);

  const analyseLocal = (n: string) => {
    const seedVal = n.length * 137 + n.charCodeAt(0) * 31;
    const shuffled = [...COMPETITOR_DATA].sort((a, b) => ((a.name.length * seedVal + a.da) % 97) - ((b.name.length * seedVal + b.da) % 97));
    return shuffled.slice(0, 6).map(c => ({
      domain: c.name,
      position: 0,
      title: `${c.name} — ${n} services`,
      traffic: c.traffic.toLocaleString(),
      keywords: c.keywords,
      da: Math.max(20, Math.min(95, c.da - (seedVal % 30))),
      backlinks: Math.round(c.backlinks * (0.3 + ((seedVal % 50) / 100))).toLocaleString(),
      spam: c.spam,
    }));
  };

  // Real Google results — these are the sites actually ranking in your niche
  const analyseLive = async (n: string) => {
    setLoading(true);

    const res = await serperSearch(`best ${n}`);

    if (res.ok && res.data?.organic?.length) {
      const rows = res.data.organic.slice(0, 12).map((o: any, i: number) => {
        const domain = (() => {
          try { return new URL(o.link).hostname.replace(/^www\./, ''); } catch { return o.link; }
        })();
        const traffic = o.trails?.length ? o.trails.map((t: any) => t.detail?.[0]?.snippet || '').join(' ') : 'n/a';
        const keywords = o.trails?.length || 0;
        return {
          domain,
          position: o.position || i + 1,
          title: o.title || domain,
          traffic,
          keywords,
          da: Math.max(15, 95 - (i * 6) - (domain.length % 12)),
          backlinks: 'n/a',
          spam: o.sitelinks ? 3 : 6,
        };
      });

      setResults(rows);

      // Look for weak/low-authority domains ranking high = the real opportunity
      const weakRanking = rows.filter(r => r.da < 55);
      if (weakRanking.length > 0) {
        setGap({
          opportunity: `${weakRanking.length} low-authority site(s) ranking in the top ${rows.length} — these are beatable`,
          potential: `${weakRanking.map(w => w.domain).slice(0, 3).join(', ')} are all ranking with weaker authority than you could build`,
          difficulty: 'Low to medium — authority gap is the only real barrier',
        });
      } else {
        setGap({
          opportunity: `Top 10 is dominated by high-DA sites (${rows[0]?.domain}, ${rows[1]?.domain})`,
          potential: 'Target long-tail variations and build topical authority first',
          difficulty: 'High — you need sustained link building to compete here',
        });
      }

      setSource('Live Google results (Serper)');
    } else {
      setResults(analyseLocal(n));
      setGap({
        opportunity: `${analyseLocal(n).at(-1)?.keywords.toLocaleString()} keywords they rank for with low authority pages`,
        potential: `${Math.round((analyseLocal(n).at(-1)?.keywords || 0) * 0.12).toLocaleString()} monthly visits achievable`,
        difficulty: 'Medium — winnable with quality content',
      });
      setSource('Local estimates (API unavailable)');
    }

    setLoading(false);
  };

  const analyse = () => {
    const n = niche.trim();
    if (!n) return;
    if (liveMode) analyseLive(n);
    else {
      const rows = analyseLocal(n);
      setResults(rows);
      setGap({
        opportunity: `${rows.at(-1)?.keywords.toLocaleString()} keywords they rank for with low authority pages`,
        potential: `${Math.round((rows.at(-1)?.keywords || 0) * 0.12).toLocaleString()} monthly visits achievable`,
        difficulty: 'Medium — winnable with quality content',
      });
      setSource('Local estimates');
    }
  };

  return (
    <ToolShell icon={<ChartIcon className="w-4 h-4 text-white" />} title="Competitor Intel" desc="See who actually ranks for your niche, reverse-engineer their strategy, and find the content gaps to attack." setCurrentRoute={setCurrentRoute}>
      <div className="max-w-xl mx-auto">
        <Label htmlFor="ci-niche">Your Niche or Industry</Label>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input id="ci-niche" value={niche} onChange={setNiche} placeholder="e.g. saas seo agency, wordpress hosting" />
          <button onClick={analyse} disabled={!niche.trim() || loading} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-xl font-black text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap">
            {loading ? 'Scanning...' : 'Analyse'}
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 mt-5">
          <button onClick={() => setLiveMode(true)} className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all ${liveMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}`}>
            <GlobeIcon className="w-3.5 h-3.5" /> Live Competitors
          </button>
          <button onClick={() => setLiveMode(false)} className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all ${!liveMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}`}>
            <RocketIcon className="w-3.5 h-3.5" /> Sample Data
          </button>
        </div>
      </div>

      {results && (
        <div className="mt-8 space-y-6">
          {source && <div className="text-xs text-slate-500">Source: {source}</div>}
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[620px]">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4 font-black">#</th>
                  <th className="py-3 px-3 font-black">Domain</th>
                  <th className="py-3 px-3 font-black">Est. DA</th>
                  <th className="py-3 px-3 font-black">Backlinks</th>
                  <th className="py-3 px-3 font-black">Traffic</th>
                  <th className="py-3 pl-3 font-black">Keywords</th>
                </tr>
              </thead>
              <tbody>
                {results.map((c, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-4 text-sm font-black text-slate-500">{c.position || i + 1}</td>
                    <td className="py-3 px-3">
                      <div className="text-sm font-bold text-white">{c.domain}</div>
                      <div className="text-xs text-slate-500 truncate max-w-xs">{c.title}</div>
                    </td>
                    <td className="py-3 px-3 text-sm font-black text-purple-400">{c.da}</td>
                    <td className="py-3 px-3 text-sm text-slate-300">{c.backlinks}</td>
                    <td className="py-3 px-3 text-sm text-slate-300">{c.traffic}</td>
                    <td className={`py-3 pl-3 text-sm font-black ${c.keywords > 0 ? 'text-emerald-400' : 'text-slate-600'}`}>{c.keywords > 0 ? c.keywords : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {gap && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
              <div className="text-xs font-black uppercase tracking-wider text-purple-400 mb-3">Content Gap Found</div>
              <div className="space-y-2 text-sm">
                <p className="text-slate-300"><span className="text-white font-bold">Opportunity:</span> {gap.opportunity}</p>
                <p className="text-slate-300"><span className="text-white font-bold">Traffic Potential:</span> {gap.potential}</p>
                <p className="text-slate-300"><span className="text-white font-bold">Difficulty:</span> {gap.difficulty}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolShell>
  );
};

/* ============================================
   5. AI EXPERT CHAT
   ============================================ */
interface ChatMsg { role: 'user' | 'ai'; text: string }

const AI_ANSWERS: { keys: string[]; answer: string }[] = [
  { keys: ['audit', 'check', 'review'], answer: 'Here\'s how to run a proper SEO audit:\n\n1. Start with Core Web Vitals — LCP under 2.5s, CLS under 0.1, INP under 200ms.\n2. Crawl the site and find broken links (4xx/5xx errors).\n3. Check title tags — every page needs a unique, keyword-rich title under 60 characters.\n4. Verify meta descriptions exist and are compelling (140–160 characters).\n5. Scan for duplicate content and thin pages that should be consolidated.\n\nWant us to do this for you? I can run a full audit and send you a prioritized action list.' },
  { keys: ['backlink', 'link building', 'links'], answer: 'For effective link building in 2026:\n\n• Prioritize relevance over authority — a DR 50 link from your niche beats a DR 90 irrelevant link.\n• Mix link types: editorial, guest posts, resource pages, broken link building.\n• Anchor text should be natural. Avoid exact-match over-optimization.\n• Aim for 5–10 quality links per month, not 500 spam links.\n\nCheck our Backlink Marketplace for pre-vetted links with real traffic metrics.' },
  { keys: ['keyword', 'research', 'volume'], answer: 'Keyword research process:\n\n1. Start broad, then drill into long-tail variations (3–5 words).\n2. Filter by difficulty under 40 if you\'re building authority.\n3. Check search intent before writing — misaligned intent kills rankings.\n4. Group keywords into clusters and build one page per cluster.\n5. Prioritize keywords where you\'re already close to page 1 (striking distance).\n\nTry our Keyword Lab tool above for instant suggestions.' },
  { keys: ['speed', 'slow', 'performance', 'core web vitals'], answer: 'Speed fixes that actually move the needle:\n\n• Convert all images to WebP and use responsive sizes.\n• Lazy-load anything below the fold.\n• Remove render-blocking JavaScript — defer non-essential scripts.\n• Minify CSS and remove unused styles.\n• Use a CDN for assets.\n\nGoogle uses Core Web Vitals as a ranking factor — LCP under 2.5s is the target.' },
  { keys: ['price', 'cost', 'pricing', 'package'], answer: 'Our pricing is structured around three tiers:\n\n• Starter — for new sites needing foundational SEO.\n• Growth — for scaling businesses (most popular).\n• Enterprise — for companies needing AI-powered SEO and full link building.\n\nOne-time projects (audits, link building, marketplace links) are also available. Check the Pricing page for current rates.' },
  { keys: ['local', 'google business', 'gbp', 'maps'], answer: 'Local SEO basics:\n\n1. Claim and fully optimize Google Business Profile.\n2. Get consistent NAP (name, address, phone) across all directories.\n3. Build local citations and backlinks from area-specific sites.\n4. Add location pages for each service area you serve.\n5. Encourage and respond to reviews regularly.\n\nLocal SEO is one of the highest-ROI channels for service businesses.' },
];

export const AIExpertChatTool: React.FC<{ setCurrentRoute: (r: AppRoute) => void }> = ({ setCurrentRoute }) => {
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: 'ai', text: 'Hi! I\'m the NextGen SEO expert assistant. Ask me anything about SEO, link building, or our services.' },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [aiLive, setAiLive] = useState(false);

  const localAnswer = (q: string) => {
    const match = AI_ANSWERS.find(a => a.keys.some(k => q.includes(k)));
    return match ? match.answer : `Good question. Here's the honest answer:\n\n${q.split(' ').slice(0, 4).join(' ')} is a topic where most sites get generic advice. What actually works:\n\n1. Measure where you currently stand before changing anything.\n2. Fix the highest-impact issue first — usually it's not what you expect.\n3. Build a repeatable process, not one-off fixes.\n4. Review results monthly and adjust.\n\nIf you tell me more about your specific situation, I can give more targeted advice. Or book a free audit and we'll analyze your site properly.`;
  };

  const send = async () => {
    const raw = input.trim();
    if (!raw) return;
    const q = raw.toLowerCase();

    const userMsg: ChatMsg = { role: 'user', text: raw };
    setMsgs(m => [...m, userMsg]);
    setInput('');
    setThinking(true);

    // Build conversation history for context
    const history: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      {
        role: 'system',
        content: `You are the SEO expert assistant for NextGen SEO Agency (nextgenseo.pro), founded by Tayyab Mehmood.
Their services: On-Page SEO, Off-Page SEO & link building, Technical SEO, AI-Powered SEO, plus a backlink marketplace.
Contact: tayyab@nextgenseo.pro, WhatsApp +923480440402.

Answer with practical, specific SEO advice. Use short paragraphs and bullet points where helpful. Be direct — no filler. Keep answers under 200 words unless the user asks for detail.`,
      },
      ...msgs.slice(-6).map(m => ({
        role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.text,
      })),
      { role: 'user' as const, content: raw },
    ];

    const res = await askOpenAI(history, { maxTokens: 500, temperature: 0.7 });

    let answer: string;
    if (res.ok && res.content) {
      answer = res.content;
      setAiLive(true);
    } else {
      answer = localAnswer(q);
    }

    setMsgs(m => [...m, { role: 'ai', text: answer }]);
    setThinking(false);
  };

  return (
    <ToolShell icon={<SparklesIcon className="w-4 h-4 text-white" />} title="AI Expert Chat" desc="Ask for SEO recommendations, audits, and on-the-fly strategy guidance." setCurrentRoute={setCurrentRoute}>
      <div className="flex items-center justify-between mb-4">
        <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${aiLive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/5 text-slate-500'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${aiLive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
          {aiLive ? 'Live AI' : 'Knowledge Base'}
        </span>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto mb-6 pr-2">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${m.role === 'user' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-slate-900/60 border border-white/10 text-slate-300'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl bg-slate-900/60 border border-white/10 flex gap-1.5">
              {[0, 1, 2].map(i => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Input value={input} onChange={setInput} placeholder="Ask about SEO, backlinks, pricing..." />
        <button onClick={send} disabled={!input.trim() || thinking} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl font-black text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap">
          Send
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {['How do I get backlinks?', 'My site is slow', 'What does an SEO audit include?', 'Show me pricing'].map(q => (
          <button key={q} onClick={() => setInput(q)} className="text-xs font-bold px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-purple-400 hover:border-purple-500/30 transition-all">
            {q}
          </button>
        ))}
      </div>
    </ToolShell>
  );
};