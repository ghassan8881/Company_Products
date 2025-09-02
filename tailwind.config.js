/** @type {import('tailwindcss').Config} */
Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ملفات App Router
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default Config;
