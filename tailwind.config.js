/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: "media",
  theme: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/forms")
  ]
};
