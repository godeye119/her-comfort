import React from 'react';
import { useSeasonStore, type Season } from '../../store/useSeasonStore';
import { Sun, CloudSnow, Leaf, Flower2 } from 'lucide-react';

export const SeasonSwitcher: React.FC = () => {
  const { season, setSeason } = useSeasonStore();

  const seasons: { id: Season; icon: React.ReactNode; label: string }[] = [
    { id: 'winter', icon: <CloudSnow size={20} />, label: 'Winter' },
    { id: 'spring', icon: <Flower2 size={20} />, label: 'Spring' },
    { id: 'summer', icon: <Sun size={20} />, label: 'Summer' },
    { id: 'autumn', icon: <Leaf size={20} />, label: 'Autumn' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 z-50">
      {seasons.map((s) => (
        <button
          key={s.id}
          onClick={() => setSeason(s.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
            season === s.id 
              ? 'bg-white/20 text-white shadow-lg' 
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          {s.icon}
          <span className="text-sm font-medium">{s.label}</span>
        </button>
      ))}
    </div>
  );
};
