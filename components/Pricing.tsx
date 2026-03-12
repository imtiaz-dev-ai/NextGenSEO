// Pricing Component - SEO Service Packages & Link Building Plans
// Keywords: affordable SEO packages, SEO services pricing, link building services cost
// Long-tail: professional SEO services for small business, enterprise SEO agency pricing
import React, { useState } from 'react';
import { AppRoute } from '../types';

interface PricingProps {
  onContact: () => void;
}

// SEO pricing plans - Basic, Standard, Premium, Custom packages for organic growth
const plans = [
  {
    name: "Basic SEO",
    price: "$1200",
    originalPrice: "",
    period: "Monthly",
    description: "Perfect for startups building organic search authority",
    features: [
      "10 Backlinks",
      "Domain Authority 40+",
      "Organic Traffic 2K+",
      "One Link Per Domain",
      "Keyword Research Included",
      "SEO Optimization"
    ],
    popular: false
  },
  {
    name: "Standard SEO",
    price: "$4000",
    originalPrice: "$5500",
    period: "Monthly",
    description: "Ideal for growing companies with technical SEO needs",
    features: [
      "20 Backlinks",
      "Domain Authority 50+",
      "Organic Traffic Growth",
      "One Link Per Domain",
      "Technical SEO Audit",
      "On-Page Optimization"
    ],
    popular: true
  },
  {
    name: "Premium SEO",
    price: "$6600",
    originalPrice: "$7500",
    period: "Monthly",
    description: "For established brands seeking search dominance",
    features: [
      "30 Backlinks",
      "Domain Authority 60+",
      "Organic Traffic 10K+",
      "One Link Per Domain",
      "Full SEO Strategy",
      "Content Marketing Included",
      "Priority Support 24/7",
      "Dedicated SEO Manager"
    ],
    popular: false,
    badge: "Best Value"
  },
  {
    name: "Custom",
    price: "Custom",
    originalPrice: "",
    period: "Build Your Own",
    description: "Build your custom package with your requirements",
    features: [
      "Choose Backlinks (1-40+)",
      "Choose Traffic (1K-40K+)",
      "Set Your Budget",
      "Flexible Pricing",
      "Tailored SEO Solutions"
    ],
    popular: false,
    isCustom: true
  }
];

