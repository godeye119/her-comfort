import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundLayer } from './BackgroundLayer';
import { WinterPhase } from './WinterPhase';

export const SeasonalScene: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 overflow-hidden bg-black"
    >
      <BackgroundLayer />
      <WinterPhase />
    </motion.div>
  );
};
