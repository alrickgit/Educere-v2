const colors = require('tailwindcss/colors');
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        dark400:'#100f10',
        dark300:'#1b1b1b',
        dark200:'#242424',
        dark100:'#363636',
        white300:'rgba(255, 255, 255,0.96)',
        white200:'rgba(255, 255, 255,0.67)',
        white100:'rgba(255, 255, 255,0.45)',
        grey100:'#f2f5f5',
        primary:'#37b9f1',
        accent:'#8739f9',
        textDark300:'#565360',
        textDark200:'#908e9b',
        textDark100:'#e1dfe9',
      },
      fontFamily:{
        nunito:['Nunito'],
        raleway:['Raleway'],
        poppins:['Poppins'],
      }
    },
  },
  plugins: [],
}
