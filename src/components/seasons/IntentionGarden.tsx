import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Flower, Check } from 'lucide-react';

export const IntentionGarden: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [intention, setIntention] = useState("");
  const [isPlanted, setIsPlanted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [particles, setParticles] = useState<{ x: number; y: number }[]>([]);

  React.useEffect(() => {
    setParticles([...Array(8)].map(() => ({
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
    })));
  }, [showAnimation]);

  const handlePlant = () => {
    if (intention.trim()) {
      setIsOpen(false);
      setShowAnimation(true);
      
      // Animation sequence
      setTimeout(() => {
        setShowAnimation(false);
        setIsPlanted(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }, 2500);
    }
  };

  return (
    <div className="relative z-30">
      <AnimatePresence mode="wait">
        {!isPlanted ? (
          <motion.button
            key="sow-button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-100/30 border border-emerald-200/50 text-emerald-900/80 hover:bg-emerald-100/50 transition-all font-medium text-sm backdrop-blur-sm shadow-sm"
          >
            <Sprout size={18} className="text-emerald-600" />
            <span>Sow an Intention</span>
          </motion.button>
        ) : (
          <motion.div
            key="planted-flower"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="group relative cursor-help"
          >
            <div className="absolute inset-0 bg-pink-400/20 blur-xl rounded-full animate-pulse" />
            <div className="relative p-3 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-inner">
              <Flower size={28} className="text-pink-500 fill-pink-200/50" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none min-w-[120px]">
              <div className="bg-emerald-900/90 backdrop-blur-md text-white text-xs py-2 px-3 rounded-xl shadow-xl border border-white/10 text-center">
                <p className="font-serif italic opacity-70 mb-1">Your Intention</p>
                <p className="font-medium whitespace-nowrap">{intention}</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-emerald-900/90" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Earthy Glass Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-emerald-950/20 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-stone-50/90 backdrop-blur-xl p-8 rounded-[2.5rem] w-full max-w-sm shadow-2xl border border-stone-200/50 relative overflow-hidden"
            >
              {/* Decorative Earth Pattern */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-800/20 via-stone-400/20 to-emerald-800/20" />
              
              <div className="relative z-10">
                <h3 className="font-serif text-stone-800 text-xl mb-2 flex items-center gap-2">
                  <Sprout size={24} className="text-emerald-600" />
                  New Beginnings
                </h3>
                <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                  What do you want to grow this cycle?
                </p>
                
                <textarea
                  autoFocus
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  className="w-full h-32 bg-stone-200/30 rounded-2xl p-4 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none mb-6 font-light transition-all border border-stone-200/50"
                  placeholder="Plant your seed here..."
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-3 rounded-full hover:bg-stone-200/50 text-stone-500 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePlant}
                    disabled={!intention.trim()}
                    className="flex-[2] py-3 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10 transition-all active:scale-95"
                  >
                    <Check size={18} /> Plant Seed
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Planting Animation */}
      <AnimatePresence>
        {showAnimation && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ y: -200, opacity: 0, scale: 1 }}
              animate={{ 
                y: 0, 
                opacity: [0, 1, 1],
                scale: [1, 1, 0],
              }}
              transition={{ duration: 1, ease: "easeIn" }}
              className="w-4 h-4 bg-amber-900 rounded-full shadow-lg"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 1],
                opacity: [0, 1, 1]
              }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ delay: 2, duration: 0.5 }}
                >
                  <Flower size={80} className="text-pink-400 fill-pink-100/30" />
                </motion.div>
                {/* Particles */}
                {particles.map((pos, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      scale: [0, 1, 0],
                      x: pos.x,
                      y: pos.y,
                    }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-emerald-300 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Feedback */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[120] bg-emerald-900/90 backdrop-blur-md text-white px-8 py-3 rounded-full shadow-2xl text-sm flex items-center gap-3 border border-white/10"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Sprout size={14} className="text-emerald-400" />
            </div>
            <span className="font-light tracking-wide">Your intention is planted.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
