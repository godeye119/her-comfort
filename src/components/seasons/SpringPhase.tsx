import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeasonStore } from '../../store/useSeasonStore';
import { 
  Volume2, 
  VolumeX, 
  Leaf, 
  Bird, 
  Sprout,
  Cat
} from 'lucide-react';
import { StretchingGuide } from './StretchingGuide';
import { MindBloom } from './MindBloom';
import { IntentionGarden } from './IntentionGarden';

export const SpringPhase: React.FC = () => {
  const { isSoundEnabled, toggleSound } = useSeasonStore();

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-6 md:p-12">
      {/* Soft Glow Layer */}
      <SoftGlow />

      {/* Sun Rays Layer */}
      <SunRays />

      {/* Motion Particle Layer (Petals/Butterflies) */}
      <MotionParticles />

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="relative z-20 w-full h-full max-w-5xl max-h-[850px] rounded-[3rem] bg-emerald-50/10 backdrop-blur-md border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] flex flex-col items-center justify-between py-12 px-8 pointer-events-auto overflow-hidden"
      >
        {/* Environment Decor */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
           <div className="absolute top-10 left-10"><Leaf className="text-emerald-200 rotate-12" size={32} /></div>
           <div className="absolute top-20 right-20"><Bird className="text-emerald-100 -rotate-12" size={24} /></div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/30 border border-pink-200/20 text-[10px] font-bold uppercase tracking-[0.2em] text-pink-900/70 backdrop-blur-sm z-30">
          <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
          Status: I am here with you
        </div>

        {/* Content Area - Spacious Layout */}
        <div className="flex flex-col items-center justify-between w-full flex-1 py-8 relative z-20">
          
          {/* TOP: Header */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
               <Sprout className="text-pink-900/60" size={32} />
               <h1 className="text-4xl md:text-6xl font-serif font-light text-emerald-900/90 tracking-tight italic text-center drop-shadow-sm">
                 Bloom with love & energy.
               </h1>
            </div>
            <GentleAffirmations />
          </div>

          {/* CENTER: Mind Bloom */}
          <div className="flex-1 flex items-center justify-center w-full min-h-[160px] my-4">
             <MindBloom />
          </div>
          
          {/* BOTTOM ROW: Actions */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-4 mb-2">
            <StretchingGuide />
            
            <IntentionGarden />

            <div className="w-px h-8 bg-emerald-900/10 mx-2 hidden md:block" />

            <button 
              onClick={toggleSound}
              className="p-3 rounded-full bg-white/30 backdrop-blur-md border border-white/30 text-emerald-800/60 hover:text-emerald-800 transition-all hover:bg-white/40 shadow-sm"
            >
              {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>

        </div>
        
        <CatCompanion />
      </motion.div>

      <CompanionVoiceLines />
      <SoundSystem />
    </div>
  );
};

const SunRays: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[50%] bg-gradient-to-b from-yellow-100/20 to-transparent origin-top-left"
          style={{ 
            transform: `rotate(${30 + i * 20}deg)`,
            filter: 'blur(40px)'
          }}
        />
      ))}
    </div>
  );
};

const SoftGlow: React.FC = () => {
  return (
    <motion.div
      animate={{
        opacity: [0.4, 0.6, 0.4],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        background: `radial-gradient(circle at 50% 30%, rgba(209, 250, 229, 0.4) 0%, rgba(209, 250, 229, 0) 70%)`
      }}
    />
  );
};

const GentleAffirmations: React.FC = () => {
  const [index, setIndex] = useState(0);
  const affirmations = useMemo(() => [
    "Growth should feel safe, not forced.",
    "Returning to life, at your own pace.",
    "The world is waking up with you.",
    "Gentle curiosity is enough.",
    "You are blooming beautifully."
  ], []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % affirmations.length);
    }, 8000);
    return () => clearTimeout(timeout);
  }, [index, affirmations.length]);

  return (
    <div className="h-12 flex items-center justify-center px-4 text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 0.8, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(5px)' }}
          transition={{ duration: 2 }}
          className="text-lg md:text-xl font-light text-emerald-900 tracking-wide max-w-2xl"
        >
          {affirmations[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const MotionParticles: React.FC = () => {
  const [petals] = useState(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    drift: Math.random() * 20 - 10,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 10,
    size: 8 + Math.random() * 12
  })));

  const [butterflies] = useState(() => Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 10,
    duration: 20 + Math.random() * 10
  })));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((p) => (
        <motion.div
          key={`petal-${p.id}`}
          initial={{ x: `${p.x}vw`, y: '-10vh', opacity: 0, rotate: 0 }}
          animate={{ 
            y: '110vh', 
            x: `${p.x + p.drift}vw`,
            opacity: [0, 0.4, 0.4, 0],
            rotate: 360
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear"
          }}
          className="absolute text-pink-200/40"
          style={{ width: p.size, height: p.size }}
        >
          <Leaf fill="currentColor" />
        </motion.div>
      ))}

      {butterflies.map((b) => (
        <motion.div
          key={`butterfly-${b.id}`}
          initial={{ x: '-10vw', y: '50vh', opacity: 0 }}
          animate={{ 
            x: '110vw',
            y: ['40vh', '60vh', '30vh', '50vh'],
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{ 
            x: { duration: b.duration, repeat: Infinity, delay: b.delay, ease: "linear" },
            y: { duration: b.duration / 2, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: b.duration, repeat: Infinity, delay: b.delay }
          }}
          className="absolute text-emerald-300/40"
        >
          <motion.div
            animate={{ rotateY: [0, 80, 0] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            <Bird size={24} fill="currentColor" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const CatCompanion: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [meow, setMeow] = useState(false);

  const handlePet = () => {
    setMeow(true);
    setTimeout(() => setMeow(false), 2000);
  };

  return (
    <div className="relative mt-2 group cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handlePet}>
       <AnimatePresence>
        {meow && (
          <motion.div 
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -40 }}
            exit={{ opacity: 0 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-emerald-800 font-medium text-sm"
          >
            *purr*
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        animate={{ 
          y: isHovered ? [0, -5, 0] : [0, -3, 0],
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-emerald-900/40 group-hover:text-emerald-900/60 transition-colors"
      >
        <Cat size={80} strokeWidth={1.5} />
      </motion.div>
    </div>
  );
};

const CompanionVoiceLines: React.FC = () => {
  const [line, setLine] = useState("");
  const lines = useMemo(() => [
    "It's a beautiful day to just be.",
    "You're doing great, one step at a time.",
    "I'm here for you.",
    "Everything is blooming at its own pace."
  ], []);

  useEffect(() => {
    const showLine = () => {
      setLine(lines[Math.floor(Math.random() * lines.length)]);
      setTimeout(() => setLine(""), 5000);
    };

    const interval = setInterval(showLine, 20000);
    return () => clearInterval(interval);
  }, [lines]);

  return (
    <AnimatePresence>
      {line && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-12 right-12 z-30 text-emerald-900 font-light italic text-lg pointer-events-none"
        >
          {line}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SoundSystem: React.FC = () => {
  const { isSoundEnabled } = useSeasonStore();

  useEffect(() => {
    if (isSoundEnabled) {
      console.log("Spring sounds active: Birds, Wind, Light chimes");
    }
  }, [isSoundEnabled]);

  return null;
};
