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
        navyBlue: '#002F5E',
        saffron: '#F9BC33',
        terracottaOrange: '#CB6F35',
        cream: '#F5F5F5',
        green: '#006B35',
      },
      boxShadow: {
        '3xl': '0px 5px 15px rgba(0, 0, 0, 0.35)',
        '4xl': '0px 3px 8px rgba(0, 0, 0, 0.24)',
      },
      error: '#FF3939',
    },
  },
  plugins: [],
};
export default config;
