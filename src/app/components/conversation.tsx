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
        setShowFireSplash(true);
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

  const getStatusIcon = () => {
    if (conversation.status === 'connecting') return '📞';
    if (conversation.status === 'connected' && !conversation.isSpeaking) return '🎤';
    if (conversation.status === 'connected' && conversation.isSpeaking) return '🔊';
    return '📱';
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
      
      {/* Fire splash effect */}
      <FireSplash 
        trigger={showFireSplash} 
        onComplete={() => setShowFireSplash(false)} 
      />

      <div className="relative z-10 text-center max-w-2xl mx-auto px-16bit">
        {/* Header */}
        <div className="mb-32bit">
          <h1 className="font-display text-8bit-xl md:text-6xl text-fire-red mb-16bit animate-pulse-8bit border-8bit-thick bg-bg-secondary p-16bit shadow-8bit-lg">
            1-800 ROAST
          </h1>
          <p className="text-8bit-lg text-text-primary font-8bit-bold">
            A HOTLINE FOR BRUTAL (BUT LOVING) TECH SNARK
          </p>
        </div>

        {/* Status indicator - 8-bit circle */}
        <div className="mb-24bit">
          <div className="mx-auto w-48 h-48 bg-bg-secondary border-8bit-thick shadow-8bit-lg flex flex-col items-center justify-center relative circle-8bit">
            <span className="text-6xl mb-8bit">{getStatusIcon()}</span>
            <span className="font-8bit-bold text-8bit-lg uppercase text-center">{getStatusText()}</span>
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-16bit p-16bit bg-burn-red border-8bit-thick text-center shadow-8bit animate-shake-8bit">
            <p className="text-text-primary font-8bit-bold uppercase">{error}</p>
          </div>
        )}

        {/* Control buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-16bit mb-32bit">
          <NeonButton
            onClick={startConversation}
            disabled={conversation.status === 'connecting' || conversation.status === 'connected'}
            animate={conversation.status === 'disconnected' || conversation.status === 'idle'}
            className="text-8bit-xl px-24bit py-24bit"
          >
            {conversation.status === 'connecting' ? 'Dialling...' : 'Start Roasting'}
          </NeonButton>
          
          <NeonButton
            variant="danger"
            onClick={stopConversation}
            disabled={conversation.status !== 'connected'}
            className="text-8bit-xl px-24bit py-24bit"
          >
            Hang Up
          </NeonButton>
        </div>

      </div>
    </main>
  );
}