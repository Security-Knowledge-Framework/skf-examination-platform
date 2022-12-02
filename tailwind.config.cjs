/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      screens: {
        "lt-2xl": { max: "1536px" },
        // => @media (max-width: 1536px) { ... }

        "lt-xl": { max: "1280px" },
        // => @media (max-width: 1280px) { ... }

        "lt-lg": { max: "1024px" },
        // => @media (max-width: 1024px) { ... }

        "lt-md": { max: "768px" },
        // => @media (max-width: 768px) { ... }

        "lt-sm": { max: "640px" },
        // => @media (max-width: 640px) { ... }

        "lt-xsm": { max: "440px" },
        // => @media (max-width: 480px) { ... }
      },
      container: {
        center: "true",
      },
    },
  },
  plugins: [],
};
