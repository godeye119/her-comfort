import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Check, X } from 'lucide-react';

interface Firefly {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  glowDuration: number;
  path: { x: number[]; y: number[] };
}

// Generate a random wandering path for each firefly
const generatePath = () => {
  const points = 6;
  const xPath: number[] = [];
  const yPath: number[] = [];
  
  for (let i = 0; i < points; i++) {
    xPath.push(Math.random() * 80 + 10); // 10% to 90% of viewport width
    yPath.push(Math.random() * 70 + 15); // 15% to 85% of viewport height
  }
  
  // Close the loop
  xPath.push(xPath[0]);
  yPath.push(yPath[0]);
  
  return { x: xPath, y: yPath };
};

export const IdeaSpark: React.FC = () => {
  const [fireflies] = useState<Firefly[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      startX: Math.random() * 80 + 10,
      startY: Math.random() * 70 + 15,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      glowDuration: 1.5 + Math.random(),
      path: generatePath(),
    }))
  );

  const [isOpen, setIsOpen] = useState(false);
  const [idea, setIdea] = useState("");
  const [capturedIdeas, setCapturedIdeas] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  const handleCatch = () => {
    setIsOpen(true);
  };

  const handleSave = () => {
    if (idea.trim()) {
      setCapturedIdeas(prev => [...prev, idea]); // Store the idea
      setIsOpen(false);
      setIdea(""); // Reset input
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {fireflies.map((f) => (
          <motion.button
            key={f.id}
            onClick={handleCatch}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
            }}
            animate={{ 
              x: f.path.x.map(v => `${v}vw`),
              y: f.path.y.map(v => `${v}vh`),
              opacity: [0.2, 0.9, 0.5, 0.9, 0.3, 0.8, 0.2],
              scale: [1, 1.2, 0.9, 1.1, 1],
            }}
            transition={{
              duration: f.duration,
              repeat: Infinity,
              delay: f.delay,
              ease: "easeInOut",
              times: undefined,
            }}
            className="w-8 h-8 flex items-center justify-center pointer-events-auto cursor-pointer group hover:scale-150 transition-transform"
          >
            <motion.div 
              className="w-3 h-3 bg-yellow-300 rounded-full group-hover:bg-yellow-100"
              animate={{
                boxShadow: [
                  '0 0 8px 2px rgba(253,224,71,0.6)',
                  '0 0 16px 4px rgba(253,224,71,0.9)',
                  '0 0 8px 2px rgba(253,224,71,0.6)',
                ],
              }}
              transition={{
                duration: f.glowDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        ))}
      </div>

      <div className="relative z-10">
         <button 
           onClick={() => setIsOpen(true)}
           className="flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-100/30 border border-yellow-200/50 text-yellow-900/80 hover:bg-yellow-100/50 transition-all font-medium text-sm backdrop-blur-sm"
         >
           <Lightbulb size={18} />
           <span>Catch Idea</span>
           {capturedIdeas.length > 0 && (
             <span className="ml-1 px-2 py-0.5 text-xs bg-yellow-400/50 rounded-full">
               {capturedIdeas.length}
             </span>
           )}
         </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
          >
            <div className="bg-white/90 p-6 rounded-3xl w-full max-w-sm shadow-xl border border-white/60">
               <h3 className="font-serif text-emerald-900 text-lg mb-4 flex items-center gap-2">
                 <Lightbulb size={20} className="text-yellow-500" />
                 Capture your idea...
               </h3>
               <textarea 
                 autoFocus
                 value={idea}
                 onChange={(e) => setIdea(e.target.value)}
                 className="w-full h-32 bg-emerald-50/50 rounded-xl p-4 text-emerald-900 placeholder:text-emerald-900/40 focus:outline-none resize-none mb-4 font-light"
                 placeholder="What's on your mind?"
               />
               <div className="flex gap-2 justify-end">
                 <button 
                   onClick={() => setIsOpen(false)}
                   className="p-2 rounded-full hover:bg-emerald-100/50 text-emerald-900/60"
                 >
                   <X size={20} />
                 </button>
                 <button 
                   onClick={handleSave}
                   disabled={!idea}
                   className="px-6 py-2 rounded-full bg-emerald-500 text-white font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                 >
                   <Check size={16} /> Save
                 </button>
               </div>
            </div>
          </motion.div>
        )}

        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-emerald-800 text-white px-6 py-2 rounded-full shadow-lg text-sm flex items-center gap-2 pointer-events-none"
          >
            <Check size={14} /> Saved to your garden
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
