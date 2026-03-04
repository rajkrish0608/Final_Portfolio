import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#0d0d1a',
        'arc-blue': '#00d4ff',
        'arc-blue-glow': '#00aaff44',
        'repulsor-gold': '#ffd700',
        'suit-red': '#c0392b',
        'neural-green': '#00ff88',
        'text-primary': '#e8f4f8',
        'text-secondary': '#8bb8cc',
        'text-accent': '#00d4ff',
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        rajdhani: ['var(--font-rajdhani)', 'sans-serif'],
        mono: ['var(--font-share-tech-mono)', 'monospace'],
      },
      boxShadow: {
        'arc-glow': '0 0 20px #00d4ff44, 0 0 40px #00d4ff22',
        'gold-glow': '0 0 20px #ffd70044, 0 0 40px #ffd70022',
        'red-glow': '0 0 20px #c0392b44, 0 0 40px #c0392b22',
        'green-glow': '0 0 20px #00ff8844, 0 0 40px #00ff8822',
      },
      backgroundImage: {
        'hex-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpolygon fill='none' stroke='%2300d4ff08' stroke-width='1' points='30,2 58,17 58,47 30,62 2,47 2,17'/%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-arc': 'pulseArc 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseArc: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px #00d4ff44, 0 0 40px #00d4ff22' },
          '50%': { opacity: '0.6', boxShadow: '0 0 40px #00d4ffaa, 0 0 80px #00d4ff44' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
