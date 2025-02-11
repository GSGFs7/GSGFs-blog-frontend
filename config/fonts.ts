import {
  // Fira_Code as FontMono,
  // Inter as FontSans,
  LXGW_WenKai_TC as FontSans, //??? 加载不了了
  // Noto_Sans as FontSans,
  JetBrains_Mono as FontMono,
} from "next/font/google";

// ⚠ [next]/internal/font/google/w8gDH20td8wNsI3f40DmtXZb48uPLdshZm9fACXSUsp_tHlANTFW9nXtAIZ0HR7jZjKUK54WG_LwIA_99-s.woff2
// Error while requesting resource
// There was an issue requesting https://fonts.gstatic.com/s/lxgwwenkaitc/v5/w8gDH20td8wNsI3f40DmtXZb48uPLdshZm9fACXSUsp-tHlANTFW9nXtAIZ0HR7jZjKUK54WG_LwIA.99.woff2

export const fontSans = FontSans({
  subsets: [
    "latin",
    "latin-ext",
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "greek-ext",
    "lisu",
    "vietnamese",
  ],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "700"],
  preload: true,
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
