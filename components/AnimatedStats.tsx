import React, { useEffect, useState } from 'react';

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

interface AnimatedStatsProps {
  stats: Stat[];
}

const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCount(Math.floor(end * progress));
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [end, duration]);

  return <>{count}{suffix}</>;
};

const AnimatedStats: React.FC<AnimatedStatsProps> = ({ stats }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {stats.map((stat, index) => (
        <div key={index} className="text-center group hover:scale-110 transition-transform duration-300">
          <div className="text-3xl md:text-4xl lg:text-5xl font-black gradient-text mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
            <CountUp end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-slate-400 text-xs md:text-sm font-bold uppercase tracking-wider group-hover:text-slate-300 transition-colors">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedStats;
