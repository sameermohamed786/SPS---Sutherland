import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Plus, Sparkles, MessageSquare, X } from 'lucide-react';
import { MEMORY_QUOTES } from '../data/quotesData';

export default function MemoryWall() {
  const [quotes, setQuotes] = useState(MEMORY_QUOTES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuote, setNewQuote] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  const handleAddQuote = (e) => {
    e.preventDefault();
    if (!newQuote.trim()) return;

    const item = {
      id: Date.now(),
      quote: newQuote.trim(),
      author: newAuthor.trim() || 'SPS Teammate',
      category: 'MEMORY'
    };

    setQuotes([item, ...quotes]);
    setNewQuote('');
    setNewAuthor('');
    setIsModalOpen(false);
  };

  const categories = ['ALL', 'UNITY', 'CONNECTION', 'MILESTONE', 'JOURNEY', 'GROWTH'];

  const filteredQuotes = activeFilter === 'ALL' 
    ? quotes 
    : quotes.filter(q => q.category === activeFilter);

  return (
    <section id="memories" className="relative w-full min-h-screen py-24 sm:py-36 px-6 bg-[#050508] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono-tech text-xs tracking-label-clean mb-4">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE MEMORY WALL</span>
            </div>

            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black text-white uppercase tracking-heading-lg leading-[1.1]">
              THE MOMENTS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-500">
                WE'LL REMEMBER.
              </span>
            </h2>
          </div>

          {/* Action Button & Category Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              data-cursor="ADD"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono-tech text-xs tracking-label-clean hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
            >
              <Plus className="w-4 h-4" />
              ADD MEMORY QUOTE
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-label-clean uppercase transition-all duration-300 whitespace-nowrap border ${
                activeFilter === cat
                  ? 'bg-cyan-400 text-black border-cyan-300 font-bold shadow-[0_0_15px_#00F0FF]'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:border-gray-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredQuotes.map((q, idx) => (
              <motion.div
                key={q.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                data-cursor="QUOTE"
                className="glass-panel p-8 rounded-3xl relative flex flex-col justify-between border border-white/15 hover:border-cyan-400/60 glass-panel-hover group"
              >
                <Quote className="w-10 h-10 text-cyan-400/30 group-hover:text-cyan-400/80 transition-colors mb-6" />

                <p className="font-display text-lg sm:text-2xl font-bold text-white leading-snug mb-8 group-hover:text-cyan-100 transition-colors tracking-heading-md">
                  "{q.quote}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono-tech text-xs">
                  <span className="text-cyan-300 tracking-label-clean font-bold">
                    — {q.author}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/10 text-[10px] tracking-label-clean">
                    {q.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Memory Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-cyan-400/40 relative shadow-[0_0_50px_rgba(0,240,255,0.3)]"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2 text-cyan-400 font-mono-tech text-xs tracking-widest mb-2">
                <Sparkles className="w-4 h-4" />
                <span>NEW MEMORY ENTRY</span>
              </div>

              <h3 className="font-display text-2xl font-black text-white mb-6 uppercase">
                ADD A BATCH MEMORY QUOTE
              </h3>

              <form onSubmit={handleAddQuote} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-mono-tech text-gray-300 tracking-wider mb-2">
                    MEMORY / QUOTE TEXT
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    placeholder="e.g. Started as strangers, ended up as an unbreakable family..."
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-4 text-white text-sm focus:border-cyan-400 focus:outline-none font-mono-tech"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-gray-300 tracking-wider mb-2">
                    AUTHOR / NAME (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. SPS Teammate"
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white text-sm focus:border-cyan-400 focus:outline-none font-mono-tech"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-mono-tech text-gray-400 hover:text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-mono-tech font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition-colors shadow-[0_0_20px_#00F0FF]"
                  >
                    POST MEMORY
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
