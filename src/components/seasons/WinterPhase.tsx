import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeasonStore } from '../../store/useSeasonStore';

import { 
  Volume2, 
  VolumeX, 
  Pencil, 
  Heart, 
  HandHeart,
  CloudSnow, 
  ThermometerSnowflake, 
  Flame,
  X 
} from 'lucide-react';

export const WinterPhase: React.FC = () => {
  const { winterState, setWinterState, isSoundEnabled, toggleSound } = useSeasonStore();

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-6 md:p-12">
      {/* 2. Frosted Glass UI Layer & 3. Warm Overlay Layer */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: winterState === 'comfort' ? 0.4 : 0.1,
          backgroundColor: 'rgba(124, 45, 18, 0.05)'
        }}
        className="absolute inset-0 backdrop-blur-none pointer-events-none z-10 transition-colors duration-[3000ms]"
      />

      {/* 4. Breathing Glow Layer */}
      <BreathingGlow />

      {/* Large Central Frosted Glass UI Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="relative z-20 w-full h-full max-w-4xl max-h-[800px] rounded-3xl bg-slate-950/30 backdrop-blur-sm border border-white/10 shadow-2xl flex flex-col items-center justify-between py-16 px-8 pointer-events-auto"
      >
        {/* Status Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-100/40">
          <ThermometerSnowflake size={12} />
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
          Status: I am here with you
        </div>

        {/* Content Area */}
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-3 mb-2">
            <CloudSnow className="text-orange-100/50" size={32} />
            <h1 className="text-4xl md:text-6xl font-serif font-light text-orange-100/90 tracking-tight italic">
              I know it hurts.
            </h1>
          </div>
          <GentleAffirmations />
          
          <div className="flex flex-col items-center gap-12">
            <HoldForComfort />
            
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setWinterState(winterState === 'expression' ? 'idle' : 'expression')}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-orange-100/60 hover:text-orange-100 transition-all hover:bg-white/10 text-sm font-light tracking-widest uppercase"
              >
                <Pencil size={16} />
                Unload Thoughts
              </button>
              <button 
                onClick={toggleSound}
                className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-orange-100/60 hover:text-orange-100 transition-all hover:bg-white/10"
              >
                {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 7. Emotional Presence Layer (Voice Lines) */}
      <CompanionVoiceLines />

      {/* Modals/Overlays for specific states */}
      <AnimatePresence>
        {winterState === 'expression' && <UnloadThoughts />}
      </AnimatePresence>

      {/* Sound System handled in a separate effect/component */}
      <SoundSystem />
    </div>
  );
};

const BreathingGlow: React.FC = () => {
  const { winterState } = useSeasonStore();
  
  const intensity = winterState === 'comfort' ? 0.3 : 0.15;
  const duration = winterState === 'expression' ? 10 : 7;

  return (
    <motion.div
      animate={{
        opacity: [intensity * 0.5, intensity, intensity * 0.5],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        background: `radial-gradient(circle, ${winterState === 'comfort' ? 'rgba(251, 146, 60, 0.15)' : 'rgba(251, 146, 60, 0.08)'} 0%, rgba(251, 146, 60, 0) 70%)`
      }}
    />
  );
};

