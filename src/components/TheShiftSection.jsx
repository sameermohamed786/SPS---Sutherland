import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TheShiftSection() {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Frame 1: THEN...
      tl.fromTo(
        text1Ref.current,
        { scale: 0.5, opacity: 0, filter: 'blur(20px)' },
        { scale: 1.2, opacity: 1, filter: 'blur(0px)', duration: 1 }
      )
        .to(text1Ref.current, { opacity: 0, scale: 2, filter: 'blur(20px)', duration: 0.8 }, '+=0.4')

        // Frame 2: ...WE MET.
        .fromTo(
          text2Ref.current,
          { scale: 0.5, opacity: 0, filter: 'blur(20px)' },
          { scale: 1.2, opacity: 1, filter: 'blur(0px)', duration: 1 }
        )
        .to(text2Ref.current, { opacity: 0, scale: 2, filter: 'blur(20px)', duration: 0.8 }, '+=0.4')

        // Frame 3: Rapid reveal THE PEOPLE.
        .fromTo(
          text3Ref.current,
          { scale: 0.3, opacity: 0, filter: 'blur(30px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'back.out(1.7)' }
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#030407] overflow-hidden flex items-center justify-center"
    >
      {/* Dynamic Background Light Pulses */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none" />
      <div className="absolute w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[180px] pointer-events-none" />

      {/* Frame 1: THEN... */}
      <div
        ref={text1Ref}
        className="absolute inset-0 flex items-center justify-center text-center px-6 pointer-events-none"
      >
        <h2 className="font-display text-[clamp(3.5rem,14vw,11rem)] font-black tracking-hero text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]">
          THEN...
        </h2>
      </div>

      {/* Frame 2: ...WE MET. */}
      <div
        ref={text2Ref}
        className="absolute inset-0 flex items-center justify-center text-center px-6 pointer-events-none opacity-0"
      >
        <h2 className="font-display text-[clamp(3.5rem,14vw,11rem)] font-black tracking-hero text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 drop-shadow-[0_0_60px_rgba(0,240,255,0.6)]">
          ...WE MET.
        </h2>
      </div>

      {/* Frame 3: THE PEOPLE. */}
      <div
        ref={text3Ref}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none opacity-0"
      >
        <span className="font-mono-tech text-cyan-400 text-xs sm:text-base tracking-label-clean uppercase mb-4 font-bold">
          CHAPTER TRANSITION
        </span>
        <h2 className="font-display text-[clamp(3.5rem,14vw,11rem)] font-black tracking-hero text-white drop-shadow-[0_0_80px_rgba(0,102,255,0.8)]">
          THE PEOPLE.
        </h2>
      </div>
    </section>
  );
}
