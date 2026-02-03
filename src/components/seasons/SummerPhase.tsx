import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeasonStore } from '../../store/useSeasonStore';
import { 
  Volume2, 
  VolumeX, 
  Sun,
  Music,
  Sparkles,
  Heart,
  Star
} from 'lucide-react';

export const SummerPhase: React.FC = () => {
  const { isSoundEnabled, toggleSound } = useSeasonStore();

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-6 md:p-12">
      {/* Golden Glow Layer */}
      <GoldenGlow />

      {/* Radiant Rays Layer */}
      <RadiantRays />

      {/* Warmth Particles Layer */}
      <WarmthParticles />

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative z-20 w-full h-full max-w-5xl max-h-[850px] rounded-[3rem] bg-amber-50/20 backdrop-blur-md border border-amber-200/30 shadow-[0_0_60px_rgba(251,191,36,0.3)] flex flex-col items-center justify-between py-12 px-8 pointer-events-auto overflow-hidden"
      >
        {/* Environment Decor */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
           <div className="absolute top-10 left-10"><Sun className="text-amber-200 rotate-12" size={32} /></div>
           <div className="absolute top-20 right-20"><Star className="text-yellow-100 -rotate-12" size={24} /></div>
           <div className="absolute bottom-20 left-16"><Sparkles className="text-amber-100 rotate-45" size={28} /></div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/30 border border-amber-200/20 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900/70 backdrop-blur-sm z-30">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          Radiance Mode
        </div>

        {/* Content Area */}
        <div className="flex flex-col items-center justify-between w-full flex-1 py-8 relative z-20">
          
          {/* TOP: Radiance Mirror */}
          <div className="flex flex-col items-center gap-6">
            <RadianceMirror />
          </div>

          {/* CENTER: Glow Tap */}
          <div className="flex-1 flex items-center justify-center w-full min-h-[160px] my-4">
             <GlowTap />
          </div>
          
          {/* BOTTOM ROW: Actions */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-4 mb-2">
            <MoodSongDrop />
            
            <ColorPlay />

            <ExpressionSpark />

            <div className="w-px h-8 bg-amber-900/10 mx-2 hidden md:block" />

            <button 
              onClick={toggleSound}
              className="p-3 rounded-full bg-amber-100/30 backdrop-blur-md border border-amber-200/30 text-amber-800/60 hover:text-amber-800 transition-all hover:bg-amber-100/50 shadow-sm"
            >
              {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>
        
        <CompanionEnergyMode />
      </motion.div>

      <GoldenAffirmations />
      <VoiceOfAdmiration />
      <SummerAudioAtmosphere />
    </div>
  );
};

const GoldenGlow: React.FC = () => {
  return (
    <motion.div
      animate={{
        opacity: [0.6, 0.8, 0.6],
        scale: [1, 1.03, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        background: `radial-gradient(circle at 50% 40%, rgba(251, 191, 36, 0.4) 0%, rgba(252, 211, 77, 0.2) 40%, transparent 70%)`
      }}
    />
  );
};

const RadiantRays: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[60%] bg-gradient-to-b from-amber-100/20 via-yellow-100/10 to-transparent origin-top-left"
          style={{ 
            transform: `rotate(${20 + i * 15}deg)`,
            filter: 'blur(50px)'
          }}
        />
      ))}
    </div>
  );
};

