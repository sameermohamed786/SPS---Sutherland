import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { getStoredImage } from '../utils/imagePaths';

gsap.registerPlugin(ScrollTrigger);

export default function FinalSequence() {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const t1Ref = useRef(null);
  const t2Ref = useRef(null);
  const t3Ref = useRef(null);
  const t4Ref = useRef(null);
  const t5Ref = useRef(null);

  const groupImgUrl = getStoredImage('group');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onLeave: () => {
            // Emotional victory confetti burst on scroll complete
            confetti({
              particleCount: 80,
              spread: 100,
              origin: { y: 0.8 },
              colors: ['#00F0FF', '#0066FF', '#FFFFFF']
            });
          }
        },
      });

      // Start with close crop -> slowly zoom out group photo
      tl.fromTo(imgRef.current, { scale: 2.5 }, { scale: 1.05, duration: 4, ease: 'none' })

      // Text 1: "WE CAME HERE FOR A JOB."
      .fromTo(t1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
      .to(t1Ref.current, { opacity: 0, y: -30, duration: 0.8 }, '+=1')

      // Text 2: "WE LEFT WITH MEMORIES."
      .fromTo(t2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
      .to(t2Ref.current, { opacity: 0, y: -30, duration: 0.8 }, '+=1')

      // Text 3: "WE STARTED AS A BATCH."
      .fromTo(t3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
      .to(t3Ref.current, { opacity: 0, scale: 1.5, duration: 0.8 }, '+=1')

      // Screen goes almost completely black & text 4 reveals: "WE BECAME A TEAM."
      .fromTo(t4Ref.current, { opacity: 0, scale: 0.8, filter: 'blur(20px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5 })
      .to(t4Ref.current, { opacity: 0, duration: 0.8 }, '+=1.2')

      // Text 5: SPS '26 SELLER PARTNER SUPPORT + "THIS IS ONLY THE BEGINNING."
      .fromTo(t5Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#020305] overflow-hidden flex items-center justify-center"
    >
      {/* REAL Group Photograph Background with Slow Zoom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          ref={imgRef}
          src={groupImgUrl}
          alt="SPS Batch Group Photograph"
          className="w-full h-full object-cover filter contrast-110 brightness-75"
          onError={(e) => {
            e.target.src = getStoredImage('group');
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
      </div>

      {/* Cinematic Text Layers */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center pointer-events-none">
        {/* Text 1 */}
        <div ref={t1Ref} className="absolute inset-0 flex items-center justify-center opacity-0">
          <h2 className="font-display text-[clamp(2.25rem,6vw,5.5rem)] font-black text-white uppercase tracking-hero leading-[1.1]">
            WE CAME HERE <br />
            <span className="text-cyan-400">FOR A JOB.</span>
          </h2>
        </div>

        {/* Text 2 */}
        <div ref={t2Ref} className="absolute inset-0 flex items-center justify-center opacity-0">
          <h2 className="font-display text-[clamp(2.25rem,6vw,5.5rem)] font-black text-white uppercase tracking-hero leading-[1.1]">
            WE LEFT WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-500">
              MEMORIES.
            </span>
          </h2>
        </div>

        {/* Text 3 */}
        <div ref={t3Ref} className="absolute inset-0 flex items-center justify-center opacity-0">
          <h2 className="font-display text-[clamp(2.25rem,6vw,5.5rem)] font-black text-gray-300 uppercase tracking-hero leading-[1.1]">
            WE STARTED AS A BATCH.
          </h2>
        </div>

        {/* Text 4: Massive Glow */}
        <div ref={t4Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <h2 className="font-display text-[clamp(2.5rem,8vw,7.5rem)] font-black tracking-hero text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-500 drop-shadow-[0_0_80px_rgba(0,240,255,0.8)] leading-[1.05]">
            WE BECAME A TEAM.
          </h2>
        </div>

        {/* Text 5: Final Resolution */}
        <div ref={t5Ref} className="relative opacity-0 flex flex-col items-center justify-center">
          <span className="font-mono-tech text-cyan-400 text-xs sm:text-base tracking-label-clean uppercase mb-4 font-bold">
            SPS '26 • SELLER PARTNER SUPPORT
          </span>

          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black text-white uppercase tracking-heading-lg mb-6 leading-[1.1]">
            THIS IS ONLY THE BEGINNING.
          </h2>

          <div className="w-24 h-[2px] bg-cyan-400 shadow-[0_0_15px_#00F0FF]" />
        </div>
      </div>
    </section>
  );
}
