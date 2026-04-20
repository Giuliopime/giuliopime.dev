export default {
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        coral: '#E220EC',
        sky: '#74FBFD',
        canary: '#FFFF55',
        alien: '#00FF00'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}