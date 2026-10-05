import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Sparkles } from 'lucide-react';
import { getStoredImage } from '../utils/imagePaths';

gsap.registerPlugin(ScrollTrigger);

export default function MeetSPSSection() {
  const containerRef = useRef(null);
  const imageFrameRef = useRef(null);
  const imageRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);

  const groupImgUrl = getStoredImage('group');

  // Mouse tilt depth physics for desktop hover interaction
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin section and handle image expansion on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Start heavily cropped/zoomed in -> zoom out & expand photograph to full size
      tl.fromTo(
        imageRef.current,
        { scale: 2.2 },
        { scale: 1, ease: 'none', duration: 1.5 }
      )
        .fromTo(
          imageFrameRef.current,
          { width: '50%', height: '55vh', borderRadius: '40px' },
          { width: '100%', height: '80vh', borderRadius: '24px', ease: 'none', duration: 1.5 },
          '< '
        )
        // Typography floating parallax entrance
        .fromTo(
          textLeftRef.current,
          { x: '-100%', opacity: 0 },
          { x: '0%', opacity: 1, duration: 1 },
          '-=0.8'
        )
        .fromTo(
          textRightRef.current,
          { x: '100%', opacity: 0 },
          { x: '0%', opacity: 1, duration: 1 },
          '<'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!imageFrameRef.current) return;
    const rect = imageFrameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section
      id="meet-sps"
      ref={containerRef}
      className="relative w-full h-screen bg-[#050508] overflow-hidden flex flex-col items-center justify-center px-4 sm:px-8 py-12"
    >
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[180px] pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono-tech text-xs tracking-label-clean mb-3">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span>REAL BATCH PHOTOGRAPH</span>
        </div>

        <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.75rem)] font-black text-white uppercase tracking-heading-lg leading-[1.1]">
          DIFFERENT PEOPLE.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            ONE JOURNEY.
          </span>
        </h2>
      </div>

      {/* Group Photograph Container with Scroll Zoom Reveal + 3D Tilt Hover Effect */}
      <div className="relative w-full max-w-6xl flex items-center justify-center z-10">
        <div
          ref={imageFrameRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          data-cursor="EXPAND"
          className={`relative overflow-hidden transition-all duration-300 glass-panel border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.9)] cursor-pointer ${
            isHovered ? 'border-cyan-400 shadow-[0_0_40px_rgba(0,240,255,0.3)]' : ''
          }`}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${isHovered ? 1.02 : 1})`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          <img
            ref={imageRef}
            src={groupImgUrl}
            alt="SPS Batch Group Photograph"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.src = getStoredImage('group');
            }}
          />

          {/* Interactive Rim Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Bottom Caption Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white pointer-events-none z-20">
            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-mono-tech text-xs tracking-label-clean text-cyan-300">
                SPS BATCH '26 • SUTHERLAND CHENNAI
              </span>
            </div>
            <span className="hidden sm:inline font-mono-tech text-[10px] text-gray-400 tracking-label-clean">
              [ 100% REAL UNTOUCHED PHOTOGRAPH ]
            </span>
          </div>
        </div>
      </div>

      {/* Floating Side Descriptions */}
      <div className="relative z-20 w-full max-w-5xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
        <div ref={textLeftRef} className="glass-panel p-4 rounded-xl border border-white/10">
          <p className="font-mono-tech text-xs sm:text-sm text-gray-300 tracking-body-clean">
            Different personalities. Different stories. Different dreams.
          </p>
        </div>
        <div ref={textRightRef} className="glass-panel p-4 rounded-xl border border-white/10 md:text-right">
          <p className="font-mono-tech text-xs sm:text-sm text-cyan-300 font-bold tracking-label-clean uppercase">
            One SPS. United as family.
          </p>
        </div>
      </div>
    </section>
  );
}
