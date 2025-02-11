import { heroui } from "@heroui/theme";
import Typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      /* 自定义颜色 tailwindcss 升级到 v4 之后 heroui 里的颜色就失效了 */
      // 还是不行
      // colors: {
      //   primary: "#cccccc",
      //   background: "#1c1b22",
      // },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      themes: {
        light: {
          colors: {
            background: "#e8e2ec",
            primary: "#2c332c",
          },
        },
        dark: {
          colors: {
            background: "#1c1b22",
            primary: "#cccccc",
          },
        },
      },
    }),
    Typography,
  ],
};
