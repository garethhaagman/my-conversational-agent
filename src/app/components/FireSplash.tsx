'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PixelSplashProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function FireSplash({ trigger, onComplete }: PixelSplashProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, type: 'tween', ease: 'linear' }}
        >
          <motion.div
            className="text-golden-yellow glow-8bit-yellow"
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, 2, 1.5, 2.5, 1.0],
            }}
            transition={{ 
              duration: 0.8,
              ease: 'linear',
              type: 'tween',
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          >
            <div className="text-8xl md:text-9xl pixelated">🔥</div>
          </motion.div>
          
          {/* 8-bit Background Flash */}
          <motion.div
            className="absolute inset-0 bg-golden-yellow/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.8, ease: 'linear', type: 'tween' }}
          />
          
          {/* 8-bit Pixel Effects */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8bit h-8bit bg-golden-yellow border-8bit"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0 
              }}
              animate={{
                x: [0, Math.cos(i * 90 * Math.PI / 180) * 80, Math.cos(i * 90 * Math.PI / 180) * 120],
                y: [0, Math.sin(i * 90 * Math.PI / 180) * 80, Math.sin(i * 90 * Math.PI / 180) * 120],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
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