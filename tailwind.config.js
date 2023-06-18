/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "delayed-tracking-in-expand": "delayed-tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) 0.5s both",
        "tracking-in-contract-bck-top": "tracking-in-contract-bck-top 1s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
        
      },
      keyframes: {
        "tracking-in-contract-bck-top": {
          "0%": {
              "letter-spacing": "1em",
              transform: "translateZ(400px) translateY(-300px)",
              opacity: "0"
          },
          "40%": {
              opacity: ".6"
          },
          to: {
              transform: "translateZ(0) translateY(0)",
              opacity: "1"
          }
      },
        "delayed-tracking-in-expand": {
          "0%": {
            "letter-spacing": "-.5em",
            opacity: "0"
          },
          "40%": {
            opacity: ".6"
          },
          to: {
            opacity: "1"
          }
        }
      }
    },

    
  },
  plugins: [],
}

