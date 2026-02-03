/* eslint-disable react-hooks/purity */
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeasonStore } from '../../store/useSeasonStore';

const Snow = () => {
  const particles = useMemo(() => Array.from({ length: 50 }).map(() => ({
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 10,
    size: Math.random() * 4 + 2,
    drift: (Math.random() * 100 - 50)
  })), []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ y: '-20vh', opacity: 0 }}
          animate={{ 
            y: '120vh',
            x: p.drift,
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "linear",
            delay: p.delay
          }}
          style={{ left: p.left, width: p.size, height: p.size }}
          className="absolute bg-white rounded-full blur-[0.5px]"
        />
      ))}
    </div>
  );
};

const Pollen = () => {
  const particles = useMemo(() => Array.from({ length: 30 }).map(() => ({
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 10,
    size: Math.random() * 3 + 1,
    drift: (Math.random() * 200 - 100)
  })), []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ 
            y: '-10vh',
            x: p.drift,
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: p.delay
          }}
          style={{ left: p.left, width: p.size, height: p.size }}
          className="absolute bg-yellow-200/60 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
};

const Sun = () => {
  const sparkles = useMemo(() => Array.from({ length: 25 }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
    size: Math.random() * 4 + 2
  })), []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[50%] -right-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(253,224,71,0.2)_0%,transparent_60%)]"
      />
      {sparkles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1.2, 0] }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay 
          }}
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          className="absolute bg-yellow-100 rounded-full shadow-[0_0_10px_white] blur-[0.5px]"
        />
      ))}
    </div>
  );
};

const Rain = () => {
  const particles = useMemo(() => Array.from({ length: 70 }).map(() => ({
    left: `${Math.random() * 130 - 15}%`,
    duration: 0.6 + Math.random() * 0.4,
    delay: Math.random() * 2,
    opacity: 0.2 + Math.random() * 0.3
  })), []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ y: '-20vh', opacity: 0 }}
          animate={{ 
            y: '120vh',
            opacity: [0, p.opacity, p.opacity, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "linear",
            delay: p.delay
          }}
          style={{ left: p.left }}
          className="absolute w-[1px] h-[30px] bg-blue-300/40 rotate-[15deg]"
        />
      ))}
    </div>
  );
};

export const WeatherEffects: React.FC = () => {
  const { season } = useSeasonStore();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={season}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full pointer-events-none z-[100] overflow-hidden"
      >
        {season === 'winter' && <Snow />}
        {season === 'spring' && <Pollen />}
        {season === 'summer' && <Sun />}
        {season === 'autumn' && <Rain />}
      </motion.div>
    </AnimatePresence>
  );
};
