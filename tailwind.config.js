/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Palette ufficiale
        brand: {
          1: '#0540F2',
          2: '#0554F2',
          3: '#056CF2',
        },
        warm: '#402516',
        'off-white': '#F2F2F2',

        // Semantici costruiti sulla palette
        'bg-page':    '#F2F2F2',
        'bg-card':    '#FFFFFF',
        'bg-subtle':  '#F7F6F5',
        'border-sm':  'rgba(64,37,22,0.07)',
        'border-md':  'rgba(64,37,22,0.12)',
        'border-lg':  'rgba(64,37,22,0.2)',
        'text-1':     '#402516',
        'text-2':     'rgba(64,37,22,0.5)',
        'text-3':     'rgba(64,37,22,0.28)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        'fade-in':  'fadeIn 0.22s ease-out',
        'slide-up': 'slideUp 0.22s ease-out',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(5px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