const GentleAffirmations: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isInitial, setIsInitial] = useState(true);

  const affirmations = [
    "Calm down, my love. I understand your pain, and I am holding you right now. Just breathe.",
    "You don't have to be strong right now.",
    "I've got you. Let's just rest.",
    "Sending you all my warmth."
  ];

  useEffect(() => {
    const delay = isInitial ? 10000 : 15000;
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % affirmations.length);
      setIsInitial(false);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [index, isInitial, affirmations.length]);

  return (
    <div className="h-24 flex items-center justify-center px-4 text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.7, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 3 }}
          className="text-xl md:text-2xl font-light text-orange-100 italic tracking-wide max-w-2xl"
        >
          {affirmations[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// Stable particle positions to satisfy strict lint rules
const STABLE_PARTICLES = [
  { x: 42, y: -38, duration: 2.4 },
  { x: -25, y: 45, duration: 3.1 },
  { x: 15, y: -12, duration: 2.8 },
  { x: -40, y: -20, duration: 3.5 },
  { x: 30, y: 25, duration: 2.2 },
  { x: -10, y: -45, duration: 3.8 }
];

const HoldForComfort: React.FC = () => {
  const { setWinterState } = useSeasonStore();
  const [isHolding, setIsHolding] = useState(false);

  const handleStart = () => {
    setIsHolding(true);
    setWinterState('comfort');
  };

  const handleEnd = () => {
    setIsHolding(false);
    setWinterState('idle');
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Expanding aura when holding */}
      <AnimatePresence>
        {isHolding && (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-orange-500/30 blur-3xl pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute inset-0 rounded-full bg-amber-400/20 blur-2xl pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      <motion.button
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        animate={{
          scale: isHolding ? [1, 1.02, 1] : 1,
          boxShadow: isHolding 
            ? "0 0 80px rgba(251, 146, 60, 0.5), inset 0 0 40px rgba(251, 146, 60, 0.2)" 
            : "0 0 20px rgba(251, 146, 60, 0.1)"
        }}
        transition={isHolding ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        className="w-56 h-56 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group transition-all cursor-pointer"
      >
        {/* Background "Presence" Glow */}
        <motion.div 
          animate={{ 
            opacity: isHolding ? 0.8 : 0.1,
            scale: isHolding ? 1.3 : 1,
            backgroundColor: isHolding ? 'rgba(251, 146, 60, 0.2)' : 'rgba(251, 146, 60, 0.05)'
          }}
          className="absolute inset-0 bg-gradient-to-b from-orange-400/40 to-orange-900/60 transition-colors duration-1000"
        />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <motion.div
            animate={{
              scale: isHolding ? [1, 1.15, 1] : 1,
              opacity: isHolding ? 1 : 0.4
            }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {isHolding ? (
              <HandHeart size={48} className="text-orange-200 drop-shadow-lg" />
            ) : (
              <Heart size={40} className="text-orange-100 group-hover:text-orange-300 transition-colors" />
            )}
          </motion.div>
          
          <div className="flex flex-col items-center">
            <span className="text-orange-100/80 group-hover:text-orange-100 transition-colors font-light tracking-[0.2em] uppercase text-xs">
              {isHolding ? "I'm holding you" : "Hold for Comfort"}
            </span>
            {isHolding && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[10px] text-orange-200/60 tracking-widest mt-2 uppercase"
              >
                Breathe with me
              </motion.span>
            )}
          </div>
        </div>

        {/* Floating dust/sparkle particles (simulated) */}
        {isHolding && (
          <div className="absolute inset-0 pointer-events-none">
            {STABLE_PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: [0, 0.5, 0]
                }}
                transition={{ duration: p.duration, repeat: Infinity }}
                className="absolute left-1/2 top-1/2 w-1 h-1 bg-orange-200 rounded-full"
              />
            ))}
          </div>
        )}
      </motion.button>
      
      {/* Idle Pulse Rings */}
      {!isHolding && (
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 rounded-full border border-orange-400/20 pointer-events-none"
        />
      )}
    </div>
  );
};

const UnloadThoughts: React.FC = () => {
  const { setWinterState } = useSeasonStore();
  const [text, setText] = useState("");
  const [isDissolving, setIsDissolving] = useState(false);

  const handleRelease = () => {
    setIsDissolving(true);
    setTimeout(() => {
      setText("");
      setIsDissolving(false);
      setWinterState('idle');
    }, 4000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-black/40 backdrop-blur-md"
    >
      {/* Release into Glow Effect */}
      <AnimatePresence>
        {isDissolving && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [1, 2, 2.5], 
                opacity: [0, 0.3, 0],
              }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="w-96 h-96 rounded-full bg-orange-500/20 blur-[100px]"
            />
            <ThoughtParticles />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-xl flex flex-col items-center gap-8 relative z-10">
        <div className="flex items-center gap-2 text-orange-100/60 mb-2">
          <Pencil size={20} />
          <span className="font-serif italic text-lg">Let it all out...</span>
        </div>
        <motion.textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          animate={isDissolving ? { 
            opacity: 0, 
            filter: 'blur(20px)', 
            y: -100,
            scale: 0.8,
            rotate: [0, 5, -5, 0]
          } : { opacity: 0.7 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          placeholder="Unload your thoughts here..."
          className="w-full h-64 bg-white/5 border border-white/10 rounded-3xl p-8 text-orange-100 focus:outline-none resize-none text-lg font-light placeholder:text-orange-100/20 shadow-2xl"
        />
        
        {!isDissolving && text.length > 0 && (
          <button 
            onClick={handleRelease}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-orange-400/20 border border-orange-400/40 text-orange-100 hover:bg-orange-400/30 transition-all font-light tracking-widest uppercase text-sm"
          >
            <Flame size={16} className="text-orange-200" />
            Release into the Glow
          </button>
        )}

        {!isDissolving && (
          <button 
            onClick={() => setWinterState('idle')}
            className="flex items-center gap-2 text-orange-100/40 hover:text-orange-100/60 transition-colors text-sm uppercase tracking-widest font-light"
          >
            <X size={14} />
            Go Back
          </button>
        )}
      </div>
    </motion.div>
  );
};

const ThoughtParticles: React.FC = () => {
  // Stable particle offsets to avoid re-renders or hydration issues
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    angle: (i / 12) * Math.PI * 2,
    distance: 100 + (i * 10),
    duration: 2 + (i % 3)
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 0, scale: 1 }}
          animate={{ 
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance - 100,
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{ 
            duration: p.duration,
            ease: "easeOut",
            delay: p.id * 0.1
          }}
          className="absolute w-2 h-2 bg-orange-200/40 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

// Stable voice lines for the companion
const COMPANION_LINES = [
  "I'm here with you.",
  "You're doing so well just being.",
  "Rest is enough.",
  "Take all the time you need."
];

const CompanionVoiceLines: React.FC = () => {
  const [line, setLine] = useState<string | null>(null);
  const { winterState } = useSeasonStore();

  useEffect(() => {
    if (winterState === 'idle') {
      const timer = setTimeout(() => setLine(null), 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setLine(COMPANION_LINES[Math.floor(Math.random() * COMPANION_LINES.length)]);
    }, 5000); // Show after 5s of interaction

    return () => clearTimeout(timer);
  }, [winterState]);

  return (
    <AnimatePresence>
      {line && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.4, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute bottom-12 left-0 right-0 text-center pointer-events-none"
        >
          <p className="text-orange-100 text-sm font-light italic">{line}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SoundSystem: React.FC = () => {
  const { winterState, isSoundEnabled } = useSeasonStore();
  
  useEffect(() => {
    if (!isSoundEnabled) return;

    // Logic for sound transitions based on winterState
    if (winterState === 'comfort') {
      // Fade in heartbeat
      console.log("Sound: Fading in slow heartbeat...");
    } else {
      // Fade out
      console.log("Sound: Fading out...");
    }
  }, [winterState, isSoundEnabled]);

  return null; 
};
