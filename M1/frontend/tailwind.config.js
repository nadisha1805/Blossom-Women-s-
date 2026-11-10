/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        blush: {
          DEFAULT: '#EBC4CF',
          light: '#F7E7EC',
        },
        plum: {
          DEFAULT: '#70405B',
          dark: '#442B3B',
        },
        ivory: '#FAF5EF',
        lavender: '#DCD2EE',
        sage: {
          DEFAULT: '#B9CBB7',
          bg: '#EEF3EC',
        },
        // Supporting Colors
        rose: {
          muted: '#C9859D',
        },
        text: {
          primary: '#442B3B',
          secondary: '#756A73',
        },
        border: {
          soft: '#E9DFE3',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1' }],
        'section': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.2' }],
        'card-heading': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.3' }],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      boxShadow: {
        soft: '0 2px 20px rgba(112, 64, 91, 0.06)',
        card: '0 4px 24px rgba(112, 64, 91, 0.08)',
        elevated: '0 8px 40px rgba(112, 64, 91, 0.12)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
