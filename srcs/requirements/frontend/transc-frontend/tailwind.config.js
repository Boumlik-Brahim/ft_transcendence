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
        'date': '#A9A9A9'
      }
    },
    screens: {
      xs: "395px",
      md: "768px",
      lg: "1440px",
      xl: "2560px",
    },
  },
  plugins: [],
}
