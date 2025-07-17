# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**1-800 ROAST** is a Next.js 15 application that provides a hotline for brutal (but loving) tech snark. This hackathon project creates a web-based conversational AI experience using ElevenLabs Conversational AI for real-time voice conversations where users get roasted about their tech jobs.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server with Turbopack (faster builds)
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

### Development Server
The development server runs on `http://localhost:3000` by default.

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom neon theme and animations
- **Voice AI**: Custom ElevenLabs Conversational AI WebSocket integration
- **Animation**: Framer Motion for neon effects and fire splash animations
- **State Management**: Custom React hooks with local state
- **TypeScript**: Full TypeScript support with strict configuration

### Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── NeonButton.tsx      # Animated neon button component
│   │   ├── FireSplash.tsx      # Fire emoji animation for roasts
│   │   └── Transcript.tsx      # Real-time conversation display
│   ├── hooks/
│   │   └── useConvai.ts        # WebSocket communication hook
│   ├── api/
│   │   └── convai/route.ts     # ElevenLabs API authentication
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main 1-800 ROAST application
│   └── globals.css             # Neon theme and custom styles
```

### Key Components

#### useConvai Hook (`src/app/hooks/useConvai.ts`)
- Manages WebSocket connection to ElevenLabs Conversational AI
- Handles audio streaming, transcript management, and session state
- Integrates with MediaRecorder for real-time audio capture
- **Important**: Requires valid `ELEVENLABS_API_KEY` and `AGENT_ID` environment variables

#### NeonButton Component (`src/app/components/NeonButton.tsx`)
- Animated button with neon glow effects and pulse animation
- Supports primary (green) and danger (magenta) variants
- Built with Framer Motion for smooth interactions

#### FireSplash Component (`src/app/components/FireSplash.tsx`)
- Full-screen fire emoji animation triggered when agent speaks
- Uses Framer Motion for scale, rotation, and particle effects
- Provides visual feedback for roast delivery

#### Transcript Component (`src/app/components/Transcript.tsx`)
- Real-time display of conversation messages
- Auto-scrolling with custom neon-themed scrollbar
- Distinguishes between user and agent messages with color coding

### Configuration Files

#### TypeScript Configuration
- Uses `@/*` path mapping for imports
- Configured for Next.js with App Router
- Strict TypeScript settings enabled

#### Tailwind Configuration
- Custom color system using CSS variables
- Supports dark mode via `prefers-color-scheme`
- Configured for all relevant file extensions

#### ESLint Configuration
- Uses Next.js recommended rules
- Includes TypeScript support
- Configured with flat config format

## Development Notes

### ElevenLabs Integration
- Create an ElevenLabs agent with the system prompt for tech roasting
- Set up environment variables: `ELEVENLABS_API_KEY` and `AGENT_ID`
- The application uses WebSocket for real-time bi-directional communication
- Microphone permissions are required for voice input
- Agent should be configured with "Flash v2.5" model for low latency

### Environment Setup
1. Copy `.env.local.example` to `.env.local`
2. Add your ElevenLabs API key and Agent ID
3. Create an ElevenLabs agent with the roasting system prompt
4. Run `npm install` to install dependencies

### Styling Approach
- Custom neon theme with CSS variables (#39ff14 primary, #ff37ff accent)
- Monoton font for the main title, Inter for body text
- Framer Motion for smooth animations and transitions
- Full black background with neon accents for cyberpunk aesthetic
- Responsive design with mobile-first approach

### Key Dependencies
- `@elevenlabs/react` - ElevenLabs React SDK (used as reference)
- `framer-motion` - Animation library for neon effects
- `zustand` - Lightweight state management (ready for future use)
- `next` - React framework with App Router
- `tailwindcss` - Utility-first CSS framework
- `typescript` - Type safety and development experience

### Future Extensibility
The codebase is designed to be easily extensible with:
- Web search integration via ElevenLabs context API
- Additional animation components
- Enhanced transcript features
- Voice cloning capabilities
- Social sharing functionality