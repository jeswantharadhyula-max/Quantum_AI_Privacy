/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        quantum: {
          bg: '#060913',
          card: '#0c1222',
          cardHover: '#121b33',
          border: 'rgba(56, 189, 248, 0.15)',
          borderGlow: 'rgba(56, 189, 248, 0.4)',
          cyan: '#00F2FE',
          electric: '#38bdf8',
          blue: '#3b82f6',
          indigo: '#6366f1',
          purple: '#a855f7',
          violet: '#8b5cf6',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.35)',
        'glow-purple': '0 0 25px -5px rgba(168, 85, 247, 0.35)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'quantum-orbit': 'orbit 8s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 15px -3px rgba(0, 242, 254, 0.2)' },
          '100%': { boxShadow: '0 0 30px 2px rgba(168, 85, 247, 0.4)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
