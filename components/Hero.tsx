import React, { lazy, Suspense } from 'react';
import { AppRoute } from '../types';
const AnimatedStats = lazy(() => import('./AnimatedStats'));

interface HeroProps {
  onStart: (route: AppRoute) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 overflow-hidden min-h-[85vh] sm:min-h-[95vh] flex flex-col justify-center">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 w-full px-0">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-purple-400 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-6 sm:mb-12">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"></span>
          Next-Generation SEO Agency
        </div>
        
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-4 sm:mb-8 md:mb-10 leading-[0.9] px-0 animate-in">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">#1 SEO Agency</span> <br className="hidden sm:block" />
          for <span className="gradient-text">Link Building</span>
        </h1>
        
        <p className="text-sm sm:text-lg md:text-2xl lg:text-3xl text-slate-400 max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-14 leading-relaxed sm:leading-tight font-medium tracking-tight px-0">
          From <span className="text-slate-100 font-bold">high-authority guest posts</span> to <span className="text-slate-100 font-bold">permanent do-follow link insertions</span> — NextGen SEO drives faster organic growth with transparent metrics and a hand-vetted publisher network. <span className="text-slate-100 font-bold">You approve, we execute.</span>
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-14 md:mb-16 px-0">
          <button 
            onClick={() => onStart(AppRoute.CONTACT)}
            className="group relative w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base md:text-lg lg:text-xl transition-all shadow-2xl shadow-purple-500/50 active:scale-95 overflow-hidden hover-lift"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
              Book a Call
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
          <button
            onClick={() => onStart(AppRoute.MARKETPLACE)}
            className="group w-full sm:w-auto glass px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base md:text-lg lg:text-xl hover:bg-white/10 transition-all border border-white/10 hover:border-purple-500/40"
          >
            <span className="flex items-center justify-center gap-2">
              See How It Works
              <svg className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-12 sm:mb-20 md:mb-24">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-base sm:text-lg">⭐</span>
            <span className="text-slate-300 text-xs sm:text-sm font-bold">Trusted by <span className="text-white font-black">500+</span> SaaS brands worldwide</span>
          </div>
          <div className="w-px h-5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400 text-sm">
              {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
            </div>
            <span className="text-slate-300 text-xs sm:text-sm font-bold"><span className="text-white font-black">4.8/5</span> on SEO Reviews</span>
          </div>
        </div>

        <div className="pt-8 sm:pt-10 md:pt-12 border-t border-white/5 max-w-6xl mx-auto opacity-60 transition-all hover:opacity-100 duration-500">
          <Suspense fallback={null}>
            <AnimatedStats stats={[
              { label: 'Growth', value: 450, suffix: '%+' },
              { label: 'Clients', value: 200, suffix: '+' },
              { label: 'Links', value: 50, suffix: 'K+' },
              { label: 'Authority', value: 99, suffix: '+' },
              { label: 'Experience', value: 10, suffix: '+' }
            ]} />
          </Suspense>
        </div>

        {/* Floating badges - desktop only */}
      </div>
    </div>
  );
};

export default Hero;
