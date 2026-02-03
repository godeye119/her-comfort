import React, { type ReactNode } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useScene } from './SceneWrapper';

interface LayerProps {
  depth: number;
  children: ReactNode;
  className?: string;
}

export const Layer: React.FC<LayerProps> = ({ depth, children, className = "" }) => {
  const { mouseX, mouseY } = useScene();

  // Varying speeds based on depth
  const moveX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [depth * 30, depth * -30]);
  const moveY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [depth * 30, depth * -30]);

  const springX = useSpring(moveX, { stiffness: 50, damping: 20 });
  const springY = useSpring(moveY, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}
    >
      {/* Container allows children to opt-in to pointer events if needed */}
      <div className="w-full h-full relative">
        {children}
      </div>
    </motion.div>
  );
};
