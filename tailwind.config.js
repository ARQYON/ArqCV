/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        arq: {
          50:  '#f0f4ff',
          100: '#dde6ff',
          200: '#c3d1ff',
          300: '#9ab2ff',
          400: '#6b8bff',
          500: '#4361ff',
          600: '#2a3ef5',
          700: '#2130e1',
          800: '#1f29b6',
          900: '#1e278f',
        },
      },
    },
  },
  plugins: [],
};
