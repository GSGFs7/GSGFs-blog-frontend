import {
  // Fira_Code as FontMono,
  // Inter as FontSans,
  LXGW_WenKai_TC as FontSans,
  // Noto_Sans as FontSans,
  JetBrains_Mono as FontMono,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "700"],
  preload: true,
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
