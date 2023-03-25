const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,scss}"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        blue: "#0080FF",
        gray: "#BBBBBB",
        'light-gray': "#CCCCCC",
        'light-gray-2': "#EEEEEE",
        'dark-gray': "#AAAAAA",
        black: "#121212",
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      fontSize: {
        xs: ['10px', '12px'],
        base: ['15px', '18px'],
      }
    },
  },
  plugins: [],
};
