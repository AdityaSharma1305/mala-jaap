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
        devanagari: ['"Noto Serif Devanagari"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        saffron: {
          50: '#FDF7EE',
          100: '#FAECD6',
          200: '#F5D5A8',
          300: '#EBB876',
          400: '#DE9644',
          500: '#C85A17', // Primary Kesariya
          600: '#B54911',
          700: '#943810',
          800: '#782E13',
          900: '#632713',
        },
        gold: {
          100: '#FBF5E5',
          300: '#E6D3A3',
          400: '#D5BC78',
          500: '#C5A059', // Antique sacred gold
          600: '#A98441',
        },
        ivory: {
          50: '#FFFEFC',
          100: '#FBF8F2', // Warm handmade paper
          200: '#F4EFE6', // Muted card surface
          300: '#EDE4D5',
          400: '#DFD2BE',
        },
        night: {
          800: '#2A2420',
          850: '#211C18',
          900: '#1A1613',
          950: '#14110F', // Temple night charcoal
        },
        chandan: {
          100: '#F6F0E6',
          200: '#EFE6D8', // Sandalwood base
          300: '#E5DAC9',
          400: '#D6C7B2',
          800: '#4A3B2C',
          900: '#382C22',
        }
      },
      boxShadow: {
        'soft-touch': '0 4px 20px -2px rgba(44, 36, 30, 0.08), 0 2px 6px -1px rgba(44, 36, 30, 0.04)',
        'sacred-glow': '0 0 25px -5px rgba(200, 90, 23, 0.15)',
        'inner-bead': 'inset 0 1px 2px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
