"use client";

import { useAuth } from "@/app/providers";

export function CookiePreference() {
  const { enableCookies, setEnableCookies } = useAuth();

  return (
    <div className="flex w-fit items-center justify-center gap-2">
      <input
        checked={enableCookies}
        id="cookie_checkbox"
        type="checkbox"
        onChange={() => setEnableCookies(!enableCookies)}
      />
      <label htmlFor="cookie_checkbox">启用 Cookies 以保存登录状态?</label>
    </div>
  );
}
