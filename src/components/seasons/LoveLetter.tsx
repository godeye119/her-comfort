import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';

interface LoveLetterProps {
  onClose: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotateX: -15, y: 30 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, rotateX: 15, y: -30 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 200,
          opacity: { duration: 0.4 }
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] aspect-[8.5/11] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      >
        {/* Decorative wax seal - outside container to prevent clipping */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", damping: 15 }}
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-orange-500/80 border-4 border-orange-600/50 flex items-center justify-center shadow-lg z-30"
        >
          <Heart size={20} className="text-orange-100 fill-orange-100" />
        </motion.div>

        <div className="relative w-full h-full overflow-hidden rounded-sm">
        {/* Background Page Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/backgrounds/page.jpg"
            alt="Letter page"
            className="w-full h-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-white/20" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16 h-full flex flex-col justify-center">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-orange-900/60 hover:text-orange-900 transition-colors z-20"
          >
            <X size={20} />
          </button>

          {/* Letter content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-6 md:gap-8 text-center"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-orange-900/70 font-light">For You</p>
              <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-orange-600/50 to-transparent mx-auto" />
            </div>

            <div className="flex flex-col gap-4 md:gap-6 text-orange-950">
              <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed" style={{ fontFamily: "'Great Vibes', cursive" }}>
                My dearest,
              </p>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed" style={{ fontFamily: "'Dancing Script', cursive" }}>
                In this moment, I want you to know that you are cherished beyond measure. 
                Your presence in this world matters more than you realize.
              </p>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed" style={{ fontFamily: "'Dancing Script', cursive" }}>
                When the weight feels heavy, remember: you don't have to carry it alone. 
                I am here, holding space for you, believing in your strength even when you cannot.
              </p>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed" style={{ fontFamily: "'Dancing Script', cursive" }}>
                You are worthy of rest. You are worthy of peace. You are worthy of love.
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed mt-2 md:mt-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Always here for you,
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-6 md:w-8 h-px bg-orange-600/50" />
                <Heart size={16} className="text-orange-600/70 fill-orange-600/40" />
                <div className="w-6 md:w-8 h-px bg-orange-600/50" />
              </div>
            </div>
          </motion.div>

          {/* Decorative corner flourishes */}
          <div className="absolute top-6 md:top-8 left-6 md:left-8 w-6 md:w-8 h-6 md:h-8 border-t-2 border-l-2 border-orange-600/30 rounded-tl-lg" />
          <div className="absolute top-6 md:top-8 right-6 md:right-8 w-6 md:w-8 h-6 md:h-8 border-t-2 border-r-2 border-orange-600/30 rounded-tr-lg" />
          <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 w-6 md:w-8 h-6 md:h-8 border-b-2 border-l-2 border-orange-600/30 rounded-bl-lg" />
          <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 w-6 md:w-8 h-6 md:h-8 border-b-2 border-r-2 border-orange-600/30 rounded-br-lg" />
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
