import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const agentId = process.env.AGENT_ID;

    if (!apiKey || !agentId) {
      return NextResponse.json(
        { error: 'Missing ElevenLabs API key or Agent ID' },
        { status: 500 }
      );
    }

    // Create signed WebSocket URL for ElevenLabs Conversational AI
    const wsUrl = new URL('wss://api.elevenlabs.io/v1/convai/conversation');
    wsUrl.searchParams.set('agent_id', agentId);
    
    // Add project ID if provided
    if (process.env.PROJECT_ID) {
      wsUrl.searchParams.set('project_id', process.env.PROJECT_ID);
    }

    return NextResponse.json({
      wsUrl: wsUrl.toString(),
      apiKey: apiKey,
    });
  } catch (error) {
    console.error('Error creating WebSocket URL:', error);
    return NextResponse.json(
      { error: 'Failed to create WebSocket connection' },
      { status: 500 }
    );
  }
}