import React from 'react';

const Team = () => {
  const [customMembers, setCustomMembers] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    const saved = localStorage.getItem('teamMembers');
    if (saved) setCustomMembers(JSON.parse(saved));
  }, []);

  const defaultMembers = [
    { name: "Tayyab Mehmood", role: "Founder & CEO", img: "/pics/New%20folder/Tayyab 2.png", linkedin: "https://www.linkedin.com/in/tayyab-mehmood-67101530b/", instagram: "https://www.instagram.com/tayyab_backlinks?igsh=cnQ1cXF0OGV0cnBt", facebook: "https://www.facebook.com/share/182MuBD7pM/" },
    { name: "Fatima Ahad", role: "Senior Link Builder", img: "/pics/New%20folder/Fatima%20Ahad.png", linkedin: "https://www.linkedin.com/in/fatima-ahad-8a7354396/" },
    { name: "Mahmood Akhtar", role: "Senior Link Builder", img: "/pics/New%20folder/Mahmood%20Akthar.png", linkedin: "https://www.linkedin.com/in/mahmood-seo/" },
    { name: "Islam Mehmood", role: "Outreach Manager", img: "/pics/New%20folder/Islam%20Mehmood.png", linkedin: "https://www.linkedin.com/in/islam-mehmood-seo/" },
    { name: "Muhammad Touheed", role: "Junior Outreach Manager", img: "/pics/New%20folder/Muhammad Touheed.png", linkedin: "https://www.linkedin.com/in/muhammad-touheed-7295093a2" },
    { name: "Haroon Hussain", role: "SEO Specialist", img: "/pics/New%20folder/Haroon%20Hussain.png", linkedin: "https://www.linkedin.com/in/haroon-hussain-7a49293a7/" },
    { name: "Muhammad Fahad", role: "SEO Analyst", img: "/pics/New%20folder/M%20fahad.png", linkedin: "https://www.linkedin.com/in/muhammad-fahad-9859823a5/" },
    { name: "Nabeel Butt", role: "SEO Intern", img: "/pics/New%20folder/Nabeel%20Butt.png", linkedin: "https://www.linkedin.com/in/nabeel-butt-seo/" },
    { name: "Imtiaz Hussain", role: "AI & Full Stack Developer", img: "/pics/New%20folder/Imtiaz%20Hussain.png", linkedin: "https://www.linkedin.com/in/imtiaz-hussain" }
  ];

  const allMembers = [...customMembers, ...defaultMembers];

  return (
    <div className="mb-32">
      <h2 className="text-5xl font-black mb-6 text-center">Meet Our <span className="gradient-text">Expert Team</span></h2>
      <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">Dedicated professionals with 10+ years of combined SEO expertise</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allMembers.map((member, i) => (
          <div key={i} className="glass p-6 rounded-3xl hover-lift group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              {member.img || member.image ? (
                <div className="w-64 h-80 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-500/60 transition-all">
                  <img 
                    src={member.img || member.image} 
                    alt={`${member.name} - ${member.role} at NextGen SEO Agency`}
                    loading="lazy"
                    width="256"
                    height="320"
                    className="w-full h-full object-cover object-center" 
                  />
                </div>
              ) : null}
              <h3 className="text-xl font-black mb-2 text-center">{member.name}</h3>
              <p className="text-purple-400 text-sm font-bold mb-4 text-center">{member.role}</p>
              {member.bio && (
                <p className="text-slate-400 text-xs mb-4 text-center leading-relaxed">{member.bio}</p>
              )}
              {(member.linkedin || member.instagram || member.facebook || member.twitter) && (
                <div className="flex justify-center gap-3">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn Profile`} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center group/icon">
                      <svg className="w-5 h-5 group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  )}
                  {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Instagram Profile`} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center group/icon">
                      <svg className="w-5 h-5 group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                  )}
                  {member.facebook && (
                    <a href={member.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Facebook Profile`} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center group/icon">
                      <svg className="w-5 h-5 group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} Twitter Profile`} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all flex items-center justify-center group/icon">
                      <svg className="w-5 h-5 group-hover/icon:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
