/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  darkMode: "media",
  theme: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/forms")
  ]
};
