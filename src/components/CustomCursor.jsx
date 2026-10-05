import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check touch screen capability
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Detect hover target
      const target = e.target.closest('a, button, [data-cursor]');
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor');
        setCursorText(text || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Glow Ring */}
      <motion.div
        className={`absolute rounded-full border border-cyan-400/50 flex items-center justify-center transition-all duration-150 ease-out ${
          isHovered
            ? 'w-16 h-16 -ml-8 -mt-8 bg-cyan-500/10 backdrop-blur-[2px] border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
            : 'w-8 h-8 -ml-4 -mt-4 bg-transparent'
        }`}
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.2 }}
      >
        {cursorText && (
          <span className="text-[9px] font-mono-tech font-bold tracking-widest text-cyan-300 uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Crisp Dot */}
      <motion.div
        className="absolute w-2 h-2 -ml-1 -mt-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#00F0FF]"
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 50, mass: 0.05 }}
      />
    </div>
  );
}
