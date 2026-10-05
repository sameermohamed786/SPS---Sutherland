import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, MapPin } from 'lucide-react';
import { getStoredImage } from '../utils/imagePaths';
import SpsLogoMark from './SpsLogoMark';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const bgImgRef = useRef(null);
  const contentRef = useRef(null);
  const buildingImgUrl = getStoredImage('building');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero scroll morphing transition into next section
      gsap.to(bgImgRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
        scale: 1.2,
        y: '12%',
        filter: 'brightness(0.4) blur(4px)',
        ease: 'none',
      });

      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 0.5,
        },
        opacity: 0,
        y: '-20%',
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextEl = document.getElementById('origin');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center justify-center bg-[#050508]"
    >
      {/* FULL SCREEN Company/Building Photograph with Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          ref={bgImgRef}
          src={buildingImgUrl}
          alt="Sutherland Building Facility"
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 animate-pulse-glow"
          onError={(e) => {
            // Fallback artwork preview if local file is missing
            e.target.src = getStoredImage('building');
          }}
        />

        {/* Multi-layer Cinematic Overlays */}
        {/* Dark Vignette & Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/80 via-transparent to-[#050508]/80" />
        {/* Electric Blue Light Bloom */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/15 rounded-full blur-[160px]" />
      </div>

      {/* Layered Typography & Content */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-6xl mx-auto px-6 text-center flex flex-col items-center justify-center pt-16"
      >
        {/* Badge 1: SPS '26 Custom Logo Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/40 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
        >
          <SpsLogoMark variant="icon" size="sm" />
          <span className="font-mono-tech text-xs sm:text-sm font-bold tracking-label-clean text-cyan-300 uppercase">
            SPS '26 BATCH
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </motion.div>

        {/* Badge 2: SELLER PARTNER SUPPORT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-display text-lg sm:text-2xl md:text-3xl tracking-label-clean text-gray-300 font-extrabold uppercase">
            SELLER PARTNER SUPPORT
          </h2>
        </motion.div>

        {/* Core Statements Layer 3 & 4 */}
        <div className="flex flex-col items-center gap-3 sm:gap-5 my-2">
          {/* STARTED AS A BATCH. */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-display text-[clamp(2.25rem,6.5vw,5.75rem)] font-black tracking-hero text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] leading-[1.08]"
          >
            STARTED AS A BATCH.
          </motion.h1>

          {/* BECAME A TEAM. */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 1 }}
            className="font-display text-[clamp(2.25rem,6.5vw,5.75rem)] font-black tracking-hero text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-500 drop-shadow-[0_0_35px_rgba(0,240,255,0.5)] leading-[1.08]"
          >
            BECAME A TEAM.
          </motion.h1>
        </div>

        {/* Location & Context Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-8 flex items-center gap-2 text-xs font-mono-tech tracking-label-clean text-gray-400"
        >
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>SUTHERLAND • CHENNAI, INDIA • 2026</span>
        </motion.div>

        {/* Animated Scroll Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-12 sm:mt-16"
        >
          <button
            onClick={scrollToNext}
            data-cursor="ENTER"
            className="group flex flex-col items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/15 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <span className="font-mono-tech text-xs tracking-label-clean text-gray-300 group-hover:text-cyan-300 transition-colors uppercase">
              SCROLL TO ENTER ↓
            </span>
            <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
          </button>
        </motion.div>
      </div>

      {/* Decorative Bottom Vignette Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none z-10" />
    </section>
  );
}
