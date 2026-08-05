import React, { useState } from 'react';
import { AppRoute } from '../types';

interface NavbarProps {
  currentRoute: AppRoute;
  setRoute: (route: AppRoute) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentRoute, setRoute }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-[#020617] border-b border-white/5 h-20 sm:h-24 flex items-center px-3 sm:px-6 md:px-12 justify-between" role="navigation" aria-label="Main navigation">
      <a
        href="/"
        onClick={(e) => navAction(AppRoute.HOME, e)}
        className="flex items-center gap-1 sm:gap-2 cursor-pointer group shrink-0"
      >
        <img src="/pics/logo .webp" alt="NextGen SEO Agency Logo" width="96" height="96" className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 object-contain group-hover:scale-110 transition-all duration-300 filter drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
        <span className="text-sm sm:text-lg md:text-2xl font-black tracking-tighter hidden sm:inline group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">NextGen<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">SEO</span></span>
        <span className="text-xs font-black tracking-tighter sm:hidden">NG<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">SEO</span></span>
      </a>

      {/* Desktop nav */}
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

      {/* Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl text-slate-300 hover:bg-white/5 transition-colors">
        {menuOpen
          ? <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          : <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        }
      </button>

      {/* Mobile menu — right side drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-[#020617] border-l border-white/10 p-4 flex flex-col gap-1 overflow-y-auto overscroll-contain" onClick={(e) => e.stopPropagation()}>
          <NavLink route={AppRoute.HOME} label="Home" className={`block font-bold uppercase px-4 py-3 text-sm rounded-xl transition-colors ${currentRoute === AppRoute.HOME ? 'text-purple-400 bg-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`} />

          <div className="pt-2">
            <div className="text-[10px] uppercase font-black text-slate-500 px-4 pb-1 tracking-widest">Services</div>
            <NavLink route={AppRoute.SERVICE_ONPAGE} label="On-Page SEO" className={`block font-bold uppercase px-4 py-3 text-sm rounded-xl transition-colors ${currentRoute === AppRoute.SERVICE_ONPAGE ? 'text-purple-400 bg-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`} />
            <NavLink route={AppRoute.SERVICE_OFFPAGE} label="Off-Page & PR" className={`block font-bold uppercase px-4 py-3 text-sm rounded-xl transition-colors ${currentRoute === AppRoute.SERVICE_OFFPAGE ? 'text-purple-400 bg-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`} />
            <NavLink route={AppRoute.SERVICE_TECHNICAL} label="Technical SEO" className={`block font-bold uppercase px-4 py-3 text-sm rounded-xl transition-colors ${currentRoute === AppRoute.SERVICE_TECHNICAL ? 'text-purple-400 bg-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`} />
            <NavLink route={AppRoute.SERVICE_AI} label="AI Solutions" className={`block font-bold uppercase px-4 py-3 text-sm rounded-xl transition-colors ${currentRoute === AppRoute.SERVICE_AI ? 'text-purple-400 bg-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`} />
          </div>

          <div className="pt-2 border-t border-white/5">
            <div className="text-[10px] uppercase font-black text-slate-500 px-4 pb-1 tracking-widest">Company</div>
            <NavLink route={AppRoute.ABOUT} label="About Us" className={`block font-bold uppercase px-4 py-3 text-sm rounded-xl transition-colors ${currentRoute === AppRoute.ABOUT ? 'text-purple-400 bg-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`} />
            <NavLink route={AppRoute.TEAM} label="Our Team" className={`block font-bold uppercase px-4 py-3 text-sm rounded-xl transition-colors ${currentRoute === AppRoute.TEAM ? 'text-purple-400 bg-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`} />
            <NavLink route={AppRoute.BLOG} label="Blog" className={`block font-bold uppercase px-4 py-3 text-sm rounded-xl transition-colors ${currentRoute === AppRoute.BLOG ? 'text-purple-400 bg-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`} />
            <NavLink route={AppRoute.PRICING} label="Pricing" className={`block font-bold uppercase px-4 py-3 text-sm rounded-xl transition-colors ${currentRoute === AppRoute.PRICING ? 'text-purple-400 bg-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`} />
            <NavLink route={AppRoute.CASE_STUDIES} label="Case Studies" className={`block font-bold uppercase px-4 py-3 text-sm rounded-xl transition-colors ${currentRoute === AppRoute.CASE_STUDIES ? 'text-purple-400 bg-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`} />
          </div>

          <div className="pt-3 pb-2">
            <NavLink route={AppRoute.CONTACT} label="Contact Us" className="block text-center font-black uppercase bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-4 text-sm rounded-2xl shadow-lg shadow-purple-500/20" />
          </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
