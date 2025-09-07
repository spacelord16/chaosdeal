/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "card-brown": "#8B4513",
        "card-light-blue": "#87CEEB",
        "card-pink": "#FFC0CB",
        "card-orange": "#FFA500",
        "card-red": "#FF0000",
        "card-yellow": "#FFFF00",
        "card-green": "#008000",
        "card-dark-blue": "#00008B",
        "card-railroad": "#2F4F4F",
        "card-utility": "#FFD700",
      },
      fontFamily: {
        game: ["Arial", "sans-serif"],
      },
      animation: {
        "card-flip": "cardFlip 0.6s ease-in-out",
        "card-deal": "cardDeal 0.8s ease-out",
        "chaos-pulse": "chaosPulse 2s ease-in-out infinite",
      },
      keyframes: {
        cardFlip: {
          "0%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(90deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
        cardDeal: {
          "0%": {
            transform: "translateX(-100px) rotate(-10deg)",
            opacity: "0",
          },
          "100%": { transform: "translateX(0) rotate(0deg)", opacity: "1" },
        },
        chaosPulse: {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(239, 68, 68, 0.7)",
          },
          "50%": {
            transform: "scale(1.05)",
            boxShadow: "0 0 0 10px rgba(239, 68, 68, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
