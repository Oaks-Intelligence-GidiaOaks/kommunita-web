/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    fontFamily: {
      Inter: ["Inter", "san-serif"],
      Montserrat: ["Montserrat", "san-serif"],
    },
    extend: {
      textColor: {
        "primary-dark-green": "#3D7100",
        "primary-bright-green": "#7ADD02",
        "primary-light-green": "#94FC83",
        "primary-gray": "#AEAEAE",
        "primary-light-gray": "#ADADAD",
        "primary-dark-gray": "#4D4D4D",
        "primary-red": "#FF3A29",
        "secondary-white": "#7C8DB5",
      },

      borderColor: {
        "primary-dark-green": "#3D7100",
        "primary-bright-green": "#7ADD02",
        "primary-light-green": "#94FC83",
      },

      backgroundColor: {
        "primary-dark-green": "#3D7100",
        "primary--bright-green": "#7ADD02",
        "primary-gray": "#AEAEAE",
        "primary-black": "#091001",
      },
      fontFamily: {
        "pt-serif": "'PT Serif Caption', serif",
        poppins: "'Poppins', sans-serif",
        inter: "'Inter', sans-serif",
      },
      boxShadow: {
        "primary-dark": "5px 7px 12px rgba(0,0,0,0.3)",
        "primary-dark-hovered": "7px 9px 14px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("flowbite/plugin")],
};
