import React from "react";
import { motion } from "framer-motion";

export const BackgroundLayer: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/backgrounds/winter.png"
            alt="Winter sanctuary landscape"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          {/* Subtle overlay for content readability */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </div>
    </div>
  );
};
