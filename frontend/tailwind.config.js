/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'vogue': ['Playfair Display', 'serif'],
        'vogue-alt': ['Cormorant Garamond', 'serif'],
      },
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8fd18f',
          400: '#4CAF50',
          500: '#45a049',
          600: '#3d8b40',
          700: '#357a38',
          800: '#2d6930',
          900: '#245829',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(135deg, #245829 0%, #357a38 25%, #45a049 50%, #4CAF50 75%, #8fd18f 100%)',
        'gradient-green-light': 'linear-gradient(135deg, #f0f9f0 0%, #dcf2dc 50%, #bce5bc 100%)',
      },
      fontSize: {
        'display-1': ['4rem', { lineHeight: '1.1', fontWeight: '600' }],
        'display-2': ['3.5rem', { lineHeight: '1.1', fontWeight: '600' }],
        'display-3': ['3rem', { lineHeight: '1.2', fontWeight: '600' }],
        'display-4': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'display-5': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}