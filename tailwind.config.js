/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f6f4',
          100: '#e9e9e5',
          200: '#d3d2cc',
          300: '#b3b1a8',
          400: '#8d8b80',
          500: '#6f6d62',
          600: '#575548',
          700: '#43423a',
          800: '#2b2a25',
          900: '#1a1a16',
          950: '#0d0d0b',
        },
        accent: {
          50: '#fff8eb',
          100: '#ffedb8',
          200: '#ffdd7a',
          300: '#ffc93c',
          400: '#ffb50f',
          500: '#f59600',
          600: '#d97400',
          700: '#b55206',
          800: '#92400c',
          900: '#79380f',
          950: '#461d02',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9' }],
        '11xl': ['14rem', { lineHeight: '0.85' }],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
