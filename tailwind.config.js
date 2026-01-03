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
          black: '#0a0a0a',
          darker: '#121212',
          dark: '#1a1a1a',
          gray: '#2a2a2a',
          neon: '#00ff41',
          'neon-dim': '#00cc33',
          'neon-bright': '#00ff66',
          red: '#ff0040',
          blue: '#00d9ff',
          purple: '#c900ff',
        },
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41',
        'neon-sm': '0 0 5px #00ff41, 0 0 10px #00ff41',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 3s linear infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 10px #00ff41' },
          '50%': { opacity: '.8', boxShadow: '0 0 20px #00ff41, 0 0 30px #00ff41' },
        },
        'flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
        'glow': {
          'from': { textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41' },
          'to': { textShadow: '0 0 20px #00ff41, 0 0 30px #00ff41, 0 0 40px #00ff41, 0 0 50px #00ff41' },
        },
      },
    },
  },
  plugins: [],
}
