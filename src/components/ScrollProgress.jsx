import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(Math.min(100, Math.max(0, current)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Progress Glow Line */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/10 z-[60] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-sky-300 transition-all duration-75 shadow-[0_0_12px_#00F0FF]"
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>

      {/* Floating Bottom Right Indicator */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-2xl pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-mono-tech text-[10px] tracking-widest text-cyan-300 uppercase">
          CHRONICLE: {Math.round(scrollPercentage)}%
        </span>
      </div>
    </>
  );
}
