import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { getStoredImage } from '../utils/imagePaths';

export default function FinalPhotoReveal() {
  const groupImgUrl = getStoredImage('group');

  return (
    <section className="relative w-full min-h-screen py-20 bg-[#030406] flex flex-col items-center justify-between px-6 overflow-hidden">
      {/* Ambient background bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[200px] pointer-events-none" />

      {/* Top Header Tag */}
      <div className="relative z-10 text-center pt-8">
        <span className="font-mono-tech text-xs tracking-label-clean text-cyan-400 uppercase font-bold">
          CHAPTER ONE • FINAL FRAME
        </span>
      </div>

      {/* Complete Group Photograph Frame */}
      <div className="relative z-10 w-full max-w-6xl aspect-[16/9] min-h-[350px] sm:min-h-[480px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/40 shadow-[0_0_80px_rgba(0,102,255,0.25)] my-8 group">
        <img
          src={groupImgUrl}
          alt="Final SPS Batch Group Photograph"
          className="w-full h-full object-cover animate-pulse-glow transition-transform duration-1000 group-hover:scale-105"
          onError={(e) => {
            e.target.src = getStoredImage('group');
          }}
        />

        {/* Minimal Movie End Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-20">
          <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-mono-tech text-xs tracking-label-clean text-cyan-300">
              SPS '26 • SUTHERLAND CHENNAI 2026
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono-tech text-xs text-gray-300 tracking-label-clean">
            <span>FORGED IN CHENNAI</span>
            <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
          </div>
        </div>
      </div>

      {/* Footer Typography */}
      <div className="relative z-10 text-center pb-12 flex flex-col items-center">
        <h3 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-heading-lg mb-2">
          THE END OF CHAPTER ONE.
        </h3>
        <p className="font-mono-tech text-xs sm:text-sm text-cyan-400 tracking-label-clean uppercase font-bold">
          NOT THE END OF THE STORY.
        </p>

        <div className="mt-8 text-[11px] font-mono-tech text-gray-500 tracking-label-clean">
          SUTHERLAND SELLER PARTNER SUPPORT • BATCH OF 2026
        </div>
      </div>
    </section>
  );
}
