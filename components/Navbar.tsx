import React, { useState } from 'react';
import { AppRoute } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  currentRoute: AppRoute;
  setRoute: (route: AppRoute) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentRoute, setRoute }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navAction = (route: AppRoute) => {
    setRoute(route);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 h-20 sm:h-24 flex items-center px-3 sm:px-6 md:px-12 justify-between backdrop-blur-xl" role="navigation" aria-label="Main navigation">
      <div 
        className="flex items-center gap-1 sm:gap-2 cursor-pointer group shrink-0"
        onClick={() => navAction(AppRoute.HOME)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && navAction(AppRoute.HOME)}
      >
        <img src="/pics/logo.png" alt="NextGen SEO Agency Logo" width="96" height="96" className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 object-contain group-hover:scale-110 transition-all duration-500 filter drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] group-hover:drop-shadow-[0_0_30px_rgba(236,72,153,1)] animate-pulse group-hover:rotate-[360deg]" />
        <span className="text-sm sm:text-lg md:text-2xl font-black tracking-tighter hidden sm:inline group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">NextGen<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">SEO</span></span>
        <span className="text-xs font-black tracking-tighter sm:hidden">NG<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">SEO</span></span>
      </div>

      <div className="hidden lg:flex items-center gap-6 xl:gap-8">
        <button onClick={() => navAction(AppRoute.HOME)} aria-label="Navigate to home page" className={`text-xs xl:text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 ${currentRoute === AppRoute.HOME ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`}>Home</button>
        
        <div className="relative group/sub">
          <button className={`text-xs xl:text-sm font-bold uppercase tracking-wider flex items-center gap-1 transition-all hover:scale-105 ${currentRoute.startsWith('service') ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`} aria-label="Services menu" aria-haspopup="true" aria-expanded="false">
            Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300" role="menu">
            <div className="glass border border-white/10 w-56 rounded-2xl overflow-hidden shadow-2xl">
              <button onClick={() => navAction(AppRoute.SERVICE_ONPAGE)} aria-label="Navigate to On-Page SEO service" role="menuitem" className="w-full text-left px-5 py-4 text-xs font-bold uppercase text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all">On-Page SEO</button>
              <button onClick={() => navAction(AppRoute.SERVICE_OFFPAGE)} aria-label="Navigate to Off-Page SEO service" role="menuitem" className="w-full text-left px-5 py-4 text-xs font-bold uppercase text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all">Off-Page SEO</button>
              <button onClick={() => navAction(AppRoute.SERVICE_TECHNICAL)} aria-label="Navigate to Technical SEO service" role="menuitem" className="w-full text-left px-5 py-4 text-xs font-bold uppercase text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all">Technical SEO</button>
              <button onClick={() => navAction(AppRoute.SERVICE_AI)} aria-label="Navigate to AI-Powered SEO service" role="menuitem" className="w-full text-left px-5 py-4 text-xs font-bold uppercase text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all">AI-Powered SEO</button>
            </div>
          </div>
        </div>

        <button onClick={() => navAction(AppRoute.PRICING)} aria-label="Navigate to pricing page" className={`text-xs xl:text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 ${currentRoute === AppRoute.PRICING ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`}>Pricing</button>
        <button onClick={() => navAction(AppRoute.CASE_STUDIES)} aria-label="Navigate to case studies page" className={`text-xs xl:text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 ${currentRoute === AppRoute.CASE_STUDIES ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`}>Cases</button>
        
        <div className="relative group/company">
          <button className={`text-xs xl:text-sm font-bold uppercase tracking-wider flex items-center gap-1 transition-all hover:scale-105 ${currentRoute === AppRoute.ABOUT || currentRoute === AppRoute.TEAM ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`} aria-label="Company menu" aria-haspopup="true" aria-expanded="false">
            Company
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/company:opacity-100 group-hover/company:visible transition-all duration-300" role="menu">
            <div className="glass border border-white/10 w-48 rounded-2xl overflow-hidden shadow-2xl">
              <button onClick={() => navAction(AppRoute.ABOUT)} aria-label="Navigate to about page" role="menuitem" className="w-full text-left px-5 py-4 text-xs font-bold uppercase text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all">About Us</button>
              <button onClick={() => navAction(AppRoute.TEAM)} aria-label="Navigate to team page" role="menuitem" className="w-full text-left px-5 py-4 text-xs font-bold uppercase text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all">Our Team</button>
            </div>
          </div>
        </div>

        <button onClick={() => navAction(AppRoute.BLOG)} aria-label="Navigate to blog page" className={`text-xs xl:text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 ${currentRoute === AppRoute.BLOG ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`}>Blog</button>
        <ThemeToggle />
        <button onClick={() => navAction(AppRoute.CONTACT)} aria-label="Navigate to contact page" className={`text-xs xl:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500 hover:to-pink-500 px-6 py-3 rounded-xl transition-all hover:scale-105 border border-purple-500/30 ${currentRoute === AppRoute.CONTACT ? 'text-white from-purple-500 to-pink-500' : 'text-purple-400 hover:text-white'}`}>Contact</button>
      </div>

      <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} className="lg:hidden text-slate-400 p-2 min-w-[44px] min-h-[44px]">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-20 sm:top-24 left-0 right-0 glass border-b border-white/10 p-4 sm:p-6 flex flex-col gap-2 sm:gap-4 lg:hidden max-h-[90vh] overflow-y-auto" role="menu">
          <button onClick={() => navAction(AppRoute.HOME)} role="menuitem" className="text-left font-bold uppercase text-slate-300 px-3 py-2 text-xs sm:text-sm hover:text-sky-400 transition-colors">Home</button>
          
          <div className="border-t border-white/5 my-2 pt-2">
            <div className="text-xs uppercase font-black text-slate-500 px-3 py-1 mb-2">SEO Services</div>
            <button onClick={() => navAction(AppRoute.SERVICE_ONPAGE)} role="menuitem" className="w-full text-left font-bold uppercase text-slate-300 pl-6 text-xs sm:text-sm py-2 hover:text-sky-400 transition-colors">On-Page SEO</button>
            <button onClick={() => navAction(AppRoute.SERVICE_OFFPAGE)} role="menuitem" className="w-full text-left font-bold uppercase text-slate-300 pl-6 text-xs sm:text-sm py-2 hover:text-sky-400 transition-colors">Off-Page & Link Building</button>
            <button onClick={() => navAction(AppRoute.SERVICE_TECHNICAL)} role="menuitem" className="w-full text-left font-bold uppercase text-slate-300 pl-6 text-xs sm:text-sm py-2 hover:text-sky-400 transition-colors">Technical SEO</button>
            <button onClick={() => navAction(AppRoute.SERVICE_AI)} role="menuitem" className="w-full text-left font-bold uppercase text-slate-300 pl-6 text-xs sm:text-sm py-2 hover:text-sky-400 transition-colors">AI-Powered SEO</button>
          </div>

          <div className="border-t border-white/5 my-2 pt-2">
            <button onClick={() => navAction(AppRoute.PRICING)} role="menuitem" className="w-full text-left font-bold uppercase text-slate-300 px-3 py-2 text-xs sm:text-sm hover:text-sky-400 transition-colors">Pricing</button>
            <button onClick={() => navAction(AppRoute.CASE_STUDIES)} role="menuitem" className="w-full text-left font-bold uppercase text-slate-300 px-3 py-2 text-xs sm:text-sm hover:text-sky-400 transition-colors">Case Studies</button>
            <button onClick={() => navAction(AppRoute.ABOUT)} role="menuitem" className="w-full text-left font-bold uppercase text-slate-300 px-3 py-2 text-xs sm:text-sm hover:text-sky-400 transition-colors">About</button>
            <button onClick={() => navAction(AppRoute.TEAM)} role="menuitem" className="w-full text-left font-bold uppercase text-slate-300 px-3 py-2 text-xs sm:text-sm hover:text-sky-400 transition-colors">Our Team</button>
            <button onClick={() => navAction(AppRoute.BLOG)} role="menuitem" className="w-full text-left font-bold uppercase text-slate-300 px-3 py-2 text-xs sm:text-sm hover:text-sky-400 transition-colors">Blog</button>
            <button onClick={() => navAction(AppRoute.CONTACT)} role="menuitem" className="w-full text-left font-bold uppercase bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 text-purple-400 px-3 py-2 text-xs sm:text-sm rounded-lg mt-2 transition-colors">Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;