import { Suspense } from "react";

import { getSession } from "@/lib/auth";

import NavAvatar from "./avatar";
import { NavItems } from "./nav-items";
import { NavLogo } from "./nav-logo";
import { NavLogoFallback } from "./nav-logo-fallback";
import SmallScreenButton from "./small-screen-button";

export async function Navbar() {
  const session = await getSession();

  return (
    <nav className="sticky top-0 z-50 w-6xl">
      {/* 导航栏主容器 */}
      <div className="mx-auto h-14 max-w-6xl border-b border-gray-400/50 bg-[#1c1b22a2] backdrop-blur-sm sm:rounded-b-3xl sm:border-x">
        <div className="flex h-full items-center justify-between px-4">
          {/* 左侧 Logo */}
          <div className="flex items-center gap-3 opacity-90">
            <Suspense fallback={<NavLogoFallback />}>
              <NavLogo />
            </Suspense>
          </div>

          {/* 中间导航链接 - 桌面端显示 */}
          <div className="hidden w-full sm:block">
            <NavItems />
          </div>

          {/* 右侧功能区 */}
          <div className="hidden min-w-[5.875rem] items-center justify-end text-xl sm:flex">
            <NavAvatar initialSession={session} />
          </div>

          {/* 移动端菜单按钮 */}
          <div className="relative z-50">
            <SmallScreenButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
