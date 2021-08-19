module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundImage: (theme) => ({
        'fa-img': "url('https://images.unsplash.com/photo-1551381912-4e2e29c7fd17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3450&q=80')"
      })
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
