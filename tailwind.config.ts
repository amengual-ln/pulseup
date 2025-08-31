import type { Config } from "tailwindcss"

export default <Partial<Config>>{
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        pulse: {
          red: "#E63946",
          dark: "#0B0B0F",
          gray: "#1E1E24",
        },
      },
      boxShadow: {
        "pulse-card": "0 4px 12px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        custom: ['Plus Jakarta Sans'],
      }
    },
  },
  plugins: [],
}
