/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        background: "hsl(0 0% 100%)",
        foreground: "hsl(213 80% 22%)",
        primary: {
          DEFAULT: "hsl(199 76% 54%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: "hsl(199 100% 95%)",
        muted: {
          DEFAULT: "hsl(199 30% 95%)",
          foreground: "hsl(213 20% 46%)",
        },
        card: "hsl(0 0% 100%)",
        navy: "hsl(213 80% 22%)",
        pool: "hsl(199 76% 54%)",
        "pool-light": "hsl(199 100% 95%)",
        "pool-glow": "hsl(199 76% 64%)",
        gold: "hsl(40 70% 55%)",
        border: "hsl(199 30% 88%)"
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, hsl(213 80% 12% / 0.85), hsl(199 76% 24% / 0.7))",
        "gradient-pool": "linear-gradient(135deg, hsl(199 76% 54%), hsl(199 76% 44%))",
        "gradient-navy": "linear-gradient(135deg, hsl(213 80% 15%), hsl(213 80% 25%))"
      },
      boxShadow: {
        card: "0 8px 32px -8px hsl(213 80% 22% / 0.1)",
        "card-hover": "0 16px 48px -12px hsl(199 76% 54% / 0.2)",
        hero: "0 20px 60px -15px hsl(213 80% 22% / 0.3)"
      },
      keyframes: {
        "water-shimmer": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "water-shimmer": "water-shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
