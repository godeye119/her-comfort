/* eslint-disable react-refresh/only-export-components */
import React, { type ReactNode, useContext } from 'react';
import { useMotionValue, type MotionValue } from 'framer-motion';

interface SceneContextProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const SceneContext = React.createContext<SceneContextProps | null>(null);

export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) throw new Error("useScene must be used within SceneWrapper");
  return context;
};

export const SceneWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if ('clientX' in e) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    } else if ('touches' in e && e.touches.length > 0) {
      mouseX.set(e.touches[0].clientX);
      mouseY.set(e.touches[0].clientY);
    }
  };

  return (
    <SceneContext.Provider value={{ mouseX, mouseY }}>
      <div 
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        className="relative w-screen h-screen overflow-hidden bg-black"
      >
        {children}
      </div>
    </SceneContext.Provider>
  );
};
