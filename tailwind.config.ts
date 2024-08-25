import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)"],
      },
      colors: {
        "primary-green": "var(--primary-green)",
        "secondary-green": "var(--secondary-green)",
        "dark-grey": "var(--dark-grey)",
        "errors": "var(--errors)",
      },
      screens: {
        sm: "480px",
        md: "860px",
        lg: "1080px",
        xl: "1440px",
      },
    },
  },
  plugins: [],
};
export default config;
