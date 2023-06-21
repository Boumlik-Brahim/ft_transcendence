/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens: {
      'xxs':  {'min': '280px', 'max': '300px'},
      'xs':  {'min': '360px', 'max': '410px'},
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1660px',
      // 'xl':{'min': '1023px', 'max': '1280px'}
    },
    fontFamily: {
      'poppins' : ['"Poppins"', 'sans-serif'],
      'ice' : ['"Iceberg"'],
      'press': '"Press Start 2P"',
      'nova-flat': '"Nova Flat"'
    },
  extend: {
      colors:{
            primary:{
              900 : '#3E3B6A',
              800 : '#504C90',
              700 : '#7e79b9',
              600 : '#6b6598',
              500 : '#444444',
              400: '#DDE6ED',
              300 : '#fcfcfc',
              200: '#4679A6',
              100:'#F5F5F5',
          },
          light:{
              900 :'#A9A9A9', 
              800 :'#F0EFFF',
              700 :'#FAFAFA',
          }, 
          secondary:{
            900:'#FFC107',
            800:'#FF6C6C',
            700:'#5BB59B',
            600:'#FF0059',
            500:'#F5A623',
            400:'#FFCB5B',
            300:'#53BBB5',
            200:'#4E4E4E',
            100: '#6B6A5D',

          },
          tertiary:{},
      

    },
   
  },
},
  plugins: [
    // require('tailwindcss'),
    // require('autoprefixer'),
  ],
}

