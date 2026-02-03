import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSeasonStore } from '../../store/useSeasonStore';
import { Layer } from '../parallax/Layer';
import { WeatherEffects } from './WeatherEffects';
import { BackgroundLayer } from './BackgroundLayer';
import { TimeGreeting } from '../ui/TimeGreeting';
import { CozyNote } from '../ui/CozyNote';
import { PresenceIndicator } from '../ui/PresenceIndicator';
import { RantBox } from '../features/RantBox';

import { WinterPhase } from './WinterPhase';
import { SpringPhase } from './SpringPhase';
import { SummerPhase } from './SummerPhase';

const seasonStyles = {
  winter: {
    mid: 'bg-black/30',
    fg: 'bg-white/10',
    accent: 'text-orange-100'
  },
  spring: {
    mid: 'bg-emerald-950/20',
    fg: 'bg-emerald-200/20',
    accent: 'text-emerald-100'
  },
  summer: {
    mid: 'bg-amber-950/20',
    fg: 'bg-orange-200/20',
    accent: 'text-amber-100'
  },
  autumn: {
    mid: 'bg-red-950/20',
    fg: 'bg-red-900/10',
    accent: 'text-orange-100'
  }
};

export const SeasonalScene: React.FC = () => {
  const { season } = useSeasonStore();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={season}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 overflow-hidden bg-black"
      >
        <BackgroundLayer />

        {season === 'winter' ? (
          <WinterPhase />
        ) : season === 'spring' ? (
          <SpringPhase />
        ) : season === 'summer' ? (
          <SummerPhase />
        ) : (
          <>
            {/* Layer 1: Midground */}
            <Layer depth={0.6}>
               <div className={`absolute inset-[10%] md:inset-[15%] rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl ${seasonStyles[season].mid} flex flex-col items-center justify-between py-12 px-8 pointer-events-auto`}>
                  <div className="flex flex-col items-center gap-6 w-full">
                    <PresenceIndicator />
                    <TimeGreeting />
                  </div>
                  
                  <div className="flex flex-col items-center gap-12 w-full">
                    <CozyNote />
                    <div className="flex items-center justify-center w-full">
                      {season === 'autumn' && <RantBox />}
                    </div>
                  </div>
               </div>
            </Layer>

            {/* Weather Effects */}
            <div className="absolute inset-0 pointer-events-none z-[100]">
               <WeatherEffects />
            </div>

            {/* Layer 2: Foreground - Blur Overlay */}
            <Layer depth={1.2}>
               <div className={`absolute inset-0 pointer-events-none ${seasonStyles[season].fg} backdrop-blur-[0.5px]`} />
            </Layer>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
