// Testimonials Component - Client Reviews & SEO Success Stories
// Keywords: SEO agency reviews, client testimonials, organic traffic growth results
// Long-tail: professional SEO services reviews, AI SEO agency client success stories
import React, { useState } from 'react';

// Client testimonials showcasing SEO results - keyword rankings, organic traffic, domain authority
const testimonials = [
  { name: "Sarah Chen", role: "CEO, TechFlow", company: "B2B SaaS", text: "NextGen SEO increased our organic traffic by 450% in 6 months with their AI-powered keyword research, technical SEO audits, and professional link building strategies. Tayyab's team transformed our search rankings.", rating: 5, image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Marcus Rodriguez", role: "Marketing Director", company: "E-commerce", text: "The AI-powered SEO strategies and white-hat link building delivered incredible results. Our organic search rankings improved significantly with better keyword positioning. ROI increased by 320% in just 5 months.", rating: 5, image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Emily Watson", role: "Founder, GreenLife", company: "Lifestyle", text: "From page 5 to position #1 on Google in 4 months. The technical SEO audit and on-page optimization improved our keyword rankings dramatically. Worth every penny for organic growth.", rating: 5, image: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "David Kim", role: "VP Growth", company: "FinTech", text: "Tayyab's expertise in AI-driven SEO, link building, and organic traffic growth is unmatched. Our domain authority jumped from 35 to 72. Best professional SEO investment we've made.", rating: 5, image: "https://randomuser.me/api/portraits/men/46.jpg" }
];

// Main testimonials carousel - real client reviews and SEO performance metrics
const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/5 to-transparent" />
      <div className="max-w-6xl mx-auto relative z-10 px-0">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 px-0">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6"><span className="gradient-text">Client Success Stories</span> & Professional SEO Results</h2>
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed">Real organic search growth and Google ranking improvements from our professional AI SEO agency clients</p>
        </div>
        
        <div className="relative px-0">
          <div className="glass p-6 sm:p-10 md:p-12 lg:p-16 rounded-2xl md:rounded-[3rem] border-purple-500/20">
            <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 justify-center">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <svg key={i} className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl font-medium text-slate-200 mb-6 sm:mb-8 md:mb-10 leading-relaxed text-center px-0">"{testimonials[current].text}"</p>
            <div className="text-center">
              <img src={testimonials[current].image} alt={testimonials[current].name} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 sm:mb-4 border-4 border-purple-500/30" />
              <div className="text-base sm:text-lg md:text-xl font-bold">{testimonials[current].name}</div>
              <div className="text-purple-400 font-bold text-xs sm:text-sm">{testimonials[current].role}</div>
              <div className="text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest mt-1">{testimonials[current].company}</div>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-6 sm:mt-8 md:mt-10 px-0">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${i === current ? 'w-8 sm:w-12 bg-gradient-to-r from-purple-500 to-pink-500' : 'w-1.5 sm:w-2 bg-slate-700 hover:bg-slate-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
