/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          // Base void colors
          void: '#050505',
          black: '#0a0a0a',
          darker: '#0d0d0d',
          dark: '#111111',
          panel: '#0f0f0f',
          gray: '#1a1a1a',
          'gray-light': '#2a2a2a',
          'text-dim': '#666666',
          'text-muted': '#888888',
          
          // Neon gradients (toxic green with cyan undertones)
          neon: '#00ff41',
          'neon-dim': '#00cc33',
          'neon-bright': '#00ff66',
          'neon-cyan': '#00ffff',
          
          // Accent colors
          red: '#ff0040',
          'red-glow': '#ff2060',
          blue: '#0088ff',
          'blue-bright': '#00b4ff',
          cyan: '#00d9ff',
          purple: '#c900ff',
          'purple-deep': '#8800cc',
          violet: '#6600ff',
          yellow: '#ffaa00',
          gold: '#ffd700',
        },
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)',
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
        'radial-spotlight': 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 50%)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      backdropBlur: {
        'glass': '20px',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 65, 0.3)',
        'neon-strong': '0 0 15px rgba(0, 255, 65, 0.7), 0 0 30px rgba(0, 255, 65, 0.5)',
        'cyan': '0 0 10px rgba(0, 217, 255, 0.5), 0 0 20px rgba(0, 217, 255, 0.3)',
        'purple': '0 0 10px rgba(201, 0, 255, 0.5), 0 0 20px rgba(201, 0, 255, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 20s ease-in-out infinite',
        'scanline': 'scanline 5s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
