import React, { useState } from 'react';

const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([
    { text: 'Hi! I\'m your SEO expert assistant. Ask me about our professional SEO services, link building packages, keyword research, technical SEO audits, or pricing plans!', isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    const userInput = input.toLowerCase();
    setInput('');

    setTimeout(() => {
      let response = '';
      
      if (userInput.includes('price') || userInput.includes('cost') || userInput.includes('pricing')) {
        response = 'Our professional SEO packages start at $1200/month for Basic SEO (10 backlinks, DA 40+, 2K+ traffic). Standard SEO is $4000/month (20 backlinks, DA 50+), and Premium SEO is $6600/month (30 backlinks, DA 60+, 10K+ traffic). We also offer custom packages starting at $180/month. Want to discuss your specific needs?';
      } else if (userInput.includes('backlink') || userInput.includes('link building')) {
        response = 'We provide premium white-hat link building services from high-authority domains (DA 40-60+). Our backlink packages include editorial links, guest posts, and niche-relevant placements. We guarantee one link per domain for maximum SEO value. Interested in our link building strategy?';
      } else if (userInput.includes('keyword') || userInput.includes('research')) {
        response = 'Our advanced keyword research service includes semantic keyword mapping, search intent analysis, long-tail keyword discovery, competitor keyword gap analysis, and keyword clustering. We use AI-powered tools to find high-converting, low-competition keywords for your niche. Want a free keyword audit?';
      } else if (userInput.includes('technical') || userInput.includes('audit')) {
        response = 'Our technical SEO audit covers Core Web Vitals optimization, mobile responsiveness, schema markup implementation, crawl budget optimization, JavaScript SEO, HTTPS security, and XML sitemap management. We fix all technical barriers preventing Google from ranking your site. Need a technical SEO audit?';
      } else if (userInput.includes('traffic') || userInput.includes('organic')) {
        response = 'We specialize in organic traffic growth through white-hat SEO strategies. Our clients typically see 300%+ traffic increase within 6-12 months. We focus on high-intent keywords, quality content optimization, and authoritative backlinks to drive sustainable organic growth. Ready to scale your traffic?';
      } else if (userInput.includes('rank') || userInput.includes('ranking')) {
        response = 'We help businesses rank #1 on Google through comprehensive SEO strategies including on-page optimization, technical SEO, quality backlinks, and content marketing. Our proven methodology has helped 200+ companies achieve top rankings for competitive keywords. Want to improve your rankings?';
      } else if (userInput.includes('contact') || userInput.includes('call') || userInput.includes('email')) {
        response = 'You can reach us at: Email: tayyabcubicexp@gmail.com | Phone: +92 348 0440402 | Or book a free consultation through our contact form. We respond within 24 hours!';
      } else if (userInput.includes('package') || userInput.includes('plan')) {
        response = 'We offer 4 SEO packages: Basic ($1200), Standard ($4000), Premium ($6600), and Custom (starting $180). Each includes backlinks, traffic growth, keyword research, and SEO optimization. Custom packages let you choose specific services. Which package interests you?';
      } else {
        response = 'I can help you with: SEO Services & Pricing, Link Building Packages, Keyword Research, Technical SEO Audits, Traffic Growth Strategies, Google Rankings, and Custom SEO Solutions. What would you like to know more about?';
      }
      
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 800);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setShowChat(!showChat)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all"
        >
          {showChat ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>
      </div>

      {showChat && (
        <div className="fixed bottom-28 right-8 w-96 h-[500px] glass rounded-3xl shadow-2xl z-50 flex flex-col border border-purple-500/20">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-t-3xl">
            <h3 className="font-black text-lg">SEO Expert Assistant</h3>
            <p className="text-xs opacity-90">Ask about our SEO services, pricing & packages</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.isBot 
                    ? 'bg-slate-800/50 border border-white/10' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about SEO services..."
                className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingActionButton;
