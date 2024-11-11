/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        planoDeFundo: "url('./src/assets/planodefundo.jpg')",
      },
    },
  },
  plugins: [],
};
