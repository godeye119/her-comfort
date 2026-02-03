import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeasonStore, type Season } from '../../store/useSeasonStore';
import { Layer } from '../parallax/Layer';

const seasonalAssets: Record<Season, string> = {
  winter: '/backgrounds/winter.png',
  spring: '/backgrounds/spring.png',
  summer: '/backgrounds/summer.png',
  autumn: '/backgrounds/autumn.png'
};

export const BackgroundLayer: React.FC = () => {
  const { season } = useSeasonStore();

  return (
    <Layer depth={0.2} className="z-0">
      <div className="absolute inset-0 w-full h-full bg-slate-900 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={season}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.img
              src={seasonalAssets[season]}
              alt={`${season} landscape`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: season === 'winter' ? 1 : 1 }}
              transition={season === 'winter' ? { duration: 0 } : { duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            />
            {/* Subtle overlay for content readability */}
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>
        
        {/* Seasonal watermark */}
        {season !== 'winter' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <h2 className="text-[12rem] font-black uppercase tracking-[0.2em] text-white">
              {season}
            </h2>
          </div>
        )}
      </div>
    </Layer>
  );
};