const RadianceMirror: React.FC = () => {
  const [index, setIndex] = useState(0);
  const affirmations = useMemo(() => [
    "You carry light.",
    "Your presence changes rooms.",
    "You radiate warmth.",
    "Your energy is magnetic.",
    "You are radiant.",
    "You are powerful.",
    "You are safe to be seen.",
    "You are free to express."
  ], []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % affirmations.length);
    }, 6000);
    return () => clearTimeout(timeout);
  }, [index, affirmations.length]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Sun className="text-amber-600/80" size={32} />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-serif font-light text-amber-900/90 tracking-tight italic text-center drop-shadow-sm">
          Your radiant energy
        </h1>
      </div>
      
      <div className="h-16 flex items-center justify-center px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, filter: 'blur(5px)', y: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(5px)', y: -10 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-light text-amber-800 tracking-wide max-w-2xl"
          >
            {affirmations[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

const GlowTap: React.FC = () => {
  const [isGlowing, setIsGlowing] = useState(false);
  const [affirmation, setAffirmation] = useState("");
  
  const glowAffirmations = useMemo(() => [
    "You shine brightly.",
    "Your warmth touches everyone.",
    "You are luminous.",
    "Your glow is beautiful.",
    "You radiate confidence."
  ], []);

  const handleTap = () => {
    if (!isGlowing) {
      const randomAffirmation = glowAffirmations[Math.floor(Math.random() * glowAffirmations.length)];
      setAffirmation(randomAffirmation);
      setIsGlowing(true);
      setTimeout(() => {
        setIsGlowing(false);
        setAffirmation("");
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <AnimatePresence>
        {isGlowing && affirmation && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="absolute -top-20 flex flex-col items-center z-20 pointer-events-none"
          >
            <motion.span 
              className="text-2xl font-serif italic text-amber-900 bg-amber-50/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-amber-200/50"
            >
              {affirmation}
              <Sparkles className="absolute -top-2 -right-2 text-amber-500 animate-pulse fill-amber-200" size={16} />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={handleTap}
        className="relative group focus:outline-none"
      >
        <motion.div
          animate={{
            scale: isGlowing ? 1.3 : 1,
            filter: isGlowing ? "drop-shadow(0 0 30px rgba(251, 191, 36, 0.8))" : "drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))"
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 text-amber-500"
        >
          <motion.div
            animate={isGlowing ? {
              boxShadow: [
                "0 0 20px rgba(251, 191, 36, 0.4)",
                "0 0 60px rgba(251, 191, 36, 0.8)",
                "0 0 20px rgba(251, 191, 36, 0.4)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: isGlowing ? Infinity : 0 }}
            className="rounded-full bg-amber-100/20 p-8 border border-amber-200/30"
          >
            <Sun size={64} strokeWidth={1.5} fill="currentColor" />
          </motion.div>
        </motion.div>
        
        {!isGlowing && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs text-amber-800/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Tap to glow
          </motion.span>
        )}
      </button>
    </div>
  );
};

const MoodSongDrop: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-3 rounded-full bg-amber-100/30 backdrop-blur-md border border-amber-200/30 text-amber-800/70 hover:text-amber-800 transition-all hover:bg-amber-100/50 shadow-sm"
      >
        <Music size={20} />
        <span className="text-sm font-medium">Play a song that feels like you</span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 p-4 rounded-2xl bg-amber-50/90 backdrop-blur-md border border-amber-200/50 shadow-xl z-30"
          >
            <p className="text-amber-800 text-center font-light italic">
              "Golden hour melodies flowing through your soul..."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ColorPlay: React.FC = () => {
  const [warmth, setWarmth] = useState(0.5);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-amber-800/70 font-medium">Warmth</span>
      <motion.div 
        className="w-32 h-6 rounded-full border border-amber-200/30 relative cursor-pointer"
        style={{
          background: `linear-gradient(90deg, 
            rgba(251, 191, 36, 0.3) 0%, 
            rgba(251, 191, 36, ${0.3 + warmth * 0.4}) 100%)`
        }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const newWarmth = Math.max(0, Math.min(1, x / rect.width));
          setWarmth(newWarmth);
        }}
      >
        <motion.div
          className="absolute top-1 w-4 h-4 rounded-full bg-amber-400 shadow-md"
          style={{ left: `${warmth * (100 - 16)}%` }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      </motion.div>
    </div>
  );
};

const ExpressionSpark: React.FC = () => {
  const [selectedExpression, setSelectedExpression] = useState("");
  
  const expressions = ["joy", "love", "confidence", "creativity", "connection", "freedom"];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-amber-800/70 font-medium">Express:</span>
      <div className="flex gap-1">
        {expressions.map((expr) => (
          <motion.button
            key={expr}
            onClick={() => setSelectedExpression(expr)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedExpression === expr 
                ? "bg-amber-200/50 text-amber-900 border-amber-300/50" 
                : "bg-amber-100/20 text-amber-800/70 border-amber-200/30 hover:bg-amber-100/30"
            } border backdrop-blur-sm`}
          >
            {expr}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const WarmthParticles: React.FC = () => {
  const [particles] = useState(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    drift: Math.random() * 15 - 7.5,
    delay: Math.random() * 15,
    duration: 12 + Math.random() * 8,
    size: 4 + Math.random() * 8
  })));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          initial={{ x: `${p.x}vw`, y: '110vh', opacity: 0 }}
          animate={{ 
            y: '-10vh', 
            x: `${p.x + p.drift}vw`,
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear"
          }}
          className="absolute bg-amber-300/30 rounded-full blur-sm"
          style={{ 
            width: p.size, 
            height: p.size,
            boxShadow: `0 0 ${p.size * 2}px rgba(251, 191, 36, 0.3)`
          }}
        />
      ))}
    </div>
  );
};

const CompanionEnergyMode: React.FC = () => {
  const [isPlayful, setIsPlayful] = useState(false);

  const handlePlay = () => {
    setIsPlayful(true);
    setTimeout(() => setIsPlayful(false), 3000);
  };

  return (
    <div className="relative mt-2 group cursor-pointer" onClick={handlePlay}>
      <AnimatePresence>
        {isPlayful && (
          <motion.div 
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -50 }}
            exit={{ opacity: 0 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-amber-800 font-medium text-sm flex items-center gap-1"
          >
            <Heart className="text-amber-600" size={16} fill="currentColor" />
            *radiating confidence*
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        animate={{ 
          y: isPlayful ? [0, -8, 0] : [0, -4, 0],
          scale: isPlayful ? 1.15 : 1,
          rotate: isPlayful ? [0, 5, -5, 0] : 0
        }}
        transition={{ 
          duration: isPlayful ? 1.5 : 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-amber-600/60 group-hover:text-amber-600/80 transition-colors"
      >
        <Sun size={60} strokeWidth={1.5} fill="rgba(251, 191, 36, 0.2)" />
      </motion.div>
    </div>
  );
};

const GoldenAffirmations: React.FC = () => {
  const [affirmation, setAffirmation] = useState("");
  const affirmations = useMemo(() => [
    "You are radiant.",
    "You are magnetic.",
    "Your presence is a gift.",
    "You glow from within.",
    "You are confident and warm."
  ], []);

  useEffect(() => {
    const showAffirmation = () => {
      setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
      setTimeout(() => setAffirmation(""), 4000);
    };

    const interval = setInterval(showAffirmation, 15000);
    return () => clearInterval(interval);
  }, [affirmations]);

  return (
    <AnimatePresence>
      {affirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          className="absolute top-16 left-1/2 -translate-x-1/2 z-30 text-amber-800 font-light italic text-xl pointer-events-none text-center"
        >
          {affirmation}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const VoiceOfAdmiration: React.FC = () => {
  const [voice, setVoice] = useState("");
  const voiceLines = useMemo(() => [
    "Your energy lights up the room.",
    "You are absolutely glowing today.",
    "Your confidence is beautiful.",
    "You radiate such warmth.",
    "Your presence is magnetic."
  ], []);

  useEffect(() => {
    const speakAdmiration = () => {
      setVoice(voiceLines[Math.floor(Math.random() * voiceLines.length)]);
      setTimeout(() => setVoice(""), 5000);
    };

    const interval = setInterval(speakAdmiration, 25000);
    return () => clearInterval(interval);
  }, [voiceLines]);

  return (
    <AnimatePresence>
      {voice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-16 right-16 z-30 text-amber-800 font-light italic text-lg pointer-events-none max-w-xs text-right"
        >
          {voice}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SummerAudioAtmosphere: React.FC = () => {
  const { isSoundEnabled } = useSeasonStore();

  useEffect(() => {
    if (isSoundEnabled) {
      console.log("Summer sounds active: Warm breeze, soft birds, light chimes, golden hour tones");
    }
  }, [isSoundEnabled]);

  return null;
};