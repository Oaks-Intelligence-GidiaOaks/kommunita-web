/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    fontFamily: {
      Inter: ["Inter", "san-serif"],
      Montserrat: ["Montserrat", "san-serif"],
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/assets/images/green_bg.jpeg')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
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
        "primary-light-gray": "#ADADAD",
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

      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
    require("flowbite/plugin"),
  ],
};
