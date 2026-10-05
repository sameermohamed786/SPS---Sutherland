import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function KineticTypography() {
  const containerRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const track3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Track 1 moves left
      gsap.to(track1Ref.current, {
        x: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Track 2 moves right
      gsap.to(track2Ref.current, {
        x: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Track 3 moves left with rotation tilt
      gsap.to(track3Ref.current, {
        x: '-15%',
        rotate: -2,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const row1 = ['PEOPLE', 'LAUGHTER', 'TRAINING', 'TEAMWORK', 'MEMORIES', 'GROWTH', 'SPS'];
  const row2 = ['SPS \'26', 'CHENNAI', 'SUTHERLAND', 'SELLER PARTNER SUPPORT', 'BATCH TO TEAM'];
  const row3 = ['UNSTOPPABLE', 'BOUNDLESS', 'LEGACY', 'UNITY', 'CHAPTER ONE'];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 sm:py-36 bg-[#030407] overflow-hidden flex flex-col justify-center gap-6 select-none"
    >
      {/* Track 1 */}
      <div ref={track1Ref} className="flex whitespace-nowrap gap-8 items-center opacity-80">
        {row1.concat(row1).map((word, i) => (
          <span
            key={i}
            className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600 tracking-hero"
          >
            {word} <span className="text-cyan-400 font-light mx-4">•</span>
          </span>
        ))}
      </div>

      {/* Track 2 (Reverse Direction with Stroke Effect) */}
      <div ref={track2Ref} className="flex whitespace-nowrap gap-8 items-center -ml-40">
        {row2.concat(row2).map((word, i) => (
          <span
            key={i}
            className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black text-stroke-blue tracking-hero"
          >
            {word} <span className="text-blue-500 font-light mx-4">/</span>
          </span>
        ))}
      </div>

      {/* Track 3 */}
      <div ref={track3Ref} className="flex whitespace-nowrap gap-8 items-center opacity-90">
        {row3.concat(row3).map((word, i) => (
          <span
            key={i}
            className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-500 tracking-hero"
          >
            {word} <span className="text-white font-light mx-4">•</span>
          </span>
        ))}
      </div>

      {/* Foreground Ambient Glow Blur */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030407] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030407] to-transparent pointer-events-none z-10" />
    </section>
  );
}
