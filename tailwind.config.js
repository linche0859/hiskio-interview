module.exports = {
  important: true,
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      lineClamp: ['responsive', 'hover']
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}
