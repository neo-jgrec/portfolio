/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        background: "#121212",
        primary: "#7C3AED"
      },
      backgroundImage: {
        'noisy-texture': 'url("assets/background_noisy.png")'
      },
    },
  },
  plugins: [
    require('./plugins/tooltipPlugin')
  ],
}
