import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, Play, RefreshCw } from 'lucide-react';

export const StretchingGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                setIsActive(false);
                return 0;
            }
            return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    if (timeLeft === 0) setTimeLeft(30);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(30);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetTimer();
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-100/30 border border-emerald-200/50 text-emerald-900/80 hover:bg-emerald-100/50 transition-all font-medium text-sm backdrop-blur-sm"
      >
        <User size={18} />
        <span>Body Awakening</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-900/20 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/90 rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white/40 flex flex-col items-center gap-6 relative"
            >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-emerald-900/40 hover:text-emerald-900 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center">
                <h3 className="text-2xl font-serif text-emerald-900 mb-2">Stretch Gently</h3>
                <p className="text-emerald-800/60 text-sm">Release tension, expand your chest.</p>
              </div>

              {/* Visualization / Placeholder */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Timer Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle 
                    cx="96" cy="96" r="90" 
                    fill="none" 
                    stroke="#D1FAE5" 
                    strokeWidth="8"
                  />
                  <motion.circle 
                    cx="96" cy="96" r="90" 
                    fill="none" 
                    stroke="#34D399" 
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 1 }}
                    animate={{ pathLength: timeLeft / 30 }}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                </svg>

                <div className="bg-emerald-100 w-32 h-32 rounded-full flex items-center justify-center overflow-hidden relative z-10">
                   {/* Placeholder Illustration */}
                   <User size={64} className="text-emerald-400" />
                </div>
              </div>

              <div className="text-center h-8">
                <AnimatePresence mode="wait">
                  {timeLeft > 0 ? (
                    <motion.p 
                      key="breathing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-emerald-700 font-medium"
                    >
                      {timeLeft > 15 ? "Breathe in... expand..." : "Breathe out... release..."}
                    </motion.p>
                  ) : (
                     <motion.p 
                      key="done"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-emerald-600 font-bold"
                    >
                      Well done. ✨
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-4">
                {!isActive && timeLeft > 0 && (
                   <button 
                    onClick={handleStart}
                    className="flex items-center gap-2 px-8 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
                  >
                    <Play size={16} fill="currentColor" /> Start
                  </button>
                )}
                
                {isActive && (
                   <div className="text-3xl font-light text-emerald-900 font-mono">
                     00:{timeLeft.toString().padStart(2, '0')}
                   </div>
                )}

                {timeLeft === 0 && (
                   <button 
                    onClick={resetTimer}
                    className="flex items-center gap-2 px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors"
                  >
                    <RefreshCw size={16} /> Again
                  </button>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