// Main pricing component - transparent SEO service packages and backlink building plans
const Pricing: React.FC<PricingProps> = ({ onContact }) => {
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className="pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 px-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6">SEO Services & <span className="gradient-text">Professional Pricing Plans</span></h1>
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-400 mb-8 leading-relaxed">Transparent pricing for professional SEO packages. Choose your keyword ranking and link building strategy. Affordable SEO services for startups to enterprise solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`glass p-6 sm:p-8 rounded-2xl relative ${plan.popular ? 'border-2 border-purple-500 md:scale-105' : 'border border-white/5'} hover:-translate-y-2 transition-all`}
            >
              {plan.badge && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-emerald-500 px-3 sm:px-6 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase">
                  {plan.badge}
                </div>
              )}
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-3 sm:px-6 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase">
                  Popular
                </div>
              )}
              
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-black mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-[10px] sm:text-xs md:text-sm mb-4 sm:mb-6 leading-relaxed">{plan.description}</p>
                {plan.originalPrice && plan.originalPrice !== plan.price && (
                  <div className="text-slate-500 line-through text-base sm:text-lg mb-1">{plan.originalPrice}</div>
                )}
                <div className="flex items-end justify-center gap-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text">{plan.price}</span>
                </div>
                <span className="text-slate-500 font-bold text-[10px] sm:text-xs">{plan.period}</span>
              </div>

              <ul className="space-y-2 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-300 text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  if (plan.isCustom) {
                    setShowCustom(true);
                  } else {
                    const email = "nextgenseotool@gmail.com";
                    const subject = `Book ${plan.name} Package`;

                    const body = `Hi NextGen SEO Team,

I want to book the following package:

Package: ${plan.name}
Price: ${plan.price}/${plan.period}

Features:
${plan.features.map(f => `- ${f}`).join("\n")}

Please contact me to proceed.

Thank you!`;

                    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                    window.open(gmailLink, "_blank");
                  }
                }}
                className={`block w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-black text-xs sm:text-sm md:text-base transition-all text-center cursor-pointer ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-xl shadow-purple-500/30' : 'glass hover:bg-white/10'}`}
              >
                {plan.isCustom ? 'Build Custom Package' : 'Book Now'}
              </button>
            </div>
          ))}
        </div>

        {showCustom && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4 pt-24" onClick={() => setShowCustom(false)}>
            <div className="relative max-w-3xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <CustomPricingContent onContact={() => { setShowCustom(false); onContact(); }} onClose={() => setShowCustom(false)} />
            </div>
          </div>
        )}

        <div className="mt-12 sm:mt-16 md:mt-20 text-center px-4">
          <p className="text-slate-400 mb-4 sm:mb-6 text-xs sm:text-base">Need a custom professional SEO solution?</p>
          <button onClick={onContact} className="glass px-6 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-2xl font-bold text-xs sm:text-base hover:bg-white/10 transition-all">
            Contact SEO Experts
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomPricingContent: React.FC<{ onContact: () => void; onClose: () => void }> = ({ onContact, onClose }) => {
  const [backlinks, setBacklinks] = useState('');
  const [traffic, setTraffic] = useState('');
  const [domainRating, setDomainRating] = useState('');
  const [price, setPrice] = useState('');

  const backlinkOptions = ['10+', '20+', '30+', '40+', '50+', '60+', '70+', '80+', '90+'];
  const trafficOptions = ['10K+', '20K+', '30K+', '40K+', '50K+', '60K+', '70K+', '80K+', '90K+'];
  const drOptions = ['10+', '20+', '30+', '40+', '50+', '60+', '70+', '80+', '90+'];

  const handleSubmit = () => {
    if (backlinks && traffic && domainRating && price) {
      const subject = encodeURIComponent('Custom SEO Package Request');
      const body = encodeURIComponent(`Hi NextGen SEO Team,\n\nI want to build a custom SEO package with the following requirements:\n\nBacklinks: ${backlinks}\nTraffic: ${traffic}\nDomain Rating: ${domainRating}\nBudget: $${price}\n\nPlease contact me with a custom proposal.\n\nThank you!`);
      window.location.href = `mailto:nextgenseotool@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="glass p-8 rounded-3xl relative">
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/50 hover:bg-slate-800 flex items-center justify-center transition-all z-10">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <h3 className="text-3xl font-black mb-6 text-center"><span className="gradient-text">Custom SEO Package</span></h3>
      <p className="text-slate-400 text-center mb-8">Build your custom package</p>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-bold mb-3 text-slate-300">Backlinks</label>
          <select value={backlinks} onChange={(e) => setBacklinks(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-purple-500 focus:outline-none transition-all">
            <option value="">Select</option>
            {backlinkOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <input type="text" value={backlinks} onChange={(e) => setBacklinks(e.target.value)} placeholder="Or type custom" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-purple-500 focus:outline-none transition-all mt-2" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-3 text-slate-300">Traffic (K)</label>
          <select value={traffic} onChange={(e) => setTraffic(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-purple-500 focus:outline-none transition-all">
            <option value="">Select</option>
            {trafficOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <input type="text" value={traffic} onChange={(e) => setTraffic(e.target.value)} placeholder="Or type custom" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-purple-500 focus:outline-none transition-all mt-2" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-3 text-slate-300">Domain Rating (DR)</label>
          <select value={domainRating} onChange={(e) => setDomainRating(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-purple-500 focus:outline-none transition-all">
            <option value="">Select</option>
            {drOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <input type="text" value={domainRating} onChange={(e) => setDomainRating(e.target.value)} placeholder="Or type custom" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-purple-500 focus:outline-none transition-all mt-2" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-3 text-slate-300">Your Budget ($)</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))} placeholder="Enter budget" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 font-bold focus:border-purple-500 focus:outline-none transition-all" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-400">Backlinks:</span><span className="font-bold text-purple-400">{backlinks || '-'}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Traffic:</span><span className="font-bold text-cyan-400">{traffic || '-'}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Domain Rating:</span><span className="font-bold text-emerald-400">{domainRating || '-'}</span></div>
          <div className="flex justify-between items-center pt-3 border-t border-white/10"><span className="text-xl font-black">Budget:</span><span className="text-3xl font-black gradient-text">{price ? `$${price}` : '$0'}</span></div>
        </div>
      </div>

      <button
        onClick={() => {
          if (backlinks && traffic && domainRating && price) {
            const email = "nextgenseotool@gmail.com";
            const subject = 'Custom SEO Package Request';

            const body = `Hi NextGen SEO Team,

I want to build a custom SEO package with the following requirements:

Backlinks: ${backlinks}
Traffic: ${traffic}
Domain Rating: ${domainRating}
Budget: $${price}

Please contact me with a custom proposal.

Thank you!`;

            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.open(gmailLink, "_blank");
          }
        }}
        disabled={!backlinks || !traffic || !domainRating || !price}
        className={`block w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-4 rounded-2xl font-black text-lg shadow-xl shadow-purple-500/40 transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Get Custom Quote
      </button>
    </div>
  );
};

export default Pricing;
