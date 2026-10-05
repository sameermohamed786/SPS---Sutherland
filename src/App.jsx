import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CanvasGrain from './components/CanvasGrain';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import CinematicLoader from './components/CinematicLoader';
import HeroSection from './components/HeroSection';
import WhereItStarted from './components/WhereItStarted';
import TheShiftSection from './components/TheShiftSection';
import MeetSPSSection from './components/MeetSPSSection';
import HorizontalJourney from './components/HorizontalJourney';
import KineticTypography from './components/KineticTypography';
import MemoryWall from './components/MemoryWall';
import ThePeopleSection from './components/ThePeopleSection';
import FinalSequence from './components/FinalSequence';
import FinalPhotoReveal from './components/FinalPhotoReveal';
import ImageManagerModal from './components/ImageManagerModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050508] text-[#F0F4F8] selection:bg-cyan-400 selection:text-black font-sans">
      {/* Cinematic Opening Loader */}
      {showLoader && (
        <CinematicLoader onComplete={() => setShowLoader(false)} />
      )}

      {/* Global Background Noise Grain & Light Particles */}
      <CanvasGrain />

      {/* Custom High-Motion Magnetic Cursor */}
      <CustomCursor />

      {/* Top Header Navigation */}
      <Navbar onOpenImageManager={() => setIsImageManagerOpen(true)} />

      {/* Scroll Position HUD Bar */}
      <ScrollProgress />

      {/* Main Experience Trajectory */}
      <main className="relative z-10 w-full overflow-hidden">
        <HeroSection />
        <WhereItStarted />
        <TheShiftSection />
        <MeetSPSSection />
        <HorizontalJourney />
        <KineticTypography />
        <MemoryWall />
        <ThePeopleSection />
        <FinalSequence />
        <FinalPhotoReveal />
      </main>

      {/* Photo Manager Tool Drawer */}
      <ImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
      />
    </div>
  );
}
