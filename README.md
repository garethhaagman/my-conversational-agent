# 1-800 ROAST 🔥

**Get lovingly torched by an AI with startup-grade sarcasm.**

Built for the [AI Tinkerers London Hackathon](https://london.aitinkerers.org/p/open-court-x-ai-tinkerers-summer-mini-hackathon-with-tom-blomfield), this neon-drenched web app lets tech workers dial into an AI insult comic powered by ElevenLabs Conversational AI.


## What It Does

* 🎤 **Live AI Roasts** via real-time voice using WebSockets + ElevenLabs
* 🔥 **Fire Animations** for every insult
* 📱 **Mobile-First** with slick neon styling
* 📝 **Live Transcript** so you can relive the shame

<img width="256" height="256" alt="image" src="https://github.com/user-attachments/assets/6d2872cf-1f2c-4d9c-a67e-f95ecaae81f6" />

## Try It Locally

1. **Install**:

   ```bash
   git clone <repo>
   cd 1-800-roast
   npm install
   ```

2. **Set Up**:

   ```bash
   cp .env.local.example .env.local
   ```

   Add your ElevenLabs API key + Agent ID to `.env.local`

3. **Create Agent**:
   On [ElevenLabs](https://elevenlabs.io/app/conversational-ai), use this prompt:

   ```
   You are "1-800 Roast"—a snarky tech-industry insult comic...
   ```

4. **Run**:

   ```bash
   npm run dev
   ```

Open [localhost:3000](http://localhost:3000) and brace yourself.

## Stack

* **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**
* **ElevenLabs Conversational AI** for voice interaction

## Future Ideas

* Voice cloning for user-personalized roasts
* Roast-of-the-day leaderboard
* Slack integration to roast your whole team

---

**Built to roast. Coded with love.** 🔥
Fork it, extend it, and keep the burns coming.

Let me know if you'd like a one-liner tagline for the hackathon listing or a pitch blurb.
