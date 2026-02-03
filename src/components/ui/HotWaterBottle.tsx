import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer } from 'lucide-react';
import { useInterval } from '../../hooks/useInterval';

export const HotWaterBottle: React.FC = () => {
  const [isWarm, setIsWarm] = useState(false);

  useInterval(
    () => {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(200);
      }
    },
    isWarm ? 300 : null
  );

  const startWarmth = () => setIsWarm(true);
  const stopWarmth = () => setIsWarm(false);

  return (
    <>
      <AnimatePresence>
        {isWarm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }} // Fixed opacity as per requirement
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 pointer-events-none bg-orange-600 mix-blend-overlay z-[250] backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseDown={startWarmth}
        onMouseUp={stopWarmth}
        onMouseLeave={stopWarmth}
        onTouchStart={(e) => { e.preventDefault(); startWarmth(); }}
        onTouchEnd={stopWarmth}
        className={`p-8 rounded-[2.5rem] backdrop-blur-3xl border-2 transition-all duration-500 shadow-2xl flex flex-col items-center gap-3 ${
          isWarm 
            ? 'bg-orange-500/40 border-orange-200 text-white shadow-orange-500/40' 
            : 'bg-white/10 border-white/20 text-blue-200 hover:bg-white/20'
        }`}
      >
        <motion.div
          animate={isWarm ? { 
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1]
          } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <Thermometer size={48} strokeWidth={2.5} fill="currentColor" fillOpacity={0.2} />
        </motion.div>
        <span className="text-[11px] uppercase font-black tracking-[0.25em]">Hold for Warmth</span>
      </motion.button>
    </>
  );
};
