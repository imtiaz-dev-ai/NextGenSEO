import React, { useState, useRef, useEffect } from 'react';

// ── Cookie Consent ──────────────────────────────────────────────
const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      const t = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => { localStorage.setItem('cookie_consent', 'accepted'); setVisible(false); };
  const decline = () => { localStorage.setItem('cookie_consent', 'declined'); setVisible(false); };

  if (!visible) return null;

  return (
    <div className="cookie-banner animate-zoom-3d">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <span className="text-2xl shrink-0">🍪</span>
        <div>
          <p className="text-sm font-bold text-white mb-1">We use cookies</p>
          <p className="text-xs text-slate-400">We use cookies to enhance your experience, analyze traffic, and personalize content. By continuing, you agree to our{' '}
            <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={decline} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">Decline</button>
        <button onClick={accept} className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all btn-3d">Accept All</button>
      </div>
    </div>
  );
};

// ── Main Chatbot ────────────────────────────────────────────────
const FloatingActionButton: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi! I'm your SEO expert assistant. Ask me about our professional SEO services, link building packages, keyword research, technical SEO audits, or pricing plans!", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userInput = input.toLowerCase();
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput('');

    setTimeout(() => {
      let response = '';
      if (userInput.includes('price') || userInput.includes('cost') || userInput.includes('pricing')) {
        response = 'Our SEO packages start at $1200/month (Basic: 10 backlinks DA 40+), $4000/month (Standard: 20 backlinks DA 50+), and $6600/month (Premium: 30 backlinks DA 60+). Custom packages from $180/month. Want details?';
      } else if (userInput.includes('backlink') || userInput.includes('link building')) {
        response = 'We provide premium white-hat link building from high-authority domains (DA 40-60+). Editorial links, guest posts, and niche-relevant placements. One link per domain for maximum SEO value!';
      } else if (userInput.includes('keyword') || userInput.includes('research')) {
        response = 'Our keyword research includes semantic mapping, search intent analysis, long-tail discovery, competitor gap analysis, and AI-powered clustering. Want a free keyword audit?';
      } else if (userInput.includes('technical') || userInput.includes('audit')) {
        response = 'Our technical SEO audit covers Core Web Vitals, mobile responsiveness, schema markup, crawl budget, JavaScript SEO, HTTPS security, and XML sitemaps. Need a technical audit?';
      } else if (userInput.includes('local')) {
        response = 'We specialize in Local SEO — Google Business Profile optimization, local citations, NAP consistency, map pack rankings, and location-based keywords. Dominate your local market!';
      } else if (userInput.includes('contact') || userInput.includes('call') || userInput.includes('email')) {
        response = 'Reach us at: 📧 tayyab@nextgenseo.pro | 📞 +92 348 0440402 | 💬 WhatsApp us using the green button! We respond within 24 hours.';
      } else if (userInput.includes('package') || userInput.includes('plan')) {
        response = 'We offer Basic ($1200), Standard ($4000), Premium ($6600), and Custom (from $180) packages. Each includes backlinks, traffic growth, keyword research, and full SEO optimization!';
      } else {
        response = 'I can help with: SEO Pricing, Link Building, Keyword Research, Technical SEO, Local SEO, Traffic Growth, and Custom Solutions. What would you like to know?';
      }
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 600);
  };

  return (
    <>
      <CookieConsent />

      {/* Stacked floating buttons — bottom right */}
      <div className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 z-[70] flex flex-col items-center gap-3">
        {/* WhatsApp Button — above chat */}
        <a
          href="https://wa.me/923480440402?text=Hi%20NextGen%20SEO%2C%20I%20need%20help%20with%20SEO!"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl whatsapp-pulse transition-all hover:scale-110"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>

        {/* Chat Button — bottom */}
        <button
          onClick={() => setShowChat(!showChat)}
          aria-label="Toggle SEO assistant chat"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-2xl shadow-purple-500/40 btn-3d animate-pulse-ring"
        >
        {showChat ? (
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        </button>
      </div>

      {/* Chat Window */}
      <div className={`fixed bottom-[9rem] sm:bottom-[10.5rem] right-4 left-4 sm:left-auto sm:right-8 sm:w-80 md:w-96 h-[420px] sm:h-[500px] max-h-[calc(100vh-12rem)] glass-premium rounded-2xl sm:rounded-3xl shadow-2xl z-[70] flex flex-col border border-purple-500/20 overflow-hidden transition-all duration-300 ${showChat ? 'opacity-100 pointer-events-auto translate-y-0 animate-zoom-3d' : 'opacity-0 pointer-events-none translate-y-4 invisible'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 sm:p-5 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl animate-float-3d">🤖</div>
              <div>
                <div className="font-black text-white text-sm sm:text-base">SEO Expert Assistant</div>
                <div className="text-xs text-white/80 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Online — Ask me anything!
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[82%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.isBot ? 'bg-slate-800/60 border border-white/8 text-slate-200' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {['Pricing', 'Link Building', 'Technical SEO', 'Contact Us'].map(r => (
                <button key={r} onClick={() => { setInput(r); setTimeout(() => handleSend(), 0); setMessages(prev => [...prev, { text: r, isBot: false }]); setInput(''); setTimeout(() => { const responses: Record<string, string> = { 'Pricing': 'Our SEO packages start at $1200/month (Basic), $4000/month (Standard), and $6600/month (Premium). Custom from $180/month!', 'Link Building': 'We provide premium white-hat link building from DA 40-60+ domains. Editorial links, guest posts, niche placements!', 'Technical SEO': 'Our technical SEO covers Core Web Vitals, schema markup, crawl budget, mobile SEO, and HTTPS security!', 'Contact Us': 'Reach us: 📧 tayyab@nextgenseo.pro | 📞 +92 348 0440402 | WhatsApp button on the left!' }; setMessages(prev => [...prev, { text: responses[r] || 'How can I help you?', isBot: true }]); }, 600); }}
                  className="px-3 py-1.5 rounded-xl glass text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all border border-white/10">
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-white/8 shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about SEO services..."
                className="flex-1 bg-slate-800/60 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-slate-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-3 sm:px-4 rounded-xl transition-all disabled:opacity-40 btn-3d"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
    </>
  );
};

export default FloatingActionButton;
