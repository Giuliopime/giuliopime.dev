export default {
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--c-background) / <alpha-value>)",
        foreground: "hsl(var(--c-foreground) / <alpha-value>)",
        accent: "hsl(var(--c-accent) / <alpha-value>)",
        clickable: "hsl(var(--c-clickable) / <alpha-value>)",
      },
      fontFamily: {
        sohne: ['sohne-mono']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}