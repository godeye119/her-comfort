import React from 'react';
import { useSeasonStore } from '../../store/useSeasonStore';

export const TimeGreeting: React.FC = () => {
  const { season } = useSeasonStore();
  const hour = new Date().getHours();
  
  const getGreeting = () => {
    if (season === 'winter') {
      if (hour >= 6 && hour < 18) return "Rest easy, my love.";
      return "Sleep well, angel.";
    }
    
    if (season === 'spring') {
      if (hour >= 6 && hour < 12) return "Good morning, sunshine.";
      return "Ready to grow?";
    }

    if (season === 'summer') {
      return "You look amazing.";
    }

    if (season === 'autumn') {
      if (hour >= 18 || hour < 6) return "Welcome home.";
      return "Breathe deep.";
    }

    // Fallback
    if (hour >= 6 && hour < 12) return "Good Morning, my love.";
    if (hour >= 12 && hour < 18) return "Hope your day is going well.";
    return "Good Evening, beautiful.";
  };

  return (
    <div className="text-center py-4">
      <h1 className="font-serif italic text-3xl md:text-4xl text-white/90 drop-shadow-sm tracking-tight">
        {getGreeting()}
      </h1>
    </div>
  );
};
