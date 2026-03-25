/** @type {import('tailwindcss').Config} */
module.exports = {
  // Only scan auth-related files so Tailwind doesn't bloat other pages
  content: [
    "./pages/login.js",
    "./pages/signup.js",
    "./components/auth/**/*.{js,jsx,ts,tsx}",
    "./hooks/useAuth.js",
    "./lib/supabaseClient.js",
  ],
  // Prefix all Tailwind utilities with "tw-" to prevent any collision
  // with Bootstrap classes already used across the rest of the site.
  prefix: "tw-",
  // Disable Tailwind's global reset / base layer so it doesn't fight Bootstrap
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          500: "#0096c7",
          600: "#0077b6",
          700: "#005f8e",
          900: "#003a56",
        },
      },
      boxShadow: {
        auth: "0 4px 6px -1px rgba(0,0,0,.07), 0 2px 4px -2px rgba(0,0,0,.05), 0 0 0 1px rgba(0,0,0,.04)",
        "auth-lg": "0 10px 40px -10px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.05)",
      },
      animation: {
        "fade-up": "fadeUp .35s ease both",
        "spin-slow": "spin 1.4s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: 0, transform: "translateY(14px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
