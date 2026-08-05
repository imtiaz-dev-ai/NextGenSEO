import React from 'react';

const ClientsCarousel: React.FC = () => {
  const clients = [
    { name: 'Digital Slack', logo: '/pics/sites pic/Digital Slack.webp' },
    { name: 'HubSpot', logo: '/pics/sites pic/HubSpot.webp' },
    { name: 'InBeat', logo: '/pics/sites pic/InBeat.webp' },
    { name: 'Job Seeker', logo: '/pics/sites pic/Job Seeker.webp' },
    { name: 'Marketer Milk', logo: '/pics/sites pic/Marketer Milk.webp' },
    { name: 'SaaS Pro', logo: '/pics/sites pic/saas po.webp' },
    { name: 'SemRush', logo: '/pics/sites pic/SemRush.webp' },
    { name: 'Stripe', logo: '/pics/sites pic/Stripe.webp' },
    { name: 'WebFlow', logo: '/pics/sites pic/WebFlow.webp' },
    { name: 'Wiz Omnisend', logo: '/pics/sites pic/Wizaomnisend.webp' },
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-r from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 text-white">
            Trusted by <span className="gradient-text">Leading Brands</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-base">200+ businesses growing with NextGen SEO</p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-3 sm:gap-4 animate-scroll" style={{ width: 'max-content' }}>
            {[...clients, ...clients].map((client, i) => (
              <div key={i} className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 glass rounded-xl flex flex-col items-center justify-center border border-white/10 p-2 sm:p-3">
                <img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  decoding="async"
                  width="80" height="80"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-lg mb-1"
                />
                <p className="text-[9px] sm:text-xs font-bold text-center text-slate-400 leading-tight">{client.name}</p>
              </div>
            ))}
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </div>
  );
};

export default ClientsCarousel;
