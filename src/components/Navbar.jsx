import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Image as ImageIcon, Sparkles } from 'lucide-react';
import { toggleAudioState } from '../utils/audioSynth';

export default function Navbar({ onOpenImageManager }) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = toggleAudioState();
    setIsAudioActive(active);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-black/70 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'py-6 bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand identity */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity"
          data-cursor="HOME"
        >
          <SpsLogoMark variant="full" size="md" />
        </div>

        {/* Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-8 bg-black/40 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md">
          {[
            { label: 'HOME', target: 'hero' },
            { label: 'JOURNEY', target: 'journey' },
            { label: 'PEOPLE', target: 'people' },
            { label: 'MEMORIES', target: 'memories' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.target)}
              data-cursor="GO"
              className="text-xs font-mono-tech tracking-widest text-gray-300 hover:text-cyan-400 transition-colors relative py-1 group uppercase"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00F0FF]" />
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Photo Manager Tool Button */}
          <button
            onClick={onOpenImageManager}
            data-cursor="PHOTOS"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-tech text-gray-300 bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
            title="Inspect / Upload Real Batch Photographs"
          >
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">PHOTOS</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            data-cursor="AUDIO"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-tech transition-all duration-300 border ${
              isAudioActive
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:border-gray-500'
            }`}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <div className="flex items-end gap-[2px] h-3">
                  <span className="w-[2px] bg-cyan-400 h-full animate-[bounce_1s_infinite]" />
                  <span className="w-[2px] bg-cyan-400 h-2/3 animate-[bounce_0.8s_infinite]" />
                  <span className="w-[2px] bg-cyan-400 h-4/5 animate-[bounce_1.2s_infinite]" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                <span className="hidden sm:inline">SOUND: OFF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
