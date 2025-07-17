'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FireSplashProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function FireSplash({ trigger, onComplete }: FireSplashProps) {
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
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="text-[#ff7000] drop-shadow-[0_0_20px_#ff7000]"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.5, 1.2, 1.8, 1.0],
              rotate: [0, 10, -5, 15, 0],
              filter: [
                'drop-shadow(0 0 20px #ff7000)',
                'drop-shadow(0 0 40px #ff7000)',
                'drop-shadow(0 0 60px #ff7000)',
                'drop-shadow(0 0 40px #ff7000)',
                'drop-shadow(0 0 20px #ff7000)',
              ]
            }}
            transition={{ 
              duration: 0.8,
              ease: 'easeOut',
              times: [0, 0.2, 0.4, 0.6, 1]
            }}
          >
            <div className="text-8xl md:text-9xl">🔥</div>
          </motion.div>
          
          {/* Background flash */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-red-500/10 to-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.5, 2, 3] }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          
          {/* Particle effects */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-400 rounded-full"
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0,
                opacity: 0 
              }}
              animate={{
                x: Math.cos(i * 60 * Math.PI / 180) * 100,
                y: Math.sin(i * 60 * Math.PI / 180) * 100,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: 'easeOut'
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}