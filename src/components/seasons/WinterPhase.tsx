import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSeasonStore } from "../../store/useSeasonStore";
import { LoveLetter } from "./LoveLetter";
import { WeatherEffects } from "./WeatherEffects";

import {
  Pencil,
  Heart,
  CloudSnow,
  ThermometerSnowflake,
  Flame,
  X,
  Wind,
  Fingerprint,
  Mail,
  Cookie,
} from "lucide-react";

export const WinterPhase: React.FC = () => {
  const { winterState, setWinterState } = useSeasonStore();
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [isHandHolding, setIsHandHolding] = useState(false);
  const [showCravings, setShowCravings] = useState(false);

  const cravings = [
    {
      id: "chocolate",
      label: "🍫 Chocolate",
      message: "I'm really craving some chocolate right now... 🍫",
    },
    {
      id: "icecream",
      label: "🍦 Ice Cream",
      message: "I really want some ice cream right now... 🍦",
    },
    {
      id: "chillichicken",
      label: "🍗 Chilli Chicken",
      message: "Could we get some chilli chicken? 🍗",
    },
    // { id: 'comfort', label: '🍜 Comfort Food', message: "I need some comfort food... 🍜" },
  ];

  const sendWhatsApp = (msg: string) => {
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setShowCravings(false);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-6 md:p-12">
      {/* Snow Effect */}
      <WeatherEffects />

      {/* 2. Frosted Glass UI Layer & 3. Warm Overlay Layer */}
      <motion.div
        initial={false}
        animate={{
          opacity: winterState === "comfort" ? 0.4 : 0.1,
          backgroundColor: "rgba(124, 45, 18, 0.05)",
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
        <motion.div
          animate={{
            backgroundColor: isHandHolding
              ? "rgba(251, 146, 60, 0.15)"
              : "rgba(255, 255, 255, 0.1)",
          }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-100/40 mb-6"
        >
          {isHandHolding ? (
            <Heart size={12} className="text-orange-300" />
          ) : (
            <ThermometerSnowflake size={12} />
          )}
          <motion.div
            animate={
              isHandHolding
                ? {
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.6, 1],
                  }
                : {}
            }
            transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"
          />
          Status: {isHandHolding ? "Pulse Connected" : "I am here with you"}
        </motion.div>

        {/* Content Area */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-1">
            <CloudSnow className="text-orange-100/50" size={32} />
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-light text-orange-100/90 tracking-tight italic text-center md:text-left leading-relaxed">
              Rest in my arms Princess ❤️
            </h1>
          </div>
          <GentleAffirmations />

          <div className="flex flex-col items-center gap-8 md:gap-12">
            <VirtualHandHold onHandHoldChange={setIsHandHolding} />

            {/* Controls - Responsive Layout */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full max-w-4xl px-4 md:px-0 justify-center">
              {/* Group A: Action Pills */}
              <div className="flex flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowBreathingModal(true)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 rounded-full bg-white/15 backdrop-blur-md border border-white/10 text-orange-100/90 hover:text-orange-100 transition-all hover:bg-white/20 text-sm font-light tracking-widest uppercase"
                >
                  <Wind size={16} />
                  Breathe
                </button>
                <button
                  onClick={() =>
                    setWinterState(
                      winterState === "expression" ? "idle" : "expression",
                    )
                  }
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 rounded-full bg-white/15 backdrop-blur-md border border-white/10 text-orange-100/90 hover:text-orange-100 transition-all hover:bg-white/20 text-sm font-light tracking-widest uppercase"
                >
                  <Pencil size={16} />
                  Let it Out
                </button>
              </div>

              {/* Group B: Comfort Icons */}
              <div className="flex flex-row items-center justify-center gap-4 md:gap-6">
                <button
                  onClick={() => setShowLetter(true)}
                  className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-orange-100/90 hover:text-orange-100 transition-all hover:bg-white/25 shadow-lg"
                >
                  <Mail size={20} />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowCravings(!showCravings)}
                    className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-orange-100/90 hover:text-orange-100 transition-all hover:bg-white/25 shadow-lg"
                  >
                    <Cookie size={20} />
                  </button>
                  <AnimatePresence>
                    {showCravings && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 min-w-[200px] shadow-2xl"
                      >
                        <p className="text-xs text-orange-100/70 text-center font-light italic mb-3 px-2 leading-relaxed">
                          I know you're craving, tell me princess what you want?
                        </p>
                        {cravings.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => sendWhatsApp(item.message)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl text-orange-100/80 text-xs font-light tracking-wider transition-all"
                          >
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 7. Emotional Presence Layer (Voice Lines) */}
      <CompanionVoiceLines />

      {/* Modals/Overlays for specific states */}
      <AnimatePresence>
        {winterState === "expression" && <UnloadThoughts />}
        {showBreathingModal && (
          <BreathingModal onClose={() => setShowBreathingModal(false)} />
        )}
        {showLetter && <LoveLetter onClose={() => setShowLetter(false)} />}
      </AnimatePresence>
    </div>
  );
};

const BreathingGlow: React.FC = () => {
  const { winterState } = useSeasonStore();

  const intensity = winterState === "comfort" ? 0.3 : 0.15;
  const duration = winterState === "expression" ? 10 : 7;

  return (
    <motion.div
      animate={{
        opacity: [intensity * 0.5, intensity, intensity * 0.5],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        background: `radial-gradient(circle, ${winterState === "comfort" ? "rgba(251, 146, 60, 0.15)" : "rgba(251, 146, 60, 0.08)"} 0%, rgba(251, 146, 60, 0) 70%)`,
      }}
    />
  );
};

const BreathingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">(
    "inhale",
  );
  const [count, setCount] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const phaseDurations = {
      inhale: 4,
      hold: 4,
      exhale: 6,
      rest: 2,
    };

    const nextPhaseMap = {
      inhale: "hold" as const,
      hold: "exhale" as const,
      exhale: "rest" as const,
      rest: "inhale" as const,
    };

    let timer: number;
    if (isActive && count > 0) {
      timer = window.setTimeout(() => setCount(count - 1), 1000);
    } else if (isActive && count === 0) {
      const nextPhase = nextPhaseMap[phase];
      timer = window.setTimeout(() => {
        setPhase(nextPhase);
        setCount(phaseDurations[nextPhase]);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [count, isActive, phase]);

  const handleToggle = () => {
    if (!isActive) {
      setPhase("inhale");
      setCount(4);
    }
    setIsActive(!isActive);
  };

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "Breathe in... expand...";
      case "hold":
        return "Hold... feel the warmth...";
      case "exhale":
        return "Breathe out... release...";
      case "rest":
        return "Rest... you're safe...";
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case "inhale":
        return 1.3;
      case "hold":
        return 1.3;
      case "exhale":
        return 0.7;
      case "rest":
        return 0.7;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-slate-950/40 backdrop-blur-sm border border-white/10 rounded-3xl p-12 flex flex-col items-center gap-8 relative shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-orange-100/40 hover:text-orange-100/80 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-3xl font-serif text-orange-100/90 italic">
            Breathe Gently
          </h2>
          <p className="text-sm text-orange-100/50 font-light tracking-wide">
            Release tension, my Princess❤️
          </p>
        </div>

        {/* Breathing Circle */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Outer ring - subtle pulse */}
          <motion.div
            animate={
              isActive
                ? {
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border-2 border-orange-400/30"
          />

          {/* Main breathing circle */}
          <motion.div
            animate={
              isActive
                ? {
                    scale: getCircleScale(),
                  }
                : { scale: 1 }
            }
            transition={{
              duration:
                phase === "inhale"
                  ? 4
                  : phase === "exhale"
                    ? 6
                    : phase === "hold"
                      ? 4
                      : 2,
              ease: "easeInOut",
            }}
            className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-orange-400/30 to-orange-600/20 border-2 border-orange-400/40 flex items-center justify-center shadow-[0_0_60px_rgba(251,146,60,0.3)]"
          >
            {/* Inner glow */}
            <motion.div
              animate={
                isActive
                  ? {
                      opacity: [0.3, 0.6, 0.3],
                    }
                  : { opacity: 0.3 }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-4 rounded-full bg-orange-300/20"
            />

            {/* Icon */}
            <motion.div
              animate={isActive ? { rotate: 360 } : {}}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              <Wind size={48} className="text-orange-200/80" />
            </motion.div>
          </motion.div>
        </div>

        {/* Phase text */}
        <div className="flex flex-col items-center gap-2 min-h-[60px]">
          {isActive ? (
            <>
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg text-orange-100/80 font-light italic"
              >
                {getPhaseText()}
              </motion.p>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-3xl font-light text-orange-200"
              >
                {count}
              </motion.span>
            </>
          ) : (
            <p className="text-sm text-orange-100/50 font-light">
              Click Start to begin
            </p>
          )}
        </div>

        {/* Start/Stop button */}
        <button
          onClick={handleToggle}
          className="px-12 py-3 rounded-full bg-orange-400/20 border border-orange-400/40 text-orange-100 hover:bg-orange-400/30 transition-all font-light tracking-widest uppercase text-sm flex items-center gap-2"
        >
          {isActive ? (
            <>
              <div className="w-2 h-2 bg-orange-200 rounded-sm" />
              Stop
            </>
          ) : (
            <>
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-orange-200 border-b-[6px] border-b-transparent" />
              Start
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
};

const GentleAffirmations: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isInitial, setIsInitial] = useState(true);

  const affirmations = [
    "Calm down, my love. I understand your pain, and I am holding you right now. Just breathe.",
    "You don't have to be strong right now.",
    "I've got you. Let's just rest.",
    "Sending you all my warmth.",
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
  { x: -10, y: -45, duration: 3.8 },
];

const VirtualHandHold: React.FC<{
  onHandHoldChange: (holding: boolean) => void;
}> = ({ onHandHoldChange }) => {
  const { setWinterState } = useSeasonStore();
  const [isHolding, setIsHolding] = useState(false);
  const heartbeatIntervalRef = React.useRef<number | null>(null);

  const handleStart = () => {
    setIsHolding(true);
    setWinterState("comfort");
    onHandHoldChange(true);

    // Start haptic heartbeat pattern
    if ("vibrate" in navigator) {
      const heartbeat = () => {
        // Heartbeat pattern: bum-BUM... pause... bum-BUM...
        navigator.vibrate([50, 200, 50, 1000]);
      };
      heartbeat(); // Immediate first heartbeat
      heartbeatIntervalRef.current = window.setInterval(heartbeat, 1300);
    }
  };

  const handleEnd = () => {
    setIsHolding(false);
    setWinterState("idle");
    onHandHoldChange(false);

    // Stop haptic heartbeat
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
    if ("vibrate" in navigator) {
      navigator.vibrate(0); // Stop any ongoing vibration
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, []);

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
                opacity: [0.3, 0.6, 0.3],
              }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-orange-500/30 blur-3xl pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
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
            : "0 0 20px rgba(251, 146, 60, 0.1)",
        }}
        transition={
          isHolding
            ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
        className="w-56 h-56 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group transition-all cursor-pointer"
      >
        {/* Background "Presence" Glow */}
        <motion.div
          animate={{
            opacity: isHolding ? 0.8 : 0.1,
            scale: isHolding ? 1.3 : 1,
            backgroundColor: isHolding
              ? "rgba(251, 146, 60, 0.2)"
              : "rgba(251, 146, 60, 0.05)",
          }}
          className="absolute inset-0 bg-gradient-to-b from-orange-400/40 to-orange-900/60 transition-colors duration-1000"
        />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isHolding ? "holding" : "idle"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: isHolding ? 1 : 0.5,
                filter: isHolding
                  ? [
                      "drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))",
                      "drop-shadow(0 0 40px rgba(251, 191, 36, 1))",
                      "drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))",
                    ]
                  : "drop-shadow(0 0 0px rgba(251, 191, 36, 0))",
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                scale: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.2 },
                filter: {
                  duration: 0.85,
                  repeat: isHolding ? Infinity : 0,
                  ease: "easeInOut",
                },
              }}
            >
              {isHolding ? (
                <Heart size={56} className="text-amber-200 fill-amber-200/50" />
              ) : (
                <Fingerprint
                  size={48}
                  className="text-orange-100 group-hover:text-orange-300 transition-colors"
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col items-center">
            <span className="text-orange-100/80 group-hover:text-orange-100 transition-colors font-light tracking-[0.2em] uppercase text-xs">
              {isHolding ? "I've got you" : "Place thumb here"}
            </span>
            {isHolding && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 0.85,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-[10px] text-amber-200/70 tracking-widest mt-2 uppercase font-medium"
              >
                ♥ Pulse Connected ♥
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
                  opacity: [0, 0.5, 0],
                }}
                transition={{ duration: p.duration, repeat: Infinity }}
                className="absolute left-1/2 top-1/2 w-1 h-1 bg-orange-200 rounded-full"
              />
            ))}
          </div>
        )}
      </motion.button>

      {/* Ripple Rings */}
      {isHolding ? (
        <>
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-amber-400/60 pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.4,
            }}
            className="absolute inset-0 rounded-full border-2 border-amber-400/60 pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.8,
            }}
            className="absolute inset-0 rounded-full border-2 border-amber-400/60 pointer-events-none"
          />
        </>
      ) : (
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
  const [showMessage, setShowMessage] = useState(false);

  const handleRelease = () => {
    setIsDissolving(true);
    setTimeout(() => {
      setShowMessage(true);
    }, 3000);
    setTimeout(() => {
      setText("");
      setIsDissolving(false);
      setShowMessage(false);
      setWinterState("idle");
    }, 6000);
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
        {!isDissolving && !showMessage && (
          <>
            <div className="flex items-center gap-2 text-orange-100/60 mb-2">
              <Pencil size={20} />
              <span className="font-serif italic text-lg">
                Let it all out Misti...
              </span>
            </div>
            <motion.textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-64 bg-white/5 border border-white/10 rounded-3xl p-8 text-orange-100 focus:outline-none resize-none text-lg font-light placeholder:text-orange-100/20 shadow-2xl"
              placeholder="Let out what's bothering you... type freely."
            />
          </>
        )}

        {isDissolving && !showMessage && (
          <motion.div
            initial={{ opacity: 0.7 }}
            animate={{
              opacity: 0,
              filter: "blur(20px)",
              y: -100,
              scale: 0.8,
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="w-full h-64 bg-white/5 border border-white/10 rounded-3xl p-8 text-orange-100 text-lg font-light"
          >
            {text}
          </motion.div>
        )}

        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <Heart
              size={48}
              className="text-orange-300/80 fill-orange-300/30"
            />
            <p className="text-2xl md:text-3xl font-serif italic text-orange-100/90 text-center max-w-md">
              You let your thoughts out. Now relax, princess.
            </p>
          </motion.div>
        )}

        {!isDissolving && !showMessage && text.length > 0 && (
          <button
            onClick={handleRelease}
            className="flex items-center gap-2 px-8 py-3 rounded-full bg-orange-400/20 border border-orange-400/40 text-orange-100 hover:bg-orange-400/30 transition-all font-light tracking-widest uppercase text-sm"
          >
            <Flame size={16} className="text-orange-200" />
            Release into the Glow
          </button>
        )}

        {!isDissolving && !showMessage && (
          <button
            onClick={() => setWinterState("idle")}
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
    distance: 100 + i * 10,
    duration: 2 + (i % 3),
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
            delay: p.id * 0.1,
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
  "Take all the time you need.",
];

const CompanionVoiceLines: React.FC = () => {
  const [line, setLine] = useState<string | null>(null);
  const { winterState } = useSeasonStore();

  useEffect(() => {
    if (winterState === "idle") {
      const timer = setTimeout(() => setLine(null), 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setLine(
        COMPANION_LINES[Math.floor(Math.random() * COMPANION_LINES.length)],
      );
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
