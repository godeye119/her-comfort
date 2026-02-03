import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Sparkles } from 'lucide-react';

const FOCUS_WORDS = [
  "Today is My Day", "Dream Big", "Breathe Deeply", 
  "You are Magical✨", "You are Loved❤️", "Small Wins Matter", "Princess of My World", "You are the Bestt"
];

const SparkleBurst: React.FC = () => {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0], 
              x: Math.cos(i * 60 * (Math.PI / 180)) * 60, 
              y: Math.sin(i * 60 * (Math.PI / 180)) * 60,
              opacity: [0, 1, 0] 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
          />
        ))}
      </div>
    );
};

export const MindBloom: React.FC = () => {
  const [isBloomed, setIsBloomed] = useState(false);
  const [word, setWord] = useState("");

  const handleBloom = () => {
    if (!isBloomed) {
      const randomWord = FOCUS_WORDS[Math.floor(Math.random() * FOCUS_WORDS.length)];
      setWord(randomWord);
      setIsBloomed(true);
    } else {
      setIsBloomed(false);
      setWord("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-64 relative w-full"> 
       {/* Height increased to accommodate floating elements */}
       
       <AnimatePresence>
         {isBloomed && (
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 10 }}
             className="absolute top-4 flex flex-col items-center z-20 pointer-events-none"
           >
             <motion.span 
               className="text-3xl font-serif italic text-emerald-900 bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full shadow-lg border border-emerald-100/50"
             >
               {word}
               <Sparkles className="absolute -top-3 -right-3 text-yellow-500 animate-pulse fill-yellow-200" size={20} />
             </motion.span>
           </motion.div>
         )}
       </AnimatePresence>

       <button 
         onClick={handleBloom}
         className="relative group focus:outline-none mt-16" // Added top margin to separate from word
       >
         <motion.div
           animate={{
             scale: isBloomed ? 1.5 : 1,
             rotate: isBloomed ? 360 : 0,
             color: isBloomed ? '#F472B6' : '#34D399' 
           }}
           transition={{ duration: 0.8, type: "spring" }}
           className="relative z-10"
         >
           <Flower2 size={isBloomed ? 64 : 48} strokeWidth={1.5} />
           {isBloomed && <SparkleBurst />}
         </motion.div>
         
         {!isBloomed && (
           <motion.span 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-emerald-800/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
           >
             Tap to bloom
           </motion.span>
         )}
       </button>
    </div>
  );
};
