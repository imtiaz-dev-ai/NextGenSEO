// Case Studies Component - SEO Success Stories & Results Portfolio
import React from 'react';

const CaseStudies: React.FC = () => {
  const [customCases, setCustomCases] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    const saved = localStorage.getItem('caseStudies');
    if (saved) setCustomCases(JSON.parse(saved));
  }, []);

  const defaultCases = [
    {
      client: "TechFlow SaaS",
      industry: "B2B Software",
      challenge: "Low organic visibility and poor keyword rankings in competitive SEO market",
      results: { traffic: "+450%", keywords: "+280", revenue: "+320%" },
      duration: "6 months",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      color: "purple"
    },
    {
      client: "GreenLife Wellness",
      industry: "E-commerce",
      challenge: "Poor technical SEO, slow page speed, and low Google rankings",
      results: { traffic: "+380%", keywords: "+195", revenue: "+290%" },
      duration: "5 months",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      color: "emerald"
    },
    {
      client: "FinSecure",
      industry: "FinTech",
      challenge: "Weak backlink profile, zero domain authority, and missing SEO optimization",
      results: { traffic: "+520%", keywords: "+340", revenue: "+410%" },
      duration: "8 months",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      color: "cyan"
    },
    {
      client: "UrbanFit Gym",
      industry: "Fitness & Health",
      challenge: "Zero local SEO presence, not ranking for local gym searches",
      results: { traffic: "+600%", keywords: "+420", revenue: "+550%" },
      duration: "7 months",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
      color: "pink"
    },
    {
      client: "EduLearn Platform",
      industry: "Education Tech",
      challenge: "High bounce rate, poor content structure, low student enrollment",
      results: { traffic: "+730%", keywords: "+560", revenue: "+690%" },
      duration: "11 months",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
      color: "blue"
    },
    {
      client: "HomeStyle Decor",
      industry: "Home & Living",
      challenge: "Competing with Amazon, low product visibility, weak brand presence",
      results: { traffic: "+810%", keywords: "+590", revenue: "+750%" },
      duration: "9 months",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
      color: "purple"
    }
  ];

  const allCases = customCases.length > 0 ? customCases.map(c => ({
    client: c.client,
    industry: c.industry,
    challenge: c.challenge,
    results: { 
      traffic: c.trafficGrowth, 
      keywords: c.keywordsRanked, 
      revenue: c.revenueIncrease 
    },
    duration: c.duration,
    image: c.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    color: c.color || "purple"
  })) : defaultCases;

  return (
    <div className="py-16 sm:py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 px-0">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6">SEO Case Studies & <span className="gradient-text">Proven Results</span></h2>
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed">Real organic search growth, keyword rankings, and traffic increases from our professional SEO agency client portfolio.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-0">
          {allCases.map((c, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden hover:-translate-y-2 transition-all group cursor-pointer border-white/5 hover:border-purple-500/30 hover-lift">
              <div className="relative h-48 overflow-hidden">
                <img src={c.image} alt={c.client} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                <div className={`absolute top-4 left-4 px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r from-${c.color}-500/80 to-${c.color}-600/80 backdrop-blur-sm text-white text-[10px] sm:text-xs font-black uppercase tracking-wider`}>
                  {c.industry}
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-2xl font-black mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-colors">{c.client}</h3>
                <p className="text-slate-400 text-[10px] sm:text-xs md:text-sm mb-6 sm:mb-8 leading-relaxed">{c.challenge}</p>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase">Traffic Growth</span>
                    <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">{c.results.traffic}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase">Keywords Ranked</span>
                    <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{c.results.keywords}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase">Revenue Increase</span>
                    <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{c.results.revenue}</span>
                  </div>
                </div>
                
                <div className="pt-4 sm:pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-slate-500 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase">Timeline</span>
                  <span className="text-slate-300 font-bold text-xs sm:text-sm">{c.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
