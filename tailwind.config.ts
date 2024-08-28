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
        skyBlue: '#72C3D5',
        navyBlue: '#1C1F41',
        saffron: '#F9BC33',
        terracottaOrange: '#CB6F35',
        lightPink:'#F7E6E6',
        cream: '#F5F5F5',
        red: '#FF3939',
        green: '#006B35',
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
