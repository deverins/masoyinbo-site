import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define primary and secondary colors for light and dark mode
        primary: {
          light: '#1C1F41', // skyBlue in light mode
          DEFAULT: '#1C1F41', // navyBlue by default
          dark: '#000000', // black in dark mode
          lightPink:'#F7E6E6',
        },
        secondary: {
          saffron: '#F9BC33', // saffron in light mode
          DEFAULT: '#CB6F35', // terracottaOrange by default
          dark: '#FF3939', // red in dark mode
          cream: '#F5F5F5',
        },
        background: {
          light: '#1C1F41', // white in light mode
          dark: '#000000', // black in dark mode
        },
        text: {
          light: '#000000', // black text in light mode
          dark: '#FFFFFF', // white text in dark mode
        },
        danger: {
          light: '#FF3939', // red in light mode
          dark: '#FF3939', // red in dark mode (same)
        },
        success: {
          light: '#006B35', // green in light mode
          dark: '#006B35', // green in dark mode (same)
        },
      },
      boxShadow: {
        '3xl': '0px 5px 15px rgba(0, 0, 0, 0.35)',
        '4xl': '0px 3px 8px rgba(0, 0, 0, 0.24)',
      },
    },
  },
  plugins: [],
};

export default config;
