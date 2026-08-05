import React, { useEffect, useRef, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setProgress(totalHeight ? (window.scrollY / totalHeight) * 100 : 0);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100]">
      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ScrollProgress;
