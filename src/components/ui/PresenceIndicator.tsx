import React from 'react';
import { Link2 } from 'lucide-react';

export const PresenceIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </div>
      <Link2 size={12} className="text-white/40" />
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
        Status: Holding your hand
      </span>
    </div>
  );
};
