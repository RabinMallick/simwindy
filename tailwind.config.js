/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand-color)",       // Main brand color
        primary: "var(--brand-color)",     // Alias for primary
        secondary: "var(--secondary)",
        simBlack: "var(--black)",
        simOrange: "var(--orange)",
        peach: "var(--from)",             // Optional utility
        lightGray: "var(--to)",    // Optional utility
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"], // Outfit font
      },
    },
  },
  plugins: [],
};
