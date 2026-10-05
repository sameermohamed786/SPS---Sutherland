import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinematicLoader({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Stage 1: Date reveal (09.23.2026)
    const t1 = setTimeout(() => setStep(1), 600);
    // Stage 2: "A new chapter began."
    const t2 = setTimeout(() => setStep(2), 2200);
    // Stage 3: "SPS / 2026"
    const t3 = setTimeout(() => setStep(3), 4200);
    // Stage 4: Massive scaling typography reveal "SPS SELLER PARTNER SUPPORT"
    const t4 = setTimeout(() => setStep(4), 6200);
    // Stage 5: Final transition directly to hero
    const t5 = setTimeout(() => {
      onComplete();
    }, 9000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#030408] text-white flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Skip button for user convenience */}
      <button
        onClick={onComplete}
        data-cursor="SKIP"
        className="absolute top-8 right-8 text-xs font-mono-tech tracking-widest text-gray-400 hover:text-cyan-400 px-4 py-2 border border-white/10 hover:border-cyan-400 rounded-full transition-all duration-300 z-50 bg-black/40"
      >
        SKIP INTRO →
      </button>

      {/* Atmospheric blue ambient glow in center */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[140px] pointer-events-none animate-pulse-glow" />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="date"
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <span className="font-mono-tech text-cyan-400 text-lg sm:text-2xl tracking-[0.4em] uppercase">
              09.23.2026
            </span>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="chapter"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 1.2 }}
            className="text-center px-6"
          >
            <h2 className="font-display text-2xl sm:text-4xl text-gray-200 tracking-wider font-light">
              A new chapter began.
            </h2>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="tag"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.2)]">
              <span className="font-mono-tech text-cyan-300 text-sm sm:text-lg tracking-[0.5em] font-bold">
                SPS / 2026
              </span>
            </div>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div
            key="massive-title"
            initial={{ opacity: 0, scale: 1.6, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center px-4 flex flex-col items-center justify-center max-w-5xl"
          >
            <motion.h1
              initial={{ letterSpacing: '0.6em' }}
              animate={{ letterSpacing: '0.1em' }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="font-display text-7xl sm:text-9xl md:text-[13rem] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.6)] leading-none"
            >
              SPS
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mt-4 sm:mt-6"
            >
              <p className="font-display text-xl sm:text-3xl md:text-5xl tracking-[0.25em] text-cyan-300 font-extrabold uppercase">
                SELLER PARTNER SUPPORT
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom status loader bar */}
      <div className="absolute bottom-10 left-12 right-12 flex items-center justify-between font-mono-tech text-[10px] text-gray-500 tracking-widest">
        <span>SUTHERLAND CHENNAI</span>
        <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-cyan-400 shadow-[0_0_8px_#00F0FF]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 8.8, ease: 'linear' }}
          />
        </div>
        <span>CHAPTER ONE</span>
      </div>
    </motion.div>
  );
}
