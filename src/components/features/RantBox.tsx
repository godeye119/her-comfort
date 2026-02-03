/* eslint-disable react-hooks/purity */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Wind } from 'lucide-react';

export const RantBox: React.FC = () => {
  const [text, setText] = useState('');
  const [isBurning, setIsBurning] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleBurn = () => {
    if (!text.trim()) return;
    
    setIsBurning(true);
    setText(''); // Immediately clear text as per requirement
    
    setTimeout(() => {
      setIsBurning(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-md p-6 flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-orange-900/30 bg-orange-900/10 backdrop-blur-2xl p-6 shadow-2xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Release your thoughts into the fire..."
          className="w-full h-48 bg-transparent border-none outline-none text-orange-950 placeholder-orange-900/40 resize-none font-serif text-xl leading-relaxed"
          disabled={isBurning}
        />
        
        <AnimatePresence>
          {isBurning && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 200, x: (Math.random() - 0.5) * 300, opacity: 1, scale: 1 }}
                  animate={{ y: -400, opacity: 0, scale: 0.2 }}
                  transition={{ duration: 1.8, delay: Math.random() * 0.4 }}
                  className={`absolute w-6 h-6 rounded-full ${i % 2 === 0 ? 'bg-orange-500 blur-md' : 'bg-orange-900/40 blur-[2px]'}`}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBurn}
        disabled={isBurning || !text.trim()}
        className={`flex items-center justify-center gap-3 py-5 rounded-3xl font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-xl ${
          isBurning 
            ? 'bg-orange-800 text-orange-200 scale-95' 
            : 'bg-orange-950 text-orange-50 hover:bg-black shadow-orange-950/40'
        }`}
      >
        {isBurning ? <Wind className="animate-spin" strokeWidth={3} /> : <Flame strokeWidth={3} fill="currentColor" fillOpacity={0.2} />}
        {isBurning ? 'Releasing...' : 'Burn & Release'}
      </motion.button>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-black/90 text-orange-100 px-8 py-3 rounded-2xl border-2 border-orange-900/50 backdrop-blur-2xl text-xs font-black tracking-widest shadow-2xl z-[400] uppercase"
          >
            Released to the winds.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
