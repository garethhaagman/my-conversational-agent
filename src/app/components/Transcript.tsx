'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { TranscriptMessage } from '../hooks/useConvai';

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
      <div className="border-2 border-[#39ff14] rounded-2xl bg-black/50 backdrop-blur-sm shadow-[0_0_8px_#39ff14,0_0_24px_#39ff14] p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#39ff14] font-mono text-lg font-bold">
            Live Transcript
          </h3>
          <div className="text-[#39ff14] text-sm opacity-70">
            {messages.length} messages
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#39ff14] scrollbar-track-transparent"
        >
          <AnimatePresence initial={false}>
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-2">🎙️</div>
                <p className="text-sm">Conversation will appear here...</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`mb-3 p-3 rounded-lg ${
                    message.speaker === 'user' 
                      ? 'bg-[#39ff14]/10 border-l-4 border-[#39ff14]' 
                      : 'bg-[#ff37ff]/10 border-l-4 border-[#ff37ff]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {message.speaker === 'user' ? (
                        <div className="w-6 h-6 bg-[#39ff14] rounded-full flex items-center justify-center text-black text-xs font-bold">
                          U
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-[#ff37ff] rounded-full flex items-center justify-center text-black text-xs font-bold">
                          A
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-mono font-bold ${
                          message.speaker === 'user' ? 'text-[#39ff14]' : 'text-[#ff37ff]'
                        }`}>
                          {message.speaker === 'user' ? 'You' : 'Agent'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      
                      <motion.p 
                        className="text-white text-sm leading-relaxed font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
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