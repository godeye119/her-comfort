/* eslint-disable react-hooks/purity */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Sparkles, Star } from 'lucide-react';

const HYPE_MESSAGES = [
  "Main Character Energy",
  "You are glowing",
  "Radiant & Unstoppable",
  "Golden Hour Vibes",
  "Absolutely Iconic",
  "Peak Brilliance"
];

export const SunPrism: React.FC = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [message, setMessage] = useState('');

  const handlePrismClick = () => {
    if (isRotating) return;
    
    setIsRotating(true);
    const randomMsg = HYPE_MESSAGES[Math.floor(Math.random() * HYPE_MESSAGES.length)];
    setMessage(randomMsg);
    
    setTimeout(() => {
      setIsRotating(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative group cursor-pointer" onClick={handlePrismClick}>
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
        
        <motion.div
          animate={{
            rotate: isRotating ? 360 : [0, 10, -10, 0],
            scale: isRotating ? [1, 1.2, 1] : 1
          }}
          transition={{
            rotate: isRotating ? { duration: 0.8, ease: "circOut" } : { duration: 6, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.8 }
          }}
          className="relative w-48 h-48 rounded-[3rem] bg-gradient-to-tr from-yellow-300/40 to-amber-200/40 backdrop-blur-3xl border-2 border-yellow-200/50 flex items-center justify-center shadow-2xl shadow-yellow-500/20"
        >
          <Sun size={80} className="text-yellow-600 fill-yellow-600/20" strokeWidth={2.5} />
          
          <AnimatePresence>
            {isRotating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      x: [0, (Math.random() - 0.5) * 300], 
                      y: [0, (Math.random() - 0.5) * 300],
                      opacity: [1, 0],
                      scale: [0, 1.5]
                    }}
                    transition={{ duration: 1 }}
                    className="absolute top-1/2 left-1/2"
                  >
                    <Sparkles className="text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="h-8">
        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              key={message}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              className="px-8 py-3 bg-yellow-400/20 backdrop-blur-xl border-2 border-yellow-200/30 rounded-2xl shadow-xl"
            >
              <span className="text-yellow-900 font-black uppercase tracking-[0.2em] text-sm flex items-center gap-3">
                <Star size={16} fill="currentColor" />
                {message}
                <Star size={16} fill="currentColor" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
