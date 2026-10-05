import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Edit3, Sparkles, UserCheck, X } from 'lucide-react';
import { INITIAL_TEAM } from '../data/teamData';
import { getStoredImage } from '../utils/imagePaths';

export default function ThePeopleSection() {
  const [teamList, setTeamList] = useState(INITIAL_TEAM);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  const groupImgUrl = getStoredImage('group');

  const handleEditClick = (member) => {
    setEditFormData({ ...member });
    setIsEditing(true);
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    setTeamList(teamList.map((m) => (m.id === editFormData.id ? editFormData : m)));
    setIsEditing(false);
    setEditFormData(null);
  };

  return (
    <section id="people" className="relative w-full min-h-screen py-24 sm:py-36 px-6 bg-[#030407] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono-tech text-xs tracking-label-clean mb-4">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>SPS '26 BATCH ROSTER</span>
          </div>

          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black text-white uppercase tracking-heading-lg leading-[1.1]">
            THE PEOPLE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-500">
              BEHIND THE MEMORIES.
            </span>
          </h2>

          <p className="font-mono-tech text-xs sm:text-sm text-gray-400 tracking-label-clean uppercase mt-4">
            [ EDITABLE TEAM SYSTEM: CLICK ANY CARD TO CUSTOMIZE NAME, NICKNAME & QUOTE ]
          </p>
        </div>

        {/* Featured Group Photograph Showcase */}
        <div className="relative w-full aspect-[21/9] min-h-[300px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 mb-16 shadow-[0_0_50px_rgba(0,102,255,0.2)] group">
          <img
            src={groupImgUrl}
            alt="SPS Batch Group Photograph"
            className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-1000"
            onError={(e) => {
              e.target.src = getStoredImage('group');
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <span className="font-mono-tech text-xs text-cyan-300 tracking-label-clean uppercase font-bold mb-1">
              SUTHERLAND CHENNAI • SPS BATCH '26
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-heading-lg">
              UNITED AS ONE BATCH
            </h3>
          </div>
        </div>

        {/* Teammate Roster Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamList.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -6 }}
              data-cursor="EDIT"
              onClick={() => handleEditClick(member)}
              className="glass-panel p-6 rounded-2xl relative border border-white/10 hover:border-cyan-400/60 glass-panel-hover cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-display font-black text-white text-lg shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                    {member.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors tracking-heading-md">
                      {member.name}
                    </h4>
                    <span className="font-mono-tech text-[11px] text-cyan-400 tracking-label-clean block">
                      "{member.nickname}"
                    </span>
                  </div>
                </div>

                <button className="text-gray-500 group-hover:text-cyan-300 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <div className="my-3">
                <p className="font-mono-tech text-xs text-gray-300 italic tracking-body-clean">
                  "{member.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-tech text-gray-400 tracking-label-clean">
                <span>{member.role}</span>
                <span className="text-cyan-400 font-bold uppercase">CLICK TO EDIT</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Edit Teammate Modal */}
      <AnimatePresence>
        {isEditing && editFormData && (
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
                onClick={() => setIsEditing(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2 text-cyan-400 font-mono-tech text-xs tracking-widest mb-2">
                <UserCheck className="w-4 h-4" />
                <span>EDIT TEAMMATE PROFILE</span>
              </div>

              <h3 className="font-display text-2xl font-black text-white mb-6 uppercase">
                CUSTOMIZE TEAM DETAILS
              </h3>

              <form onSubmit={handleSaveMember} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-mono-tech text-gray-300 tracking-wider mb-2">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white text-sm focus:border-cyan-400 focus:outline-none font-mono-tech"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-gray-300 tracking-wider mb-2">
                    NICKNAME / TITLE
                  </label>
                  <input
                    type="text"
                    value={editFormData.nickname}
                    onChange={(e) => setEditFormData({ ...editFormData, nickname: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white text-sm focus:border-cyan-400 focus:outline-none font-mono-tech"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-gray-300 tracking-wider mb-2">
                    ONE-LINE QUOTE
                  </label>
                  <input
                    type="text"
                    value={editFormData.quote}
                    onChange={(e) => setEditFormData({ ...editFormData, quote: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-white text-sm focus:border-cyan-400 focus:outline-none font-mono-tech"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-mono-tech text-gray-400 hover:text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-mono-tech font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition-colors shadow-[0_0_20px_#00F0FF]"
                  >
                    SAVE TEAMMATE
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
