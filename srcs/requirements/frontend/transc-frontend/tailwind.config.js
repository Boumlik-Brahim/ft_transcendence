/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3E3B6A',
        'secondar': '#E8E8E8' ,
        'send': '#F0EFFF' ,
        'receive': '#FAFAFA' ,
        'leave': '#FF0059',
        'date': '#A9A9A9',
        channel:{
          100:'#EEF8F8',
          200:'#FFE9E9',
          300: '#53BBB5',
          400: '#FF2626',
          500 : ' #b9b7cf',
          600 : '#F6F6F6'
        },
      }
    },
    screens: {
      xs: "395px",
      md: "768px",
      lg: "1200px",
      xl: "2560px",
    },
    fontFamily: {
      'poppins' : ['"Poppins"', 'sans-serif'],
      'press': '"Press Start 2P"',
    },
  },
  plugins: [],
}
