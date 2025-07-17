'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface WaveformProps {
  isActive: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function Waveform({ isActive, size = 'large' }: WaveformProps) {
  const [bars] = useState(() => Array.from({ length: 8 }, (_, i) => i));
  
  const sizeClasses = {
    small: 'w-2 h-4',
    medium: 'w-4 h-8', 
    large: 'w-8 h-16'
  };
  
  const containerSizeClasses = {
    small: 'gap-1 h-8',
    medium: 'gap-2 h-16',
    large: 'gap-4 h-32'
  };
  
  const getBarHeight = (index: number) => {
    const heights = {
      small: ['h-2', 'h-4', 'h-6', 'h-8', 'h-6', 'h-4', 'h-2', 'h-3'],
      medium: ['h-4', 'h-8', 'h-12', 'h-16', 'h-12', 'h-8', 'h-4', 'h-6'],
      large: ['h-8', 'h-16', 'h-24', 'h-32', 'h-24', 'h-16', 'h-8', 'h-12']
    };
    return heights[size][index];
  };
  
  return (
    <div className={`flex items-end justify-center ${containerSizeClasses[size]}`}>
      {bars.map((_, index) => (
        <motion.div
          key={index}
          className={`bg-fire-red border-8bit ${sizeClasses[size]} ${getBarHeight(index)}`}
          initial={{ scaleY: 0.3 }}
          animate={isActive ? {
            scaleY: [0.3, 1, 0.5, 0.8, 0.4, 0.9, 0.6, 0.7, 0.3],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: index * 0.1,
            }
          } : { scaleY: 0.3 }}
          style={{ originY: 1 }}
        />
      ))}
    </div>
  );
}