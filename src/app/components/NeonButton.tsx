'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NeonButtonProps {
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
}: NeonButtonProps) {
  const baseClasses = 'px-8 py-4 rounded-2xl font-mono text-lg font-bold transition-all duration-300 border-2 relative overflow-hidden';
  
  const variantClasses = {
    primary: 'border-[#39ff14] text-[#39ff14] hover:text-black hover:bg-[#39ff14] shadow-[0_0_8px_#39ff14,0_0_24px_#39ff14] hover:shadow-[0_0_16px_#39ff14,0_0_32px_#39ff14]',
    danger: 'border-[#ff37ff] text-[#ff37ff] hover:text-black hover:bg-[#ff37ff] shadow-[0_0_8px_#ff37ff,0_0_24px_#ff37ff] hover:shadow-[0_0_16px_#ff37ff,0_0_32px_#ff37ff]',
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed hover:text-current hover:bg-transparent hover:shadow-current';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${disabled ? disabledClasses : ''} ${className}`;

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    boxShadow: animate ? [
      `0 0 8px ${variant === 'primary' ? '#39ff14' : '#ff37ff'}, 0 0 24px ${variant === 'primary' ? '#39ff14' : '#ff37ff'}`,
      `0 0 16px ${variant === 'primary' ? '#39ff14' : '#ff37ff'}, 0 0 32px ${variant === 'primary' ? '#39ff14' : '#ff37ff'}`,
      `0 0 8px ${variant === 'primary' ? '#39ff14' : '#ff37ff'}, 0 0 24px ${variant === 'primary' ? '#39ff14' : '#ff37ff'}`,
    ] : undefined,
  };

  return (
    <motion.button
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      animate={animate && !disabled ? pulseAnimation : {}}
      transition={{
        duration: 2,
        repeat: animate ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 1.5,
          repeat: animate ? Infinity : 0,
          repeatDelay: 2,
          ease: 'easeInOut',
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}