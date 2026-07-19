/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Colors taken verbatim from UI-Developer-Test-Spec_1.pdf ("Typography & Colour").
      colors: {
        navy: "#0A192F",
        deepBlue: "#002966",
        amber: {
          DEFAULT: "#E88F00",
          50: "#FDF3E1", // ASSUMPTION: tint not specified in PDF; used only for
          600: "#E88F00", // subtle active-link background in the mobile menu.
        },
        cream: "#F8E9D2",
        ink: "#171717",
        background: "#F7F7F7",
      },
      // Fonts per PDF: "Outfit — primary sans" / "PT Serif — serif accent".
      fontFamily: {
        sans: ["var(--font-outfit)", "ui-sans-serif", "sans-serif"],
        serif: ["var(--font-pt-serif)", "ui-serif", "serif"],
      },
    },
  },
  plugins: [],
};
