/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    fontFamily: {
      'poppins' : ['"Poppins"', 'sans-serif'],
      'press' : ['"Iceberg"'],
      'nova-flat': '"Nova Flat"'
    },
  extend: {
      colors:{
            primary:{
              900 : '#3E3B6A',
              800 : '#504C90',
              700 : '#7e79b9',
              600 : '#6b6598',
              500 : '#6b65987e',
              400: '#DDE6ED',
              300 : '#dcdcdc',
              200: '#4679A6'
          }, 
          secondary:{
            900:'#FFC107',
            800:'#FF6C6C',
            700:'#5BB59B',
            600:'#FF0059',
            500:'#F5A623'
          },
          tertiary:{},

    },
   
  },
},
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
}

