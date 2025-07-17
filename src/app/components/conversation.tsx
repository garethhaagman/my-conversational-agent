'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback } from 'react';
import { NeonButton } from './NeonButton';
import { FireSplash } from './FireSplash';
import { Transcript } from './Transcript';
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
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(57,255,20,0.03),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,55,255,0.03),transparent)] pointer-events-none" />
      
      {/* Fire splash effect */}
      <FireSplash 
        trigger={showFireSplash} 
        onComplete={() => setShowFireSplash(false)} 
      />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-6xl md:text-8xl text-[#39ff14] mb-4 animate-pulse-neon">
            1-800 ROAST
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-mono">
            A hotline for brutal (but loving) tech snark
          </p>
        </div>

        {/* Status indicator */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gray-900/50 border border-gray-700">
            <span className="text-2xl">{getStatusIcon()}</span>
            <span className="font-mono text-sm">{getStatusText()}</span>
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-500 rounded-lg text-center">
            <p className="text-red-400 font-mono">{error}</p>
          </div>
        )}

        {/* Control buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <NeonButton
            onClick={startConversation}
            disabled={conversation.status === 'connecting' || conversation.status === 'connected'}
            animate={conversation.status === 'disconnected' || conversation.status === 'idle'}
            className="text-xl px-12 py-6"
          >
            {conversation.status === 'connecting' ? 'Dialling...' : 'Start Roasting'}
          </NeonButton>
          
          <NeonButton
            variant="danger"
            onClick={stopConversation}
            disabled={conversation.status !== 'connected'}
            className="text-xl px-12 py-6"
          >
            Hang Up
          </NeonButton>
        </div>

        {/* Transcript */}
        <Transcript messages={transcript} />

        {/* Instructions */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto p-6 bg-gray-900/30 rounded-lg border border-gray-700">
            <h3 className="text-[#39ff14] font-mono text-lg mb-4">How it works:</h3>
            <ol className="text-left space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-[#39ff14] font-mono">1.</span>
                <span>Click "Start Roasting" and allow microphone access</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#39ff14] font-mono">2.</span>
                <span>Tell the agent your name and where you work in tech</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#39ff14] font-mono">3.</span>
                <span>Get brutally (but lovingly) roasted about your role</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#39ff14] font-mono">4.</span>
                <span>Hang up when you've had enough burn! 🔥</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}