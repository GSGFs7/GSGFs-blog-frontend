"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BackgroundState {
  backgroundImage: string;
  setBackgroundImage: (url: string) => void;
}

export const useBackgroundStore = create<BackgroundState>()(
  // 使用 localStorage 存储
  persist(
    (set) => ({
      backgroundImage: "",
      setBackgroundImage: (url) => set({ backgroundImage: url }),
    }),
    {
      name: "background-storage",
      // 不可用于服务端
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return window.localStorage;
        } else {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
      }),
      // 跳过水合错误检查
      skipHydration: true,
    },
  ),
);
