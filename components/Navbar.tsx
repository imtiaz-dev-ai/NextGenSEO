import React, { useState } from 'react';
import { AppRoute } from '../types';

interface NavbarProps {
  currentRoute: AppRoute;
  setRoute: (route: AppRoute) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentRoute, setRoute }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navAction = (route: AppRoute, e?: React.MouseEvent) => {
    if (e && (e.ctrlKey || e.metaKey || e.shiftKey)) return;
    if (e) e.preventDefault();
    setRoute(route);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const NavLink = ({ route, label, className }: { route: AppRoute; label: string; className?: string }) => (
    <a
      href={route === AppRoute.HOME ? '/' : `/${route}`}
      onClick={(e) => navAction(route, e)}
      className={className}
    >
      {label}
    </a>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 h-20 sm:h-24 flex items-center px-3 sm:px-6 md:px-12 justify-between backdrop-blur-xl" role="navigation" aria-label="Main navigation">
      <a
        href="/"
        onClick={(e) => navAction(AppRoute.HOME, e)}
        className="flex items-center gap-1 sm:gap-2 cursor-pointer group shrink-0"
      >
        <img src="/pics/logo.png" alt="NextGen SEO Agency Logo" width="96" height="96" className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 object-contain group-hover:scale-110 transition-all duration-500 filter drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] group-hover:drop-shadow-[0_0_30px_rgba(236,72,153,1)] animate-pulse group-hover:rotate-[360deg]" />
        <span className="text-sm sm:text-lg md:text-2xl font-black tracking-tighter hidden sm:inline group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">NextGen<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">SEO</span></span>
        <span className="text-xs font-black tracking-tighter sm:hidden">NG<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">SEO</span></span>
      </a>

      <div className="hidden lg:flex items-center gap-6 xl:gap-8">
        <NavLink route={AppRoute.HOME} label="Home" className={`text-xs xl:text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 ${currentRoute === AppRoute.HOME ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`} />

        <div className="relative group/sub">
          <button className={`text-xs xl:text-sm font-bold uppercase tracking-wider flex items-center gap-1 transition-all hover:scale-105 ${currentRoute.startsWith('service') ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`}>
            Services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300">
            <div className="glass border border-white/10 w-56 rounded-2xl overflow-hidden shadow-2xl">
              <NavLink route={AppRoute.SERVICE_ONPAGE} label="On-Page SEO" className="block w-full text-left px-5 py-4 text-xs font-bold uppercase text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all" />
              <NavLink route={AppRoute.SERVICE_OFFPAGE} label="Off-Page SEO" className="block w-full text-left px-5 py-4 text-xs font-bold uppercase text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all" />
              <NavLink route={AppRoute.SERVICE_TECHNICAL} label="Technical SEO" className="block w-full text-left px-5 py-4 text-xs font-bold uppercase text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all" />
              <NavLink route={AppRoute.SERVICE_AI} label="AI-Powered SEO" className="block w-full text-left px-5 py-4 text-xs font-bold uppercase text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all" />
            </div>
          </div>
        </div>

        <NavLink route={AppRoute.PRICING} label="Pricing" className={`text-xs xl:text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 ${currentRoute === AppRoute.PRICING ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`} />
        <NavLink route={AppRoute.CASE_STUDIES} label="Cases" className={`text-xs xl:text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 ${currentRoute === AppRoute.CASE_STUDIES ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`} />

        <div className="relative group/company">
          <button className={`text-xs xl:text-sm font-bold uppercase tracking-wider flex items-center gap-1 transition-all hover:scale-105 ${currentRoute === AppRoute.ABOUT || currentRoute === AppRoute.TEAM ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`}>
            Company
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/company:opacity-100 group-hover/company:visible transition-all duration-300">
            <div className="glass border border-white/10 w-48 rounded-2xl overflow-hidden shadow-2xl">
              <NavLink route={AppRoute.ABOUT} label="About Us" className="block w-full text-left px-5 py-4 text-xs font-bold uppercase text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all" />
              <NavLink route={AppRoute.TEAM} label="Our Team" className="block w-full text-left px-5 py-4 text-xs font-bold uppercase text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all" />
            </div>
          </div>
        </div>

        <NavLink route={AppRoute.BLOG} label="Blog" className={`text-xs xl:text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 ${currentRoute === AppRoute.BLOG ? 'text-purple-400' : 'text-slate-400 hover:text-white'}`} />
        <NavLink route={AppRoute.CONTACT} label="Contact" className={`text-xs xl:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500 hover:to-pink-500 px-6 py-3 rounded-xl transition-all hover:scale-105 border border-purple-500/30 ${currentRoute === AppRoute.CONTACT ? 'text-white from-purple-500 to-pink-500' : 'text-purple-400 hover:text-white'}`} />
      </div>

      <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} className="lg:hidden text-slate-400 p-2 min-w-[44px] min-h-[44px]">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-20 sm:top-24 left-0 right-0 glass border-b border-white/10 p-4 sm:p-6 flex flex-col gap-2 sm:gap-4 lg:hidden max-h-[90vh] overflow-y-auto">
          <NavLink route={AppRoute.HOME} label="Home" className="block font-bold uppercase text-slate-300 px-3 py-2 text-xs sm:text-sm hover:text-sky-400 transition-colors" />

          <div className="border-t border-white/5 my-2 pt-2">
            <div className="text-xs uppercase font-black text-slate-500 px-3 py-1 mb-2">SEO Services</div>
            <NavLink route={AppRoute.SERVICE_ONPAGE} label="On-Page SEO" className="block font-bold uppercase text-slate-300 pl-6 text-xs sm:text-sm py-2 hover:text-sky-400 transition-colors" />
            <NavLink route={AppRoute.SERVICE_OFFPAGE} label="Off-Page & Link Building" className="block font-bold uppercase text-slate-300 pl-6 text-xs sm:text-sm py-2 hover:text-sky-400 transition-colors" />
            <NavLink route={AppRoute.SERVICE_TECHNICAL} label="Technical SEO" className="block font-bold uppercase text-slate-300 pl-6 text-xs sm:text-sm py-2 hover:text-sky-400 transition-colors" />
            <NavLink route={AppRoute.SERVICE_AI} label="AI-Powered SEO" className="block font-bold uppercase text-slate-300 pl-6 text-xs sm:text-sm py-2 hover:text-sky-400 transition-colors" />
          </div>

          <div className="border-t border-white/5 my-2 pt-2">
            <NavLink route={AppRoute.PRICING} label="Pricing" className="block font-bold uppercase text-slate-300 px-3 py-2 text-xs sm:text-sm hover:text-sky-400 transition-colors" />
            <NavLink route={AppRoute.CASE_STUDIES} label="Case Studies" className="block font-bold uppercase text-slate-300 px-3 py-2 text-xs sm:text-sm hover:text-sky-400 transition-colors" />
            <NavLink route={AppRoute.ABOUT} label="About" className="block font-bold uppercase text-slate-300 px-3 py-2 text-xs sm:text-sm hover:text-sky-400 transition-colors" />
            <NavLink route={AppRoute.TEAM} label="Our Team" className="block font-bold uppercase text-slate-300 px-3 py-2 text-xs sm:text-sm hover:text-sky-400 transition-colors" />
            <NavLink route={AppRoute.BLOG} label="Blog" className="block font-bold uppercase text-slate-300 px-3 py-2 text-xs sm:text-sm hover:text-sky-400 transition-colors" />
            <NavLink route={AppRoute.CONTACT} label="Contact" className="block font-bold uppercase bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 text-purple-400 px-3 py-2 text-xs sm:text-sm rounded-lg mt-2 transition-colors" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
