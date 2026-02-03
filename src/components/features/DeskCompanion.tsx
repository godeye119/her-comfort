/* eslint-disable react-hooks/purity */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cat, Heart, Sparkles } from 'lucide-react';

export const DeskCompanion: React.FC = () => {
  const [isWorking, setIsWorking] = useState(true);
  const [receivedLove, setReceivedLove] = useState(false);

  const handleReceiveLove = () => {
    setReceivedLove(true);
    setIsWorking(false);
    setTimeout(() => {
      setReceivedLove(false);
      setIsWorking(true);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        {/* The Desk Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-3 bg-emerald-900/10 rounded-full blur-md" />
        
        {/* The Avatar in Sticker Style */}
        <motion.div
          animate={receivedLove ? {
            scale: [1, 1.2, 1],
            y: [0, -60, 0],
            rotate: [0, 15, -15, 0]
          } : {
            y: [0, -10, 0]
          }}
          transition={receivedLove ? { duration: 0.6, repeat: 1 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-40 h-40 rounded-full bg-white/20 backdrop-blur-3xl border-4 border-white/40 flex items-center justify-center shadow-2xl overflow-visible"
        >
          <AnimatePresence mode="wait">
            {receivedLove ? (
              <motion.div
                key="heart"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1.4, rotate: 0 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <Heart size={80} className="text-red-400 fill-red-400 shadow-lg" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="avatar"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="flex items-center justify-center"
              >
                <Cat size={80} className="text-emerald-800 fill-emerald-800/20" strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sparkle burst */}
          <AnimatePresence>
            {receivedLove && (
              <div className="absolute inset-0">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1.5, 0], 
                      x: (Math.random() - 0.5) * 250, 
                      y: (Math.random() - 0.5) * 250 
                    }}
                    className="absolute top-1/2 left-1/2"
                  >
                    <Sparkles size={20} className="text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="px-6 py-2 rounded-2xl bg-white/30 backdrop-blur-xl border-2 border-white/40 shadow-xl">
          <span className="text-xs font-black text-emerald-950 uppercase tracking-[0.3em]">
            {isWorking ? 'Cat at work' : 'Purrfection'}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleReceiveLove}
          className="px-8 py-3 rounded-2xl border-2 border-emerald-400/50 bg-emerald-100/40 text-emerald-900 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-emerald-900/10 flex items-center gap-3 backdrop-blur-md"
        >
          <Heart size={16} className="fill-emerald-900" strokeWidth={2.5} />
          Send Hugs
        </motion.button>
      </div>
    </div>
  );
};
