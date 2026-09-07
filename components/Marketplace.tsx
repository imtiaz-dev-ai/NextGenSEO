import React, { useState, useEffect } from 'react';
const getMarketplaceListings = () => import('../utils/firebase').then(m => m.getMarketplaceListingsFromFirebase());

export interface MarketplaceListing {
  id: string;
  domain: string;
  dr: number;
  traffic: string;
  niche: string;
  price: number;
  createdAt?: any;
}

const DR_BAR_COLOR = (dr: number) =>
  dr >= 70 ? 'from-emerald-500 to-teal-400' : dr >= 50 ? 'from-blue-500 to-cyan-400' : 'from-purple-500 to-pink-400';

const Marketplace: React.FC = () => {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterNiche, setFilterNiche] = useState('All');
  const [filterDR, setFilterDR] = useState('All');

  useEffect(() => {
    getMarketplaceListings()
      .then(data => { setListings(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const niches = ['All', ...Array.from(new Set(listings.map(l => l.niche).filter(Boolean)))];

  const filtered = listings.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.domain.toLowerCase().includes(q) || l.niche.toLowerCase().includes(q);
    const matchNiche = filterNiche === 'All' || l.niche === filterNiche;
    const matchDR = filterDR === 'All' ||
      (filterDR === '70+' && l.dr >= 70) ||
      (filterDR === '50+' && l.dr >= 50) ||
      (filterDR === '30+' && l.dr >= 30);
    return matchSearch && matchNiche && matchDR;
  });

  const avgDR = listings.length ? Math.round(listings.reduce((s, l) => s + l.dr, 0) / listings.length) : 0;
  const dr70Plus = listings.filter(l => l.dr >= 70).length;

  const handleBuyLink = (listing: MarketplaceListing) => {
    const subject = `Buy Link Request — ${listing.domain}`;
    const body =
      `Hi NextGen SEO Team,\n\nI want to purchase a link from the following site:\n\n` +
      `Domain: ${listing.domain}\n` +
      `DR (Domain Rating): ${listing.dr}\n` +
      `Traffic: ${listing.traffic}\n` +
      `Niche: ${listing.niche}\n` +
      `Price: $${listing.price}\n\n` +
      `Please contact me to proceed with the order.\n\nThank you!`;
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=nextgenseotool@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 text-xs font-black uppercase mb-4">
          Link Building Marketplace
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
          Buy <span className="gradient-text">High-Authority</span> Links
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          Hand-picked sites with real traffic. White-hat guest posts & niche edits.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search a domain or niche..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none transition-all"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {['All', '30+', '50+', '70+'].map(dr => (
          <button key={dr} onClick={() => setFilterDR(dr)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${filterDR === dr ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'glass text-slate-400 hover:text-white'}`}>
            {dr === 'All' ? 'All DR' : `DR ${dr}`}
          </button>
        ))}
        <div className="w-px bg-white/10 mx-1" />
        {niches.map(n => (
          <button key={n} onClick={() => setFilterNiche(n)}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${filterNiche === n ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'glass text-slate-400 hover:text-white'}`}>
            {n}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 mb-8 text-sm font-bold">
        <span><span className="text-white text-xl font-black">{listings.length}</span> <span className="text-slate-400">domains listed</span></span>
        <span><span className="text-white text-xl font-black">{avgDR}</span> <span className="text-slate-400">average DR</span></span>
        <span><span className="text-white text-xl font-black">{dr70Plus}</span> <span className="text-slate-400">at DR 70+</span></span>
        <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" /> inventory refreshed today</span>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-white/5 text-xs font-black uppercase text-slate-400 tracking-wider">
          <span>Domain</span>
          <span>Authority (DR)</span>
          <span>Traffic</span>
          <span className="text-purple-400">Price</span>
          <span />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            {listings.length === 0 ? 'No listings yet. Admin can add sites from the Admin Panel.' : 'No results found.'}
          </div>
        ) : (
          filtered.map((listing, i) => (
            <div key={listing.id}
              className={`grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] gap-4 items-center px-6 py-5 border-b border-white/5 hover:bg-white/[0.03] transition-all ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
              {/* Domain */}
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-bold text-white truncate">{listing.domain}</span>
                {listing.niche && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold shrink-0">{listing.niche}</span>
                )}
              </div>
              {/* DR Bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden max-w-[120px]">
                  <div className={`h-full rounded-full bg-gradient-to-r ${DR_BAR_COLOR(listing.dr)}`} style={{ width: `${listing.dr}%` }} />
                </div>
                <span className="font-black text-white text-sm w-6">{listing.dr}</span>
              </div>
              {/* Traffic */}
              <span className="text-slate-300 font-bold text-sm">{listing.traffic}</span>
              {/* Price */}
              <span className="text-purple-400 font-black text-lg">${listing.price}</span>
              {/* Button */}
              <button
                onClick={() => handleBuyLink(listing)}
                className="bg-white/5 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 border border-white/10 hover:border-transparent px-4 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap"
              >
                Buy link →
              </button>
            </div>
          ))
        )}
      </div>

      {filtered.length > 0 && (
        <p className="text-center text-slate-500 text-sm mt-6">
          Showing {filtered.length} of {listings.length} listings
        </p>
      )}
    </div>
  );
};

export default Marketplace;
