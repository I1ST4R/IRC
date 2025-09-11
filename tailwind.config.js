export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        europeext: ['EuropeExt', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
}
