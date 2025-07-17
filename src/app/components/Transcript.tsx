'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { TranscriptMessage } from './conversation';

interface TranscriptProps {
  messages: TranscriptMessage[];
  className?: string;
}

export function Transcript({ messages, className = '' }: TranscriptProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="border-8bit-thick bg-bg-secondary shadow-8bit-lg p-16bit">
        <div className="flex items-center justify-between mb-16bit">
          <h3 className="text-fire-red font-8bit-bold text-8bit-lg uppercase">
            LIVE TRANSCRIPT
          </h3>
          <div className="text-fire-red text-8bit font-8bit-bold">
            {messages.length} MSG
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="h-64 overflow-y-auto scrollbar-8bit bg-bg-primary border-8bit p-8bit"
        >
          <AnimatePresence initial={false}>
            {messages.length === 0 ? (
              <div className="text-center text-disabled-gray py-16bit">
                <div className="text-8bit-xl mb-8bit">🎙️</div>
                <p className="text-8bit font-8bit uppercase">CONVERSATION WILL APPEAR HERE...</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, type: 'tween', ease: 'linear' }}
                  className={`mb-8bit p-8bit border-8bit shadow-8bit ${
                    message.speaker === 'user' 
                      ? 'bg-fire-red/20 border-l-8bit border-fire-red' 
                      : 'bg-flame-orange/20 border-l-8bit border-flame-orange'
                  }`}
                >
                  <div className="flex items-start gap-8bit">
                    <div className="flex-shrink-0">
                      {message.speaker === 'user' ? (
                        <div className="w-16bit h-16bit bg-fire-red border-8bit flex items-center justify-center text-bg-primary text-8bit font-8bit-bold">
                          U
                        </div>
                      ) : (
                        <div className="w-16bit h-16bit bg-flame-orange border-8bit flex items-center justify-center text-bg-primary text-8bit font-8bit-bold">
                          A
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-8bit mb-8bit">
                        <span className={`text-8bit font-8bit-bold uppercase ${
                          message.speaker === 'user' ? 'text-fire-red' : 'text-flame-orange'
                        }`}>
                          {message.speaker === 'user' ? 'YOU' : 'AGENT'}
                        </span>
                        <span className="text-8bit text-disabled-gray font-8bit">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      
                      <motion.p 
                        className="text-text-primary text-8bit font-8bit leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, type: 'tween' }}
                      >
                        {message.text}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}