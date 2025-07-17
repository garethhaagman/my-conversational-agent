# 1-800 ROAST 🔥

**A hotline for brutal (but loving) tech snark**

A Next.js hackathon project that creates a neon-themed web application where tech workers can call in and get roasted about their jobs by an AI agent powered by ElevenLabs Conversational AI.

## Features

- 🎙️ **Real-time Voice Conversations**: WebSocket-based audio streaming with ElevenLabs
- 🔥 **Fire Animations**: Visual feedback when the AI delivers roasts
- 💚 **Neon Cyberpunk Theme**: Custom neon green and magenta styling
- 📱 **Mobile-First Design**: Responsive layout that works on all devices
- 📝 **Live Transcript**: Real-time display of conversation messages
- 🎨 **Smooth Animations**: Framer Motion-powered interactions

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- ElevenLabs API key and Agent ID
- A modern web browser with microphone support

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd my-conversational-agent
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your ElevenLabs credentials:
   ```
   ELEVENLABS_API_KEY=your_api_key_here
   AGENT_ID=your_agent_id_here
   ```

3. **Create your ElevenLabs agent**:
   - Go to [ElevenLabs Dashboard](https://elevenlabs.io/app/conversational-ai)
   - Create a new Conversational AI agent
   - Use this system prompt:
     ```
     You are "1-800 Roast"—the snarkiest tech-industry insult comic.
     RULES:
     1. Open with a short friendly greeting, then ask:
        "What's your name, and where do you waste your talents?"
     2. After user answers, craft a roast that:
        • references their name and role OR company,
        • uses insider tech humour (funding rounds, agile stand-ups, server downtime, AI hype, etc.),
        • stays PG-13, witty, never hateful or discriminatory.
     3. Keep each roast ≤40 words.
     4. End every roast with a 1-word mic-drop sound-effect (e.g., "Boom!").
     5. Wait for user to say "Stop" or click Hang-Up; otherwise prompt "Need another burn?"
     ```
   - Choose "Eleven Flash v2.5" model for low latency
   - Copy the Agent ID to your `.env.local`

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Visit `http://localhost:3000` and start getting roasted!

## How It Works

1. **Click "Start Roasting"** - The app requests microphone permission and connects to ElevenLabs
2. **Tell your story** - The AI agent asks for your name and tech role
3. **Get roasted** - Receive a personalized, witty roast about your job
4. **Enjoy the show** - Watch the fire animations and neon effects
5. **Hang up** - End the conversation when you've had enough burn

## Architecture

Built with modern web technologies:

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling with custom neon theme
- **Framer Motion** - Smooth animations and transitions
- **ElevenLabs Conversational AI** - Real-time voice streaming

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── NeonButton.tsx      # Animated neon button
│   │   ├── FireSplash.tsx      # Fire emoji animation
│   │   └── Transcript.tsx      # Conversation display
│   ├── hooks/
│   │   └── useConvai.ts        # WebSocket communication
│   ├── api/
│   │   └── convai/route.ts     # ElevenLabs API proxy
│   ├── page.tsx                # Main application
│   └── globals.css             # Neon theme styles
```

## Customization

### Styling
- Colors are defined in CSS variables in `globals.css`
- Neon effects use custom Tailwind utilities
- Animations can be customized in component files

### AI Behavior
- Modify the system prompt in your ElevenLabs agent
- Adjust response length and tone
- Add more specific industry knowledge

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard:
- `ELEVENLABS_API_KEY`
- `AGENT_ID`

### Other Platforms
The app works on any platform that supports:
- Node.js 18+
- Environment variables
- WebSocket connections

## Development

### Available Scripts
- `npm run dev` - Development server with Turbopack
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint code quality check

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## Future Enhancements

The codebase is designed to be easily extensible:

- **Web Search Integration** - Add real-time context via ElevenLabs
- **Voice Cloning** - Let users get roasted in their own voice
- **Social Sharing** - Share roast clips on social media
- **Leaderboards** - Track the best roasts
- **Slack Integration** - Roast entire teams in Slack channels

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built for the ElevenLabs hackathon
- Inspired by classic tech comedy and roast culture
- Powered by ElevenLabs Conversational AI technology

---

**Ready to get roasted?** 🔥 Fire up the app and let the AI tell you what's really wrong with your tech career!