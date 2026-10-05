import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle2, AlertCircle, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { getStoredImage, saveStoredImage, resetStoredImage, DEFAULT_IMAGES } from '../utils/imagePaths';

export default function ImageManagerModal({ isOpen, onClose }) {
  const [images, setImages] = useState({
    building: '',
    logo: '',
    group: ''
  });

  const loadImages = () => {
    setImages({
      building: getStoredImage('building'),
      logo: getStoredImage('logo'),
      group: getStoredImage('group')
    });
  };

  useEffect(() => {
    if (isOpen) {
      loadImages();
    }
  }, [isOpen]);

  const handleFileUpload = (key, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      saveStoredImage(key, event.target.result);
      loadImages();
      window.location.reload(); // Refresh to trigger full GSAP re-render with real image
    };
    reader.readAsDataURL(file);
  };

  const handleReset = (key) => {
    resetStoredImage(key);
    loadImages();
    window.location.reload();
  };

  if (!isOpen) return null;

  const items = [
    {
      key: 'building',
      title: '1. Company / Building Photograph',
      desc: 'Full-screen hero image of Sutherland facility',
      filename: 'public/assets/images/building.jpg'
    },
    {
      key: 'logo',
      title: '2. Sutherland Logo Photograph',
      desc: 'Company identity mark photograph for origin section',
      filename: 'public/assets/images/logo.jpg'
    },
    {
      key: 'group',
      title: '3. Real SPS Batch Group Photograph',
      desc: 'The central hero group photo of SPS teammates',
      filename: 'public/assets/images/group.jpg'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-panel max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-cyan-400/40 relative shadow-[0_0_60px_rgba(0,240,255,0.25)] my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="font-mono-tech text-xs text-cyan-400 tracking-widest uppercase">
                PHOTOGRAPH MANAGER
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white uppercase">
                YOUR 3 REAL PHOTOGRAPHS
              </h3>
            </div>
          </div>

          <p className="font-mono-tech text-xs text-gray-300 mb-6 leading-relaxed">
            You can drop your real files directly into your project at <code className="text-cyan-300 bg-white/5 px-2 py-0.5 rounded">/public/assets/images/</code> or upload them below for instant browser preview.
          </p>

          {/* List of 3 Photos */}
          <div className="flex flex-col gap-4 mb-6">
            {items.map((item) => {
              const currentSrc = images[item.key];
              const isCustom = currentSrc && currentSrc.startsWith('data:image');

              return (
                <div
                  key={item.key}
                  className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail preview */}
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-black/60 border border-white/10 shrink-0">
                      {currentSrc ? (
                        <img src={currentSrc} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                          NO IMG
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-sm text-white">
                        {item.title}
                      </h4>
                      <p className="font-mono-tech text-[11px] text-gray-400">
                        {item.filename}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono-tech text-xs cursor-pointer hover:bg-cyan-400 hover:text-black transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isCustom ? 'REPLACE' : 'UPLOAD'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(item.key, e)}
                      />
                    </label>

                    {isCustom && (
                      <button
                        onClick={() => handleReset(item.key)}
                        className="p-1.5 rounded-full text-gray-400 hover:text-red-400 hover:bg-white/5"
                        title="Reset to default file path"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full font-mono-tech text-xs font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition-colors shadow-[0_0_15px_#00F0FF]"
            >
              DONE / CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
