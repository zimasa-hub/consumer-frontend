import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        
        plusJakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        'teal-custom': '#008080',
        'semi-transparent-orange': 'rgba(255, 165, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
