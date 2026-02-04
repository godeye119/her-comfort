/* eslint-disable react-hooks/purity */
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

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

export const WeatherEffects: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full pointer-events-none z-[100] overflow-hidden"
    >
      <Snow />
    </motion.div>
  );
};
