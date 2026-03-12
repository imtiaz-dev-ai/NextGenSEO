import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          _subject: 'New Newsletter Subscription',
          _replyto: email
        })
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto glass p-6 sm:p-10 md:p-12 lg:p-16 rounded-2xl md:rounded-[3rem] border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 sm:w-48 md:w-64 h-40 sm:h-48 md:h-64 bg-purple-500/10 rounded-full blur-[80px] md:blur-[100px]" />
        <div className="relative z-10 text-center px-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
            Stay Ahead with <span className="gradient-text">Professional SEO Intelligence</span>
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Get exclusive SEO insights, AI-powered keyword research strategies, technical SEO optimization tips, link building guides, and proven organic search strategies delivered weekly. Master Google ranking techniques and improve your search visibility.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 max-w-xl mx-auto px-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={status === 'loading' || status === 'success'}
              className="flex-1 bg-slate-900/50 border border-white/10 rounded-lg sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-2xl font-black text-xs sm:text-sm md:text-base transition-all shadow-xl shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : status === 'success' ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </form>
          
          <p className="text-slate-500 text-[10px] sm:text-xs mt-4 sm:mt-6">
            Join 10,000+ SEO professionals. Unsubscribe anytime. Learn about keyword research, link building, and organic growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
