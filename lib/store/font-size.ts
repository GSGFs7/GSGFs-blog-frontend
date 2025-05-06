"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const FONT_FAMILIES = {
  sans: "lxgw-wenkai",
  serif: "",
  mono: "Maple Mono",
  custom: "",
};

export const FONT_SIZES = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
};

// 默认值
const DEFAULT_FONT_STATE = {
  fontSize: "base" as keyof typeof FONT_SIZES,
  lineHeight: "1.5",
  fontFamily: "sans" as keyof typeof FONT_FAMILIES,
  customFont: "",
};

interface FontState {
  fontSize: keyof typeof FONT_SIZES;
  lineHeight: string;

  fontFamily: keyof typeof FONT_FAMILIES;
  customFont: string;

  setFontSize: (size: keyof typeof FONT_SIZES) => void;
  setLineHeight: (height: string) => void;
  setFontFamily: (family: keyof typeof FONT_FAMILIES) => void;
  setCustomFont: (font: string) => void;
  resetToDefaults: () => void;
}

export const useFontSettings = create<FontState>()(
  persist(
    (set) => ({
      ...DEFAULT_FONT_STATE,

      setFontSize: (size) => set({ fontSize: size }),
      setLineHeight: (height) => set({ lineHeight: height }),
      setFontFamily: (family) => set({ fontFamily: family }),
      setCustomFont: (font) => set({ customFont: font, fontFamily: "custom" }),
      resetToDefaults: () => set(DEFAULT_FONT_STATE),
    }),
    {
      name: "font-setting",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
