import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, Fingerprint, Cookie, 
  Utensils, Coffee 
} from 'lucide-react';

export const ComfortDock: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'cravings' | null>(null);

  const cravings = [
    { id: 'chocolate', label: 'Chocolate', icon: <Cookie size={18} strokeWidth={2.5} />, message: "I'm really craving some chocolate right now... 🍫" },
    { id: 'sushi', label: 'Sushi', icon: <Utensils size={18} strokeWidth={2.5} />, message: "Could we maybe get sushi? 🍣" },
    { id: 'comfort', label: 'Comfort Food', icon: <Coffee size={18} strokeWidth={2.5} />, message: "I need some comfort food... 🍜" },
  ];

  const toggleMenu = (menu: 'cravings') => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const sendWhatsApp = (msg: string) => {
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300]">
      <div className="flex items-end gap-2 px-3 py-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl">
        
        {/* Music Toggle */}
        <DockIcon 
          label={isPlaying ? "Mute" : "Play"} 
          active={isPlaying}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <Music 
            strokeWidth={2.5} 
            fill={isPlaying ? "currentColor" : "none"} 
            fillOpacity={0.2}
            className={isPlaying ? 'text-blue-400' : 'text-white/70'} 
          />
        </DockIcon>

        {/* Sync Pulse */}
        <div className="relative">
          <motion.div
            onMouseDown={() => setIsSyncing(true)}
            onMouseUp={() => setIsSyncing(false)}
            onMouseLeave={() => setIsSyncing(false)}
            onTouchStart={(e) => { e.preventDefault(); setIsSyncing(true); }}
            onTouchEnd={() => setIsSyncing(false)}
          >
            <DockIcon label="Hold My Hand" active={isSyncing}>
              <Fingerprint strokeWidth={2.5} className={isSyncing ? 'text-red-500' : 'text-white/70'} />
            </DockIcon>
          </motion.div>
          <AnimatePresence>
            {isSyncing && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.1, 0.4] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="absolute inset-0 bg-red-500 rounded-full blur-2xl z-[-1]"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Cravings */}
        <div className="relative">
          <DockIcon 
            label="Cravings" 
            active={activeMenu === 'cravings'}
            onClick={() => toggleMenu('cravings')}
          >
            <Cookie strokeWidth={2.5} fill={activeMenu === 'cravings' ? "currentColor" : "none"} fillOpacity={0.2} className={activeMenu === 'cravings' ? 'text-yellow-400' : 'text-white/70'} />
          </DockIcon>

          <AnimatePresence>
            {activeMenu === 'cravings' && (
              <MenuContainer>
                {cravings.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => sendWhatsApp(item.message)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl text-white/80 text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </MenuContainer>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const MenuContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: -20, scale: 0.9 }}
    animate={{ opacity: 1, y: -12, scale: 1 }}
    exit={{ opacity: 0, y: 0, scale: 0.9 }}
    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 min-w-[160px] shadow-2xl overflow-hidden"
  >
    {children}
  </motion.div>
);

const DockIcon: React.FC<{ children: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ children, label, active, onClick }) => {
  return (
    <motion.button
      whileHover={{ y: -10, scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`relative group p-4 rounded-[1.5rem] transition-all duration-300 flex items-center justify-center shadow-lg ${
        active ? 'bg-white/20 border-white/30 shadow-white/10' : 'bg-white/5 border-white/10 hover:bg-white/10'
      } border`}
    >
      {children}
      <span className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 text-[10px] font-bold tracking-widest text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase border border-white/10">
        {label}
      </span>
    </motion.button>
  );
};
