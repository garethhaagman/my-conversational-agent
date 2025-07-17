'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PixelButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'danger';
  disabled?: boolean;
  className?: string;
  animate?: boolean;
}

export function NeonButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = '',
  animate = false
}: PixelButtonProps) {
  const baseClasses = 'px-16bit py-8bit font-8bit text-8bit-lg font-bold uppercase tracking-wider border-2 border-border-color relative overflow-hidden bg-electric-blue text-bg-secondary cursor-pointer select-none';
  
  const variantClasses = {
    primary: 'bg-fire-red hover:bg-flame-orange shadow-8bit border-border-color',
    danger: 'bg-flame-orange hover:bg-fire-red shadow-8bit border-border-color',
  };

  const disabledClasses = 'bg-disabled-gray cursor-not-allowed hover:bg-disabled-gray opacity-50';

  const buttonClasses = `${baseClasses} ${disabled ? disabledClasses : variantClasses[variant]} ${className}`;

  const pulseAnimation = {
    boxShadow: animate ? [
      '0 0 0 1px var(--fire-red), 0 0 0 2px var(--border-color)',
      '0 0 0 2px var(--fire-red), 0 0 0 3px var(--border-color)',
      '0 0 0 1px var(--fire-red), 0 0 0 2px var(--border-color)',
    ] : undefined,
  };

  return (
    <motion.button
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={!disabled ? { 
        x: 1, 
        y: 1, 
        boxShadow: '1px 1px 0 var(--bg-secondary)'
      } : {}}
      whileTap={!disabled ? { 
        x: 2, 
        y: 2, 
        boxShadow: '0 0 0 var(--bg-secondary)'
      } : {}}
      animate={animate && !disabled ? pulseAnimation : {}}
      transition={{
        duration: animate ? 2 : 0.1,
        repeat: animate ? Infinity : 0,
        ease: 'linear',
        type: 'tween',
      }}
    >
      {disabled && (
        <div className="absolute inset-0 bg-disabled-gray opacity-50" 
             style={{
               backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, var(--bg-secondary) 2px, var(--bg-secondary) 4px)'
             }} />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}