import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeasonStore, type Season } from '../../store/useSeasonStore';

const SEASONAL_MESSAGES: Record<Season, string[]> = {
  winter: [
    "It’s cold outside, but I’m right here with you.",
    "Rest your body, I know it hurts. I'm with you.",
    "You are my favorite source of warmth.",
    "No matter the weather, you're safe here with me.",
    "Sending you a massive, warm hug right now."
  ],
  spring: [
    "You are blooming beautifully.",
    "One step at a time.",
    "Let your dreams blossom.",
    "Embrace the new energy.",
    "Everything is beginning again."
  ],
  summer: [
    "You are glowing today.",
    "Main Character Energy.",
    "Nothing can stop you.",
    "Absolutely radiant.",
    "You are pure power."
  ],
  autumn: [
    "It's okay to slow down.",
    "Protect your peace.",
    "Rainy days are for us.",
    "Breathe deep and let go.",
    "Warm tea and quiet moments."
  ]
};

export const CozyNote: React.FC = () => {
  const { season } = useSeasonStore();
  const [index, setIndex] = useState(0);
  const [prevSeason, setPrevSeason] = useState(season);

  if (season !== prevSeason) {
    setPrevSeason(season);
    setIndex(0);
  }

  const messages = SEASONAL_MESSAGES[season];

  const nextNote = useCallback(() => {
    setIndex((prev) => (prev + 1) % messages.length);
  }, [messages.length]);

  useEffect(() => {
    const timer = setInterval(nextNote, 7000);
    return () => clearInterval(timer);
  }, [nextNote]);

  return (
    <div 
      className="text-center px-6 py-2 cursor-pointer select-none min-h-[80px] flex items-center justify-center"
      onClick={nextNote}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={`${season}-${index}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="text-orange-100 font-cursive text-2xl md:text-3xl drop-shadow-md"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
