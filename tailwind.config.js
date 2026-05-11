/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.35' },
          '50%': { transform: 'translate(8px, -12px) scale(1.05)', opacity: '0.6' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(12px)' },
          '50%': { opacity: '0.75', filter: 'blur(18px)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
      fontFamily: {
        display: ['Cinzel', 'ui-serif', 'Georgia', 'serif'],
        body: ['Cormorant Garamond', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        wonder: {
          void: '#0a0618',
          night: '#120b24',
          royal: '#2a1a4a',
          amethyst: '#5c3d8f',
          blush: '#e8b4c8',
          rose: '#f5d0e0',
          gold: '#c9a227',
          'gold-soft': '#e8d48b',
          mist: 'rgba(245, 208, 224, 0.12)',
        },
      },
    },
  },
  plugins: [],
}
