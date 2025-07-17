import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // 8-bit light mode roasting color palette
        'bg-primary': "var(--bg-primary)",
        'bg-secondary': "var(--bg-secondary)",
        'text-primary': "var(--text-primary)",
        'fire-red': "var(--fire-red)",
        'flame-orange': "var(--flame-orange)",
        'golden-yellow': "var(--golden-yellow)",
        'burn-red': "var(--burn-red)",
        'ember-orange': "var(--ember-orange)",
        'disabled-gray': "var(--disabled-gray)",
        'border-color': "var(--border-color)",
        // Legacy aliases
        'electric-blue': "var(--fire-red)",
        'hot-magenta': "var(--flame-orange)",
        'cyan': "var(--ember-orange)",
        'lime-green': "var(--golden-yellow)",
      },
      spacing: {
        // 8-bit grid system
        '8bit': '8px',
        '16bit': '16px',
        '24bit': '24px',
        '32bit': '32px',
        '48bit': '48px',
        '64bit': '64px',
      },
      fontSize: {
        '8bit': ['14px', '1.4'],
        '8bit-lg': ['16px', '1.2'],
        '8bit-xl': ['20px', '1.2'],
      },
      fontFamily: {
        'display': ['Orbitron', 'monospace'],
        '8bit': ['Courier Prime', 'monospace'],
      },
      boxShadow: {
        '8bit': '2px 2px 0 var(--bg-secondary)',
        '8bit-lg': '4px 4px 0 var(--bg-secondary)',
        '8bit-inset': 'inset 1px 1px 0 var(--disabled-gray)',
        '8bit-glow-blue': '0 0 0 1px var(--electric-blue), 0 0 0 2px var(--text-primary)',
        '8bit-glow-magenta': '0 0 0 1px var(--hot-magenta), 0 0 0 2px var(--text-primary)',
        '8bit-glow-yellow': '0 0 0 1px var(--golden-yellow), 0 0 0 2px var(--text-primary)',
      },
      animation: {
        'pulse-8bit': 'pulse-8bit 2s ease-in-out infinite',
        'blink-8bit': 'blink-8bit 1s linear infinite',
        'shake-8bit': 'shake-8bit 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
