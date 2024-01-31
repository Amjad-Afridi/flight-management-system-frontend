/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "background-image":
          "url('https://wallpapers.com/images/high/747-airplane-3fj378yn99dm3zns.webp')",
      }),
    },
  },
  plugins: [require("flowbite/plugin")],
};
