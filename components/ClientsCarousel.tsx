import React from 'react';

const ClientsCarousel: React.FC = () => {
  const clients = [
    { name: 'Digital Slack', logo: '/pics/sites pic/Digital Slack.png' },
    { name: 'HubSpot', logo: '/pics/sites pic/HubSpot.png' },
    { name: 'InBeat', logo: '/pics/sites pic/InBeat.png' },
    { name: 'Job Seeker', logo: '/pics/sites pic/Job Seeker.png' },
    { name: 'Marketer Milk', logo: '/pics/sites pic/Marketer Milk.png' },
    { name: 'SaaS Pro', logo: '/pics/sites pic/saas po.png' },
    { name: 'SemRush', logo: '/pics/sites pic/SemRush.png' },
    { name: 'Stripe', logo: '/pics/sites pic/Stripe.png' },
    { name: 'WebFlow', logo: '/pics/sites pic/WebFlow.png' },
    { name: 'Wiz Omnisend', logo: '/pics/sites pic/Wizaomnisend.png' },
  ];

  return (
    <div className="py-16 px-6 bg-gradient-to-r from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
            Trusted by <span className="gradient-text">Leading Brands</span>
          </h2>
          <p className="text-slate-400 text-lg">
            200+ businesses growing with NextGen SEO
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {/* First set */}
            {clients.map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 h-40 glass rounded-2xl flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group border border-white/10 hover:border-purple-500/50 p-4"
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  loading="lazy"
                  className="w-24 h-24 object-contain rounded-lg mb-3 group-hover:scale-110 transition-transform"
                />
                <p className="text-sm font-bold text-center text-slate-300 group-hover:text-white transition-colors">
                  {client.name}
                </p>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {clients.map((client, i) => (
              <div
                key={`duplicate-${i}`}
                className="flex-shrink-0 w-40 h-40 glass rounded-2xl flex flex-col items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer group border border-white/10 hover:border-purple-500/50 p-4"
              >
                <img 
                  src={client.logo} 
                  alt={client.name}
                  loading="lazy"
                  className="w-24 h-24 object-contain rounded-lg mb-3 group-hover:scale-110 transition-transform"
                />
                <p className="text-sm font-bold text-center text-slate-300 group-hover:text-white transition-colors">
                  {client.name}
                </p>
              </div>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 15s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ClientsCarousel;
