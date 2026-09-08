import React, { useState, useEffect } from 'react';
const getMarketplaceListings = () => import('../utils/firebase').then(m => m.getMarketplaceListingsFromFirebase());

export interface MarketplaceListing {
  id: string;
  domain: string;
  dr: number;
  traffic: string;
  niche: string;
  price: number;
  turnaround?: string;
  guestPost?: boolean;
  linkInsertion?: boolean;
  createdAt?: any;
}

const Marketplace: React.FC = () => {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const defaultListings: MarketplaceListing[] = [
    { id: 'd1', domain: 'saastoolreview.com', niche: 'SaaS', dr: 61, traffic: '12.4k/mo', price: 185, turnaround: '3 days', guestPost: true, linkInsertion: true },
    { id: 'd2', domain: 'markethealthly.io', niche: 'Health', dr: 48, traffic: '6.1k/mo', price: 120, turnaround: '4 days', guestPost: true, linkInsertion: false },
    { id: 'd3', domain: 'fintrail.co', niche: 'Finance', dr: 73, traffic: '31k/mo', price: 310, turnaround: '5 days', guestPost: false, linkInsertion: true },
    { id: 'd4', domain: 'dailygrowthhq.com', niche: 'Marketing', dr: 55, traffic: '9.8k/mo', price: 150, turnaround: '3 days', guestPost: true, linkInsertion: true },
    { id: 'd5', domain: 'remoteworkedge.ai', niche: 'SaaS', dr: 71, traffic: '22k/mo', price: 275, turnaround: '4 days', guestPost: true, linkInsertion: false },
    { id: 'd6', domain: 'budgetwisely.com', niche: 'Finance', dr: 38, traffic: '4.2k/mo', price: 95, turnaround: '2 days', guestPost: false, linkInsertion: true },
    { id: 'd7', domain: 'cloudstacknews.io', niche: 'Tech', dr: 82, traffic: '48k/mo', price: 420, turnaround: '6 days', guestPost: true, linkInsertion: true },
    { id: 'd8', domain: 'greenlivingtoday.com', niche: 'Lifestyle', dr: 44, traffic: '7.5k/mo', price: 110, turnaround: '3 days', guestPost: false, linkInsertion: false },
  ];

  useEffect(() => {
    getMarketplaceListings()
      .then(data => { setListings(data.length > 0 ? data : defaultListings); setLoading(false); })
      .catch(() => { setListings(defaultListings); setLoading(false); });
  }, []);

  const filtered = listings.filter(item => {
    const term = search.trim().toLowerCase();
    const matchSearch = !term || item.domain.toLowerCase().includes(term) || item.niche.toLowerCase().includes(term);
    if (activeFilter === 'com') return matchSearch && item.domain.endsWith('.com');
    if (activeFilter === 'io') return matchSearch && (item.domain.endsWith('.io') || item.domain.endsWith('.ai') || item.domain.endsWith('.co'));
    if (activeFilter === 'dr70') return matchSearch && item.dr >= 70;
    if (activeFilter === 'guestpost') return matchSearch && !!item.guestPost;
    if (activeFilter === 'linkinsertion') return matchSearch && !!item.linkInsertion;
    return matchSearch;
  });

  const avgDR = listings.length ? Math.round(listings.reduce((s, l) => s + l.dr, 0) / listings.length) : 0;
  const dr70Plus = listings.filter(l => l.dr >= 70).length;

  const handleBuyLink = (listing: MarketplaceListing) => {
    const subject = `Buy Link Request — ${listing.domain}`;
    const body =
      `Hi NextGen SEO Team,\n\nI want to purchase a link from the following site:\n\n` +
      `Domain: ${listing.domain}\nDR: ${listing.dr}\nTraffic: ${listing.traffic}\nNiche: ${listing.niche}\nPrice: $${listing.price}\n\nPlease contact me to proceed.\n\nThank you!`;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=nextgenseotool@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const filters = [
    { key: 'all', label: 'All listings' },
    { key: 'com', label: '.com' },
    { key: 'io', label: '.io / .ai / .co' },
    { key: 'dr70', label: 'DR 70+' },
    { key: 'guestpost', label: 'Guest Post' },
    { key: 'linkinsertion', label: 'Link Insertion' },
  ];

  const faqs = [
    { q: 'How do you verify traffic and authority?', a: "We cross-check every domain against Ahrefs and Semrush before listing, and re-verify monthly — so DR alone never determines a placement's value." },
    { q: 'What happens if a placement fails?', a: "Your payment is held in escrow until the link goes live. If we can't secure the placement, you're refunded automatically or offered an equivalent alternative domain." },
    { q: 'Is the link permanent and do-follow?', a: "Yes — every placement is do-follow and guaranteed for lifetime, with a live monitoring check so you're alerted if it's ever removed." },
    { q: 'Can I list my own domain as a publisher?', a: "Yes, through the publisher portal. Submit your domain's metrics, pass verification, and set your own base rate — we handle outreach and payment collection." },
  ];

  const features = [
    { num: '01', title: 'Order tracking, not just an inbox', desc: "Every order moves through a visible pipeline — placed, written, outreach, live, reported — so you're never emailing to ask \"any update?\"" },
    { num: '02', title: 'Escrow-style payment', desc: "Funds are held until the link is verified live on the target domain. If placement fails, you're refunded automatically — not after a support ticket." },
    { num: '03', title: 'Bulk cart with instant tiered pricing', desc: 'Add multiple domains to one cart and see your discount calculate live, instead of waiting on a quote for volume orders.' },
    { num: '04', title: 'An assistant that shortlists for you', desc: "Tell it your niche and budget — it filters the listing down to domains worth your budget, based on relevance, not just DR." },
    { num: '05', title: 'Publisher portal', desc: 'Site owners can submit their own domain for listing and get paid per placement — keeping inventory growing past what one team can source manually.' },
    { num: '06', title: 'Verified metrics, not self-reported', desc: 'Every DR, traffic and spam-score figure is pulled from Ahrefs and Semrush and timestamped, so what you see is what was true this week.' },
  ];

  const drColor = (dr: number) =>
    dr >= 70 ? 'from-emerald-500 to-teal-400' : dr >= 50 ? 'from-blue-500 to-cyan-400' : 'from-purple-500 to-pink-400';

  return (
    <div className="pb-20 px-4 sm:px-6 max-w-6xl mx-auto">

      {/* Hero */}
      <div className="text-center pt-10 pb-14 border-b border-white/5 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Inventory refreshed today
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-5 leading-[0.95]">
          Backlinks, priced like a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">real order book.</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Filter by authority, niche and traffic. Pay a fixed price, track the placement, and get proof it went live —{' '}
          <span className="text-white font-bold">no bidding, no guesswork.</span>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="#mp-market" className="group relative w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-2xl font-black text-base transition-all shadow-2xl shadow-purple-500/40 hover-lift overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Browse the marketplace
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a href="#mp-features" className="group w-full sm:w-auto glass px-8 py-4 rounded-2xl font-black text-base hover:bg-white/10 transition-all border border-white/10 hover:border-purple-500/40">
            See what's different
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[['640+', 'domains listed'], [`DR ${avgDR || 41}`, 'average authority'], ['2–5 days', 'typical turnaround'], ['100%', 'manual outreach']].map(([val, label]) => (
            <div key={label} className="text-center">
              <span className="text-white font-black text-2xl block">{val}</span>
              <span className="text-slate-400 text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker — live listings preview */}
      {listings.length > 0 && (
        <div className="glass rounded-2xl overflow-hidden mb-14">
          <div className="flex justify-between items-center px-5 py-3 border-b border-white/5 text-xs font-black uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live listings</span>
            <span>Price</span>
          </div>
          {listings.slice(0, 4).map((item, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-all">
              <div>
                <span className="font-bold text-white text-sm">{item.domain}</span>
                <span className="text-slate-400 text-xs block mt-0.5">{item.niche} · DR {item.dr}</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-xs font-black">${item.price}</span>
            </div>
          ))}
        </div>
      )}

      {/* Marketplace Table */}
      <div id="mp-market" className="mb-14">
        <div className="mb-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-4">
            Link Building Marketplace
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-3">
            Search the <span className="gradient-text">live listing</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl">Filter by tier, niche or TLD, then check out directly at the listed price.</p>
        </div>

        {/* Filters + Search */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          {filters.map(f => (
            <button key={f.key} onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeFilter === f.key ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' : 'glass text-slate-400 hover:text-white hover:border-purple-500/40'}`}>
              {f.label}
            </button>
          ))}
          <div className="relative ml-auto">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="bg-slate-900/50 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none transition-all text-sm w-52"
              placeholder="Search domain or niche…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-6 mb-6 text-sm font-bold">
          <span><span className="text-white text-lg font-black">{listings.length}</span> <span className="text-slate-400">domains listed</span></span>
          <span><span className="text-white text-lg font-black">{avgDR}</span> <span className="text-slate-400">average DR</span></span>
          <span><span className="text-white text-lg font-black">{dr70Plus}</span> <span className="text-slate-400">at DR 70+</span></span>
        </div>

        {/* Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[2fr_0.8fr_0.6fr_1fr_1.4fr_0.8fr_0.8fr_auto] gap-4 px-6 py-4 border-b border-white/5 text-xs font-black uppercase tracking-widest text-slate-400">
            <span>Domain</span><span>Niche</span><span>DR</span><span>Traffic</span>
            <span>Guest Post / Link Insertion</span><span>Turnaround</span><span>Price</span><span />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-sm">
              {listings.length === 0 ? 'No listings yet. Admin can add sites from the Admin Panel.' : 'No domains matched. Try a different keyword.'}
            </div>
          ) : (
            filtered.map((item, i) => (
              <div key={item.id} className={`grid grid-cols-1 md:grid-cols-[2fr_0.8fr_0.6fr_1fr_1.4fr_0.8fr_0.8fr_auto] gap-3 md:gap-4 items-center px-6 py-5 border-b border-white/5 hover:bg-white/[0.03] transition-all ${i % 2 !== 0 ? 'bg-white/[0.01]' : ''}`}>
                {/* Domain */}
                <div>
                  <span className="font-bold text-white">{item.domain}</span>
                  <span className="text-slate-400 text-xs block mt-0.5">{item.niche}</span>
                  <span className="text-emerald-400 text-xs flex items-center gap-1 mt-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Verified
                  </span>
                </div>
                {/* Niche */}
                <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold w-fit">{item.niche}</span>
                {/* DR */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden max-w-[60px]">
                    <div className={`h-full rounded-full bg-gradient-to-r ${drColor(item.dr)}`} style={{ width: `${item.dr}%` }} />
                  </div>
                  <span className="font-black text-white text-sm">{item.dr}</span>
                </div>
                {/* Traffic */}
                <span className="text-slate-300 font-bold text-sm">{item.traffic}</span>
                {/* Services */}
                <div className="flex gap-2 flex-wrap">
                  {item.guestPost !== undefined || item.linkInsertion !== undefined ? (
                    <>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold border ${item.guestPost ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-slate-500 border-white/5 opacity-50'}`}>
                        Guest Post {item.guestPost ? '✓' : '✕'}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold border ${item.linkInsertion ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-slate-500 border-white/5 opacity-50'}`}>
                        Link Insertion {item.linkInsertion ? '✓' : '✕'}
                      </span>
                    </>
                  ) : (
                    <span className="text-slate-500 text-xs">Contact for details</span>
                  )}
                </div>
                {/* Turnaround */}
                <span className="text-slate-300 text-sm">{item.turnaround || '3–5 days'}</span>
                {/* Price */}
                <span className="text-purple-400 font-black text-lg">${item.price}</span>
                {/* Buy */}
                <button onClick={() => handleBuyLink(item)}
                  className="bg-white/5 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 border border-white/10 hover:border-transparent px-4 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap">
                  Buy link →
                </button>
              </div>
            ))
          )}
        </div>

        {filtered.length > 0 && (
          <p className="text-center text-slate-500 text-sm mt-4">Showing {filtered.length} of {listings.length} listings</p>
        )}
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden mb-14">
        {[['640+', 'domain inventory'], ['DR 15–91', 'authority range'], ['24/7', 'expert support'], ['100%', 'do-follow, lifetime']].map(([val, label]) => (
          <div key={label} className="glass px-6 py-6">
            <span className="text-white font-black text-2xl block">{val}</span>
            <span className="text-slate-400 text-xs font-medium">{label}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <div id="mp-features" className="mb-14">
        <div className="mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-4">
            Why NextGen SEO
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-3">
            Built to go <span className="gradient-text">further</span> than a listing page
          </h2>
          <p className="text-slate-400 text-base max-w-xl">Everything you'd expect from a fixed-price link marketplace — plus the parts that usually only show up after you've already paid someone.</p>
        </div>
        <div className="space-y-0">
          {features.map((f, i) => (
            <div key={i} className={`flex gap-6 py-7 ${i < features.length - 1 ? 'border-b border-white/5' : ''}`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-black text-xl w-10 shrink-0">{f.num}</span>
              <div>
                <h3 className="font-black text-white text-lg mb-1.5 flex items-center gap-2">
                  {f.title}
                  {i < 4 && <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">New</span>}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-14">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter">Common <span className="gradient-text">questions</span></h2>
        </div>
        <div className="max-w-3xl space-y-0">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/5">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center py-5 text-left font-bold text-base hover:text-purple-400 transition-colors">
                {faq.q}
                <span className={`text-purple-400 text-xl font-black transition-transform duration-200 shrink-0 ml-4 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openFaq === i && (
                <p className="text-slate-400 text-sm leading-relaxed pb-5">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="glass rounded-2xl p-8 sm:p-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4">
          Ready to build your link profile the <span className="gradient-text">transparent way?</span>
        </h2>
        <p className="text-slate-400 text-base mb-8 max-w-lg mx-auto">No proposals to wait on, no back-and-forth on price. Pick your domains and check out.</p>
        <a href="#mp-market" className="group relative inline-flex bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-10 py-4 rounded-2xl font-black text-base transition-all shadow-2xl shadow-purple-500/40 hover-lift overflow-hidden">
          <span className="relative z-10 flex items-center gap-2">
            Browse live inventory
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </a>
      </div>

    </div>
  );
};

export default Marketplace;
