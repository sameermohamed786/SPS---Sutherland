import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ShieldCheck } from 'lucide-react';
import { getStoredImage } from '../utils/imagePaths';

gsap.registerPlugin(ScrollTrigger);

export default function WhereItStarted() {
  const sectionRef = useRef(null);
  const maskBoxRef = useRef(null);
  const logoImgRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const dateCardRef = useRef(null);
  const laserLineRef = useRef(null);

  const logoImgUrl = getStoredImage('logo');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mask reveal transition for logo photo
      gsap.fromTo(
        maskBoxRef.current,
        { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', scale: 0.9 },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 0.8,
          },
        }
      );

      // Parallax image movement inside frame
      gsap.fromTo(
        logoImgRef.current,
        { scale: 1.3, y: '-10%' },
        {
          scale: 1,
          y: '10%',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Multi-speed parallax typography
      gsap.fromTo(
        heading1Ref.current,
        { y: 80, opacity: 0 },
        {
          y: -20,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        heading2Ref.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.8,
          },
        }
      );

      // Laser line animation
      gsap.fromTo(
        laserLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );

      // Date card pop-in
      gsap.fromTo(
        dateCardRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="origin"
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 sm:py-36 px-6 bg-[#050508] overflow-hidden flex items-center"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Parallax Typography & Milestone Date */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono-tech text-xs tracking-label-clean w-max mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>ORIGIN STORY</span>
          </div>

          <h2
            ref={heading1Ref}
            className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black tracking-heading-lg text-white leading-[1.1] uppercase"
          >
            EVERY JOURNEY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500">
              STARTS SOMEWHERE.
            </span>
          </h2>

          <p
            ref={heading2Ref}
            className="font-display text-lg sm:text-2xl text-gray-300 font-light mt-4 mb-8 tracking-heading-md"
          >
            For us, it started here.
          </p>

          {/* Connected Laser Telemetry Line */}
          <div className="relative my-4">
            <div
              ref={laserLineRef}
              className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent shadow-[0_0_10px_#00F0FF]"
            />
          </div>

          {/* Milestone Date Display Card */}
          <div
            ref={dateCardRef}
            className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(0,102,255,0.15)] mt-4 group"
            data-cursor="23.09.2026"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <span className="font-mono-tech text-xs text-cyan-400 tracking-label-clean uppercase block">
                  CHAPTER INITIALIZATION
                </span>
                <span className="font-display font-black text-2xl sm:text-4xl text-white tracking-nav-clean">
                  23.09.2026
                </span>
              </div>
            </div>
            <p className="font-mono-tech text-xs sm:text-sm text-gray-300 tracking-label-clean uppercase mt-2">
              "THE BEGINNING OF OUR PROFESSIONAL JOURNEY."
            </p>
          </div>
        </div>

        {/* Right Column: Sutherland Logo/Name Photo with Masked Reveal */}
        <div className="lg:col-span-6 relative flex justify-center">
          <div
            ref={maskBoxRef}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass-panel border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            <img
              ref={logoImgRef}
              src={logoImgUrl}
              alt="Sutherland Logo Photograph"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = getStoredImage('logo');
              }}
            />

            {/* Subtle Overlay Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center justify-between">
              <span className="font-mono-tech text-[10px] text-cyan-300 tracking-widest">
                IDENTITY MARK • SUTHERLAND
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
