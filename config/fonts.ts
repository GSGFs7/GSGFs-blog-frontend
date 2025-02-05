import {
  // Fira_Code as FontMono,
  // Inter as FontSans,
  LXGW_WenKai_TC as FontSans,
  JetBrains_Mono as FontMono,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "700",
  preload: true,
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
