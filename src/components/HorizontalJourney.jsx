import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE_STAGES } from '../data/timelineData';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getStoredImage } from '../utils/imagePaths';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalJourney() {
  const targetRef = useRef(null);
  const containerRef = useRef(null);

  const buildingImgUrl = getStoredImage('building');
  const logoImgUrl = getStoredImage('logo');
  const groupImgUrl = getStoredImage('group');

  const stageImages = [buildingImgUrl, logoImgUrl, groupImgUrl, logoImgUrl, groupImgUrl];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = containerRef.current.scrollWidth - window.innerWidth;

      gsap.to(containerRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: targetRef.current,
          start: 'top top',
          end: () => `+=${totalWidth * 1.2}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, targetRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={targetRef} className="relative w-full h-screen bg-[#050508] overflow-hidden">
      {/* Background Atmosphere Header */}
      <div className="absolute top-8 left-8 sm:left-16 z-30 flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-mono-tech text-xs sm:text-sm tracking-label-clean text-cyan-300 uppercase font-bold">
          OUR CHRONICLE • 01 TO 05
        </span>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={containerRef}
        className="flex h-full items-center pl-8 sm:pl-16 pr-[20vw] gap-12 sm:gap-24"
        style={{ width: 'max-content' }}
      >
        {TIMELINE_STAGES.map((stage, idx) => (
          <div
            key={stage.id}
            data-cursor={stage.title}
            className="w-[85vw] sm:w-[650px] md:w-[750px] shrink-0 h-[75vh] min-h-[500px] glass-panel rounded-3xl p-8 sm:p-12 relative flex flex-col justify-between border border-white/15 overflow-hidden group hover:border-cyan-400/50 transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Background Stage Image Mask */}
            <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-700">
              <img
                src={stageImages[idx % stageImages.length]}
                alt={stage.title}
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-transparent" />
            </div>

            {/* Top Row: Numeric Badge & Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-display font-black text-5xl sm:text-7xl tracking-hero text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-white/80 to-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                {stage.id}
              </span>
              <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                <span className="font-mono-tech text-xs text-cyan-300 tracking-label-clean uppercase">
                  {stage.tag}
                </span>
              </div>
            </div>

            {/* Middle Content */}
            <div className="relative z-10 my-6">
              <span className="font-mono-tech text-xs text-cyan-400 tracking-label-clean uppercase block mb-2">
                {stage.subtitle}
              </span>

              <h3 className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-black text-white uppercase tracking-heading-lg mb-4 group-hover:text-cyan-200 transition-colors leading-[1.1]">
                {stage.title}
              </h3>

              <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent my-4 shadow-[0_0_8px_#00F0FF]" />

              <p className="font-display text-lg sm:text-2xl text-cyan-300 font-light italic mb-4 tracking-heading-md">
                "{stage.quote}"
              </p>

              <p className="font-mono-tech text-xs sm:text-sm text-gray-300 tracking-body-clean leading-relaxed">
                {stage.details}
              </p>
            </div>

            {/* Bottom Row Footer */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10 font-mono-tech text-xs text-gray-400">
              <span className="flex items-center gap-2 tracking-label-clean">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                SPS '26 CHAPTER {stage.id}
              </span>
              <span className="flex items-center gap-1 text-cyan-400 group-hover:translate-x-2 transition-transform tracking-label-clean">
                NEXT MILESTONE <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
