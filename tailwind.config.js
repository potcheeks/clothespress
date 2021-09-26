module.exports = {
  purge: [
    "./pages/**/*.js", 
    "./components/**/*.js", 
    "./plugins/**/*.js",
    "./static/**/*.js",
    "./store/**/*.js",
  ],
  theme: {
    extend: {
      outline: {
        blue: '2px solid #0000ff',
      }
    }
  },
  variants: {},
  plugins: []
};