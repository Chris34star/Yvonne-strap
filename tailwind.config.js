/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
      colors: {
        ink: {
          900: '#0a0a0f',
          800: '#0f0f18',
          700: '#15151f',
          600: '#1a1a28',
          500: '#22222e',
          400: '#2e2e3a',
        },
        blush: {
          50: '#fff0f5',
          100: '#ffe0eb',
          200: '#ffc1d6',
          300: '#ff9ab8',
          400: '#ff6b95',
          500: '#f5427a',
          600: '#e02864',
          700: '#b81a4f',
        },
        petal: {
          300: '#f0a8e8',
          400: '#e078d8',
          500: '#c94dc4',
        },
      },
      animation: {
        'float-up': 'floatUp 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        floatUp: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
