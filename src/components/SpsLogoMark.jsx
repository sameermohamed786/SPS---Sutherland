import React from 'react';
import { motion } from 'framer-motion';

/**
 * SPS '26 Custom Brand Identity & Monogram Mark
 * 
 * Concept: 3 interlocking geometric paths representing S - P - S
 * Symbolizing: 3 pillars (Seller, Partner, Support), unity, connection, and upward growth.
 */
export default function SpsLogoMark({ variant = 'full', className = '', animated = true, size = 'md' }) {
  // Size mapping
  const dimensions = {
    sm: { symbol: 'w-6 h-6', text: 'text-sm', badge: 'text-[8px]' },
    md: { symbol: 'w-8 h-8', text: 'text-base', badge: 'text-[9px]' },
    lg: { symbol: 'w-12 h-12', text: 'text-2xl', badge: 'text-xs' },
    xl: { symbol: 'w-20 h-20', text: 'text-4xl', badge: 'text-sm' }
  }[size] || { symbol: 'w-8 h-8', text: 'text-base', badge: 'text-[9px]' };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const leftPathVariants = {
    hidden: { x: -12, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const centerPathVariants = {
    hidden: { y: -12, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const rightPathVariants = {
    hidden: { x: 12, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.4 }
    }
  };

  const LogoSymbol = () => (
    <motion.svg
      variants={animated ? containerVariants : {}}
      initial={animated ? "hidden" : "visible"}
      animate="visible"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${dimensions.symbol} shrink-0 drop-shadow-[0_0_12px_rgba(0,240,255,0.45)]`}
    >
      <defs>
        <linearGradient id="spsCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#0066FF" />
        </linearGradient>
        <linearGradient id="spsWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#88DFFF" />
        </linearGradient>
        <linearGradient id="spsBlueGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#00F0FF" />
        </linearGradient>
      </defs>

      {/* Left 'S' Element - Outer Cyan Ribbon */}
      <motion.path
        variants={animated ? leftPathVariants : {}}
        d="M 22 28 C 22 22, 38 20, 48 20 C 58 20, 58 28, 48 34 L 32 44 C 20 52, 20 66, 32 76 C 44 86, 62 82, 62 76"
        stroke="url(#spsCyanGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center 'P' Pillar & Loop Element - White Core Interlock */}
      <motion.path
        variants={animated ? centerPathVariants : {}}
        d="M 46 78 L 46 22 C 46 22, 70 20, 70 36 C 70 48, 46 50, 46 50"
        stroke="url(#spsWhiteGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right 'S' Element - Deep Blue Interlocking Circuit */}
      <motion.path
        variants={animated ? rightPathVariants : {}}
        d="M 78 72 C 78 78, 62 80, 52 80 C 42 80, 42 72, 52 66 L 68 56 C 80 48, 80 34, 68 24 C 56 14, 38 18, 38 24"
        stroke="url(#spsBlueGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dynamic Connection Apex Node (Upward Growth Sparkle) */}
      <circle cx="50" cy="50" r="3" fill="#00F0FF" className="animate-ping" opacity="0.7" />
    </motion.svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <LogoSymbol />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <LogoSymbol />

      {variant === 'full' && (
        <motion.div
          variants={animated ? textVariants : {}}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          className="flex flex-col text-left leading-tight"
        >
          <div className="flex items-baseline gap-1.5">
            <span className={`font-display font-black tracking-label-clean text-white ${dimensions.text} uppercase`}>
              SPS
            </span>
            <span className="font-display font-extrabold text-cyan-400 text-[0.8em] tracking-label-clean">
              '26
            </span>
          </div>
          <span className={`font-mono-tech text-gray-400 tracking-label-clean font-medium ${dimensions.badge} uppercase`}>
            SELLER PARTNER SUPPORT
          </span>
        </motion.div>
      )}
    </div>
  );
}
