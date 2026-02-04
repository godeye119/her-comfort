import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundLayer: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <motion.img
            src="/backgrounds/winter.png"
            alt="Winter sanctuary landscape"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Subtle overlay for content readability */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </div>
    </div>
  );
};
