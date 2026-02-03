import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export const DeskCompanion: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="w-24 h-24 rounded-full bg-emerald-200/50 backdrop-blur-md border border-emerald-100 flex items-center justify-center shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-transparent animate-pulse" />
        <User size={48} className="text-emerald-800 relative z-10" />
      </div>
      <span className="text-xs font-medium text-emerald-800/60 uppercase tracking-widest bg-emerald-100/50 px-3 py-1 rounded-full backdrop-blur-sm">
        Guardian
      </span>
    </motion.div>
  );
};
