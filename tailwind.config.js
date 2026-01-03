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
          black: '#000000',
          darker: '#0a0a0a',
          dark: '#111111',
          panel: '#0f0f0f',
          gray: '#1a1a1a',
          'gray-light': '#2a2a2a',
          'text-dim': '#666666',
          'text-muted': '#888888',
          neon: '#00ff41',
          'neon-dim': '#00cc33',
          'neon-bright': '#00ff66',
          red: '#ff0040',
          blue: '#0088ff',
          purple: '#c900ff',
          yellow: '#ffaa00',
        },
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}
