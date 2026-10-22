/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe4ea',
          200: '#ffd0dc',
          300: '#fcaec2',
          400: '#f77e9f',
          500: '#ee4f7c',
          600: '#db2e62',
          700: '#b81e4b',
          800: '#991c42',
          900: '#811c3c',
        },
        rosebud: {
          50: '#fdf2f4',
          100: '#fbe6e9',
          200: '#f7d0d8',
          300: '#f0aab9',
          400: '#e57893',
          500: '#d74c72',
          600: '#bf345d',
          700: '#a0254b',
        },
        cream: {
          50: '#fffefb',
          100: '#fdfbf6',
          200: '#f9f6ed',
          300: '#f2ecda',
        },
        lavender: {
          50: '#faf7fd',
          100: '#f3ecfa',
          200: '#e9dbf6',
          300: '#d8bef0',
          400: '#be95e5',
          500: '#a36ed7',
          600: '#894fc0',
        },
        peach: {
          50: '#fff8f4',
          100: '#ffede2',
          200: '#fedbc8',
          300: '#fdbfa3',
          400: '#fa946f',
        },
        plum: {
          800: '#261324',
          850: '#1f0d1d',
          900: '#190a18',
          950: '#110510',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Nunito', 'Inter', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive'],
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft': '0 4px 24px -2px rgba(244, 114, 182, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 32px -4px rgba(244, 114, 182, 0.12), 0 4px 16px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px rgba(244, 114, 182, 0.25)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
