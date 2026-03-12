// FAQ Component - SEO Services Questions & Answers
// Keywords: SEO services FAQ, how long for SEO results, SEO agency pricing questions
// Long-tail: professional SEO services frequently asked questions, white-label SEO services
import React, { useState } from 'react';

// Common SEO questions - ranking timelines, service guarantees, industry expertise, pricing
const faqs = [
  {
    q: "How long does it take to see professional SEO results and keyword rankings?",
    a: "Typically, you'll start seeing improvements within 3-4 months. However, significant ranking changes and organic traffic growth usually occur between 6-12 months depending on competition, keywords targeted, and current site health. Our AI-powered approach accelerates results."
  },
  {
    q: "What makes NextGen SEO different from other professional SEO agencies?",
    a: "We combine 10+ years of proven SEO expertise with cutting-edge AI technology. Our founder Tayyab Mehmood has personally managed campaigns for Fortune 500 companies. We use proprietary AI tools for advanced keyword research, technical SEO audits, and link building strategy analysis."
  },
  {
    q: "Do you guarantee first page Google rankings and organic traffic?",
    a: "While we can't ethically guarantee specific rankings (no legitimate agency can), we do guarantee measurable improvements in organic traffic, keyword rankings, and domain authority. Our average client sees 300%+ organic traffic growth and 200+ new ranked keywords."
  },
  {
    q: "What industries and niches do you specialize in for SEO services?",
    a: "We provide professional SEO services across all industries including SaaS, E-commerce, FinTech, Healthcare, Real Estate, and B2B services. Our AI-powered keyword research and technical SEO approach adapts to any market and niche."
  },
  {
    q: "Are there long-term contracts or can I cancel my SEO service anytime?",
    a: "We offer flexible month-to-month SEO packages. While we recommend at least 6 months for optimal results, you can cancel with 30 days notice. We're confident you'll want to continue once you see the organic growth and keyword ranking improvements."
  },
  {
    q: "Do you provide white-label SEO services and reseller packages?",
    a: "Yes! We offer white-label SEO solutions and professional reseller packages for agencies and consultants. Contact our team to discuss custom partnership opportunities and white-hat link building programs."
  }
];

// Main FAQ accordion - answering common questions about SEO services and organic growth
const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-16 sm:py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto px-0">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 px-0">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6">
            Frequently Asked <span className="text-sky-500">Questions About SEO</span>
          </h2>
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed">Everything you need to know about our professional SEO services and keyword ranking strategies</p>
        </div>

        <div className="space-y-2 sm:space-y-4 px-0">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-lg sm:rounded-2xl border-white/5 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-3 sm:p-4 md:p-6 flex justify-between items-start sm:items-center hover:bg-white/5 transition-all gap-4"
              >
                <span className="font-bold text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">{faq.q}</span>
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-sky-500 shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 text-slate-400 leading-relaxed text-xs sm:text-sm md:text-base animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
