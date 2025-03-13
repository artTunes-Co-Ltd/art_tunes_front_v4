/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // App Routerの場合
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
