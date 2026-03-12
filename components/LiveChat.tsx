import React, { useState, useRef, useEffect } from 'react';

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! 👋 How can NextGen SEO help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'Pricing Information',
    'Book Consultation',
    'View Case Studies'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const callGroqAPI = async (userMessage: string) => {
    // Sanitize input to prevent log injection
    const sanitizedMessage = userMessage.replace(/[\n\r]/g, '').trim();
    
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    
    if (!apiKey) {
      return 'API key not configured. Please contact support.';
    }
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are a helpful SEO expert assistant for NextGen SEO Agency founded by Tayyab Mehmood. 
              
Services we offer:
              - Professional SEO Services (On-page, Off-page, Technical SEO)
              - Link Building Services (High-quality backlinks)
              - Local SEO Services
              - Content Marketing & Optimization
              - AI-Powered SEO Solutions
              
Pricing:
              - Basic SEO: $1200/month (10 backlinks, DA 40+)
              - Standard SEO: $4000/month (20 backlinks, DA 50+)
              - Premium SEO: $6600/month (30 backlinks, DA 60+)
              - Custom packages available
              
Contact: nextgenseotool@gmail.com | +92 348 0440402
              
Provide helpful, professional answers about our SEO services. Keep responses under 100 words and conversational.`
            },
            {
              role: 'user',
              content: sanitizedMessage
            }
          ],
          temperature: 0.8,
          max_tokens: 250
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not process that. Please try asking differently.';
    } catch (error) {
      console.error('Groq API Error:', error);
      return 'I apologize for the inconvenience. Our AI is temporarily unavailable. Please contact our team directly at nextgenseotool@gmail.com or call +92 348 0440402 for immediate assistance.';
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    
    // Add user message first
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    
    // Check for admin panel secret command FIRST before API call
    if (userMessage.toLowerCase().includes('admin panel') || 
        userMessage.toLowerCase().includes('give me admin') || 
        userMessage.toLowerCase().includes('show admin')) {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: '🔐 Admin Panel Access Granted!\n\nCredentials:\nUsername: nextgenadmin\nPassword: NextGen@2025\n\nClick to access: ' + window.location.origin + '/#admin\n\nOr refresh the page - you\'ll be redirected automatically.' 
      }]);
      
      // Auto redirect after 2 seconds
      setTimeout(() => {
        window.location.hash = 'admin';
        window.location.reload();
      }, 2000);
      return;
    }
    
    setIsLoading(true);
    
    // Save to localStorage for admin panel
    const chatMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    chatMessages.push({
      id: Date.now().toString(),
      name: 'Website Visitor',
      email: 'N/A',
      message: userMessage,
      timestamp: new Date().toLocaleString()
    });
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    
    const botResponse = await callGroqAPI(userMessage);
    setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  const handleQuickReply = async (reply: string) => {
    setMessages(prev => [...prev, { sender: 'user', text: reply }]);
    setIsLoading(true);
    
    const botResponse = await callGroqAPI(reply);
    setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat support"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-sky-500 hover:bg-sky-600 rounded-full shadow-2xl shadow-sky-500/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        {isOpen ? (
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 sm:bottom-28 right-4 left-4 sm:left-auto sm:right-8 z-50 sm:w-96 h-[500px] sm:h-[500px] max-h-[calc(100vh-8rem)] glass rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center text-xl sm:text-2xl">
              🤖
            </div>
            <div>
              <div className="font-black text-white text-sm sm:text-base">NextGen Support</div>
              <div className="text-xs text-white/80 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Online Now
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${msg.sender === 'user' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-200'}`}>
                  <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-200 px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
            
            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="space-y-2 pt-2 sm:pt-4">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(reply)}
                    className="w-full text-left px-3 sm:px-4 py-2 rounded-xl glass hover:bg-white/10 text-xs sm:text-sm font-medium transition-all"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500/50 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="bg-sky-500 hover:bg-sky-600 px-3 sm:px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;
