'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback } from 'react';
import { NeonButton } from './NeonButton';
import { FireSplash } from './FireSplash';
import { useState, useEffect } from 'react';

export interface TranscriptMessage {
  id: string;
  speaker: 'user' | 'agent';
  text: string;
  timestamp: number;
}

export function Conversation() {
  const [showFireSplash, setShowFireSplash] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [emojiIndex, setEmojiIndex] = useState(0);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected');
      setError(null);
    },
    onDisconnect: () => {
      console.log('Disconnected');
    },
    onMessage: (message) => {
      console.log('Message:', message);
      // Add agent message to transcript
      if (message.message) {
        const newMessage: TranscriptMessage = {
          id: Date.now().toString(),
          speaker: 'agent',
          text: message.message,
          timestamp: Date.now(),
        };
        setTranscript(prev => [...prev, newMessage]);
      }
    },
    onError: (error) => {
      console.error('Error:', error);
      setError(error.message || 'Connection error');
    },
  });

  const startConversation = useCallback(async () => {
    try {
      // Clear previous transcript and errors
      setTranscript([]);
      setError(null);
      
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_AGENT_ID || 'agent_01k0cp9g9te63vg1mndcwkazvt',
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setError(error instanceof Error ? error.message : 'Failed to start conversation');
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  // Show emoji splash every 10 seconds during connected state
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (conversation.status === 'connected') {
      interval = setInterval(() => {
        setShowFireSplash(true);
        setEmojiIndex(prev => (prev + 1) % 2); // Alternate between 0 and 1
      }, 10000); // 10 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [conversation.status]);

  const getStatusIcon = () => {
    if (conversation.status === 'connecting') return '🍗';
    if (conversation.status === 'connected' && !conversation.isSpeaking) return '🎤';
    if (conversation.status === 'connected' && conversation.isSpeaking) return '🔊';
    return '🍗';
  };

  const getStatusText = () => {
    switch (conversation.status) {
      case 'connecting':
        return 'Dialling...';
      case 'connected':
        return conversation.isSpeaking ? 'Speaking...' : 'Listening...';
      case 'error':
        return 'Call Failed';
      default:
        return 'Ready to Roast';
    }
  };

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary relative overflow-hidden flex items-center justify-center">
      {/* 8-bit Background Pattern */}
      <div className="absolute inset-0 bg-checkerboard opacity-5" />
      <div className="absolute inset-0 bg-dots opacity-10" />
      
      {/* Emoji splash effect */}
      <FireSplash 
        trigger={showFireSplash} 
        emojiIndex={emojiIndex}
        onComplete={() => setShowFireSplash(false)} 
      />

      <div className="relative z-10 text-center w-full max-w-6xl mx-auto px-32bit py-32bit">
        {/* Header */}
        <div className="mb-24bit">
          <h1 className="font-display text-4xl md:text-8xl text-fire-red mb-24bit animate-pulse-8bit border-8bit-thick bg-bg-secondary p-24bit shadow-8bit-lg">
            1-800 ROAST
          </h1>
          <p className="text-2xl md:text-4xl text-text-primary font-8bit-bold">
            A HOTLINE FOR BRUTAL (BUT LOVING) TECH SNARK
          </p>
        </div>

        {/* Status indicator - 8-bit circle */}
        <div className="mb-24bit">
          <div className="mx-auto w-[60vw] h-[60vw] max-w-[60vh] max-h-[60vh] bg-fire-red border-8bit-thick shadow-8bit-lg flex flex-col items-center justify-center relative circle-8bit animate-pulse-8bit">
            <span className="text-8xl md:text-[10rem] mb-24bit pixelated">{getStatusIcon()}</span>
            <span className="font-8bit-bold text-2xl md:text-5xl uppercase text-center text-text-primary leading-tight">{getStatusText()}</span>
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-24bit p-24bit bg-burn-red border-8bit-thick text-center shadow-8bit animate-shake-8bit">
            <p className="text-text-primary font-8bit-bold uppercase text-xl md:text-3xl">{error}</p>
          </div>
        )}

        {/* Control buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-24bit">
          <NeonButton
            onClick={startConversation}
            disabled={conversation.status === 'connecting' || conversation.status === 'connected'}
            animate={conversation.status === 'disconnected' || conversation.status === 'idle'}
            className="text-2xl md:text-4xl px-32bit py-32bit"
          >
            {conversation.status === 'connecting' ? 'Dialling...' : 'Start Roasting'}
          </NeonButton>
          
          <NeonButton
            variant="danger"
            onClick={stopConversation}
            disabled={conversation.status !== 'connected'}
            className="text-2xl md:text-4xl px-32bit py-32bit"
          >
            Hang Up
          </NeonButton>
        </div>

      </div>
    </main>
  );
}