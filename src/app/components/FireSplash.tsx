'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PixelSplashProps {
  trigger: boolean;
  emojiIndex: number;
  onComplete?: () => void;
}

export function FireSplash({ trigger, emojiIndex, onComplete }: PixelSplashProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  const emojis = ['💀', '😂']; // Skull and cry-laugh emojis
  const currentEmoji = emojis[emojiIndex];

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50 bg-bg-primary/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, type: 'tween', ease: 'linear' }}
        >
          <motion.div
            className="text-golden-yellow glow-8bit-yellow"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 4, 3, 5, 4],
              rotate: [0, 10, -5, 15, 0]
            }}
            transition={{ 
              duration: 1.2,
              ease: 'linear',
              type: 'tween',
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          >
            <div className="text-[20rem] md:text-[25rem] pixelated leading-none">{currentEmoji}</div>
          </motion.div>
          
          {/* 8-bit Background Flash */}
          <motion.div
            className="absolute inset-0 bg-golden-yellow/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.2, ease: 'linear', type: 'tween' }}
          />
          
          {/* 8-bit Pixel Effects */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16bit h-16bit bg-fire-red border-8bit"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0 
              }}
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 150, Math.cos(i * 60 * Math.PI / 180) * 200],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 150, Math.sin(i * 60 * Math.PI / 180) * 200],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.0,
                delay: 0.2,
                ease: 'linear',
                type: 'tween'
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}