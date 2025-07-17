import { useCallback, useEffect, useRef, useState } from 'react';

export interface TranscriptMessage {
  id: string;
  speaker: 'user' | 'agent';
  text: string;
  timestamp: number;
}

export interface ConvaiState {
  status: 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';
  isListening: boolean;
  isSpeaking: boolean;
  transcript: TranscriptMessage[];
  error: string | null;
}

export function useConvai() {
  const [state, setState] = useState<ConvaiState>({
    status: 'idle',
    isListening: false,
    isSpeaking: false,
    transcript: [],
    error: null,
  });

  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const addTranscriptMessage = useCallback((speaker: 'user' | 'agent', text: string) => {
    const message: TranscriptMessage = {
      id: Date.now().toString(),
      speaker,
      text,
      timestamp: Date.now(),
    };
    setState(prev => ({
      ...prev,
      transcript: [...prev.transcript, message],
    }));
  }, []);

  const playAudio = useCallback(async (audioData: ArrayBuffer) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const audioBuffer = await audioContextRef.current.decodeAudioData(audioData);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      setState(prev => ({ ...prev, isSpeaking: true }));
      source.start();
      
      source.onended = () => {
        setState(prev => ({ ...prev, isSpeaking: false }));
      };
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }, []);

  const startSession = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, status: 'connecting', error: null }));

      // Get WebSocket URL from API
      const response = await fetch('/api/convai');
      if (!response.ok) {
        throw new Error('Failed to get WebSocket URL');
      }
      
      const { wsUrl, apiKey } = await response.json();

      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Create WebSocket connection
      const ws = new WebSocket(wsUrl);
      ws.binaryType = 'arraybuffer';
      wsRef.current = ws;

      ws.onopen = () => {
        setState(prev => ({ ...prev, status: 'connected', isListening: true }));
        
        // Send authentication message
        ws.send(JSON.stringify({
          type: 'auth',
          api_key: apiKey,
        }));
      };

      ws.onmessage = (event) => {
        try {
          if (event.data instanceof ArrayBuffer) {
            // Audio data
            playAudio(event.data);
          } else {
            // Text data
            const data = JSON.parse(event.data);
            if (data.type === 'message' && data.text) {
              addTranscriptMessage('agent', data.text);
            }
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setState(prev => ({ ...prev, status: 'error', error: 'Connection error' }));
      };

      ws.onclose = () => {
        setState(prev => ({ ...prev, status: 'disconnected', isListening: false }));
      };

      // Set up MediaRecorder for audio streaming
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
          ws.send(event.data);
        }
      };

      mediaRecorder.start(100); // Send chunks every 100ms

    } catch (error) {
      console.error('Error starting session:', error);
      setState(prev => ({ 
        ...prev, 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }));
    }
  }, [addTranscriptMessage, playAudio]);

  const endSession = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setState(prev => ({ 
      ...prev, 
      status: 'idle', 
      isListening: false, 
      isSpeaking: false 
    }));
  }, []);

  const sendUserMessage = useCallback((text: string) => {
    addTranscriptMessage('user', text);
  }, [addTranscriptMessage]);

  const clearTranscript = useCallback(() => {
    setState(prev => ({ ...prev, transcript: [] }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      endSession();
    };
  }, [endSession]);

  return {
    ...state,
    startSession,
    endSession,
    sendUserMessage,
    clearTranscript,
  };
}