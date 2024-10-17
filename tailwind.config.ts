import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'bit':'320px',
        'custom': '934.44px',
        '870px': '870px',
        'mobile': '640px',
      },
      spacing:{
        '98p':'98%',
      },
      maxHeight:{
        "85vh": "85vh",
        "88vh": "88vh",
        "97vh": "97vh",
      },
      colors: {
        primary: {
          light: '#1C1F41',
          DEFAULT: '#1C1F41', 
          lightBlack: '[rgba(255,255,255,0.1)]',
          lightPink:'#F7E6E6',
          
        },
        secondary: {
          saffron: '#F9BC33', 
          saffronLight: '#F9BC20',
          DEFAULT: '#CB6F35', 
          dark: '#FF3939', 
          cream: '#F5F5F5',
        },
        background: {
          light: '#1C1F41', 
          dark: '#000000', 
        },
        "text": {
          light: '#000000', 
          dark: '#FFFFFF', 
          saffron: '#F9BC33', 
          saffronLight: '#F9BC20', 
        },
        border: {
          saffron: '#F9BC33', 
          saffronLight: '#F9BC20', 
        },
        danger: {
          light: '#B30205', 
          dark: '#FF3939', 
        },
        success: {
          light: '#006B35', 
          dark: '#006B35', 
        },
      },
      boxShadow: {
        '3xl': '0px 5px 15px rgba(0, 0, 0, 0.35)',
        '4xl': '0px 3px 8px rgba(0, 0, 0, 0.24)',
      },
      animation: {
        "spin-2e": "spin 2s ease-in infinite",
        "spin-2l": "spin 2s linear infinite",
        "spin-2eo": "spin 2s ease-in-out infinite",
        "spin-2.5l": "spin 2.5s linear infinite",
        "spin-3l": "spin 3s linear infinite",
        //from left fly animation
        "from-left-fast": "fly-from-left 0.4s ease-out",
        "from-left-medium": "fly-from-left 0.6s ease-out",
        "from-left-slow": "fly-from-left 0.9s ease-out",
        //to left fly animation
        "to-left-fast": "fly-to-left 0.4s ease-out",
        "to-left-medium": "fly-to-left 0.6s ease-out",
        "to-left-slow": "fly-to-left 0.9s ease-out",
        // from right fly animation
        "from-right-fast": "fly-from-right 0.4s ease-out",
        "from-right-medium": "fly-from-right 0.6s ease-out",
        "from-right-slow": "fly-from-right 0.9s ease-out",
        // to right fly animation
        "to-right-fast": "fly-to-right 0.4s ease-out",
        "to-right-medium": "fly-to-right 0.6s ease-out",
        "to-right-slow": "fly-to-right 0.9s ease-out",
        // from top fly animation
        "from-top-fast": "fly-from-top 0.4s ease-out",
        "from-top-medium": "fly-from-top 0.6s ease-out",
        "from-top-slow": "fly-from-top 0.9s ease-out",
        // to top fly animation
        "to-top-fast": "fly-to-top 0.4s ease-out",
        "to-top-medium": "fly-to-top 0.6s ease-out",
        "to-top-slow": "fly-to-top 0.9s ease-out",
        //from bottom fly animation
        "from-bottom-fast": "fly-from-bottom 0.4s ease-out",
        "from-bottom-medium": "fly-from-bottom 0.6s ease-out",
        "from-bottom-slow": "fly-from-bottom 0.9s ease-out",
        // to bottom fly animation
        "to-bottom-fast": "fly-to-bottom 0.4s ease-out",
        "to-bottom-medium": "fly-to-bottom 0.6s ease-out",
        "to-bottom-slow": "fly-to-bottom 0.9s ease-out",
        // zoom up animation
        "zoom-up-fast": "zoom-up 0.4s ease-out",
        "zoom-up-medium": "zoom-up 0.6s ease-out",
        "zoom-up-slow": "zoom-up 0.9s ease-out",
        // zoom off animation
        "zoom-off-fast": "zoom-off 0.4s ease-out",
        "zoom-off-medium": "zoom-off 0.65s ease-out",
        "zoom-off-slow": "zoom-off 0.9s ease-out",
        // big zoom up animation
        "big-zoom-up-fast": "big-zoom-up 0.4s ease-out",
        "big-zoom-up-medium": "big-zoom-up 0.6s ease-out",
        "big-zoom-up-slow": "big-zoom-up 0.9s ease-out",
        //slide scale y animation
        "slide-enter": "slider 0.5s cubic-bezier(0.5, 0.52, 0.165, 1)",
        "slide-leave":
          "slider 0.5s cubic-bezier(0.025, 0.382, 0.565, 1) reverse",
      },
      keyframes: {
        "fly-from-left": {
          "0%": { transform: "translateX(-300px)" },
          "100%": { transform: "translateX(0)" },
        },
        "fly-to-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-300px)" },
        },
        "fly-from-right": {
          "0%": { transform: "translateX(300px)" },
          "100%": { transform: "translateX(0)" },
        },
        "fly-to-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(300px)" },
        },
        "fly-from-top": {
          "0%": { transform: "translateY(-300px)" },
          "100%": { transform: "translateY(0)" },
        },
        "fly-to-top": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-300px)" },
        },
        "fly-from-bottom": {
          "0%": { transform: "translateY(300px)" },
          "100%": { transform: "translateY(0)" },
        },
        "fly-to-bottom": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(300px)" },
        },
        "zoom-up": {
          "0%": { transform: "scale(0.3)" },
          "100%": { transform: "scale(1)" },
        },
        "zoom-off": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
        "big-zoom-up": {
          "0%": { transform: "scale(0.55)" },
          "100%": { transform: "scale(1)" },
        },

        slider: {
          "0%": {
            transform: "scaleY(0)",
            "transform-origin": "top",
          },

          "100%": {
            "transform-origin": "top",
            transform: "scaleY(1)",
          },
        },
      },
      
    },
  },

  safeList:[
    'center-leave',
    'full-leave',
    'bottom-leave',
    'top-leave',
    'left-leave',
    'right-leave',
    'center',
    'full',
    'bottom',
    'top',
    'left',
    'right',
  ],
  plugins: [],
};

export default config;
