import React from 'react';
import { AppRoute } from '../types';
import AnimatedStats from './AnimatedStats';

interface HeroProps {
  onStart: (route: AppRoute) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 overflow-hidden min-h-[85vh] sm:min-h-[95vh] flex flex-col justify-center">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-500/20 rounded-full blur-[120px] sm:blur-[160px] opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-pink-600/20 rounded-full blur-[120px] sm:blur-[160px] opacity-60 animate-float" />
        <div className="absolute top-1/2 left-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-cyan-500/10 rounded-full blur-[100px] opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 w-full px-0">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 text-purple-400 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-6 sm:mb-12 animate-glow">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-purple-500"></span>
          </span>
          Next-Generation SEO Agency
        </div>
        
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-4 sm:mb-8 md:mb-10 leading-[0.9] px-0 animate-in">
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">SEO Services</span> <br className="hidden sm:block" />
          for <span className="gradient-text">Organic Growth</span>
        </h1>
        
        <p className="text-sm sm:text-lg md:text-2xl lg:text-3xl text-slate-400 max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-14 leading-relaxed sm:leading-tight font-medium tracking-tight px-0">
          NextGen SEO is a professional <span className="text-slate-100 font-bold">AI SEO agency</span> specializing in <span className="text-slate-100 font-bold">keyword research</span>, <span className="text-slate-100 font-bold">technical SEO audits</span>, <span className="text-slate-100 font-bold">white-hat link building</span>, and <span className="text-slate-100 font-bold">content optimization</span> to drive organic traffic and increase Google rankings.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-20 md:mb-24 px-0">
          <button 
            onClick={() => onStart(AppRoute.CONTACT)}
            className="group relative w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base md:text-lg lg:text-xl transition-all shadow-2xl shadow-purple-500/50 active:scale-95 overflow-hidden hover-lift"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
              Book a Consultation
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
          {/* Removed AI tool CTA */}
        </div>

        <div className="pt-8 sm:pt-10 md:pt-12 border-t border-white/5 max-w-6xl mx-auto opacity-60 transition-all hover:opacity-100 duration-500">
          <AnimatedStats stats={[
            { label: 'Growth', value: 450, suffix: '%+' },
            { label: 'Clients', value: 200, suffix: '+' },
            { label: 'Links', value: 50, suffix: 'K+' },
            { label: 'Authority', value: 99, suffix: '+' },
            { label: 'Experience', value: 10, suffix: '+' }
          ]} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
