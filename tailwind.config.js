/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A0A0A',
          light: '#1A1A1A',
          dark: '#000000'
        },
        secondary: {
          DEFAULT: '#1A1A1A',
          light: '#2A2A2A',
          dark: '#0A0A0A'
        },
        accent: '#FF0000',
        surface: {
          50: '#E0E0E0',
          100: '#D0D0D0',
          200: '#B0B0B0',
          300: '#909090',
          400: '#707070',
          500: '#505050',
          600: '#404040',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#0A0A0A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.2' }],
        'title': ['42px', { lineHeight: '1.2' }],
        'heading': ['26px', { lineHeight: '1.4' }],
        'body': ['16px', { lineHeight: '1.6' }]
      },
      spacing: {
        'brutal': '32px',
        'structure': '4px'
      },
      boxShadow: {
        'brutal-high': '16px 16px 0px #000000',
        'brutal-medium': '8px 8px 0px #000000',
        'brutal-low': '4px 4px 0px #000000',
        'concrete': '8px 8px 0px #000000'
      },
      borderWidth: {
        'structure': '4px'
      },
      animation: {
        'crumble': 'crumble 300ms linear forwards'
      },
      keyframes: {
        'crumble': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(0.95) rotate(1deg)', opacity: '0.8' },
          '100%': { transform: 'scale(0.9) rotate(2deg)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}