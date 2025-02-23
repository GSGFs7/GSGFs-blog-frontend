import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineLogin } from "react-icons/ai";

import NavAvatar from "./nav-avatar";
import SmallScreenButton from "./small-screen-button";

import { NavItems } from "@/components/navbar/nav-items";
import { siteConfig } from "@/config/site";
import { getSession } from "@/lib/auth";

export const Navbar = async () => {
  const session = await getSession();
  const defaultAvatar = "/avatar.png";

  async function signOutAction() {
    "use server";
    // await signOut();
  }

  return (
    <nav className="sticky top-0 z-50 w-6xl">
      {/* 导航栏主容器 */}
      <div className="mx-auto h-14 max-w-6xl border-b border-gray-400/50 bg-[#1c1b22a2] backdrop-blur-sm sm:rounded-b-3xl sm:border-x">
        <div className="flex h-full items-center justify-between px-4">
          {/* 左侧 Logo */}
          <div className="flex items-center gap-3 opacity-90">
            <Link className="flex items-center justify-start gap-1" href="/">
              <HiOutlineHome className="relative -translate-y-[0.15rem] text-2xl" />
              <p className="text-2xl font-bold">GSGFs</p>
            </Link>
          </div>

          {/* 中间导航链接 - 桌面端显示 */}
          <div className="hidden w-full sm:block">
            <NavItems />
          </div>

          {/* 右侧功能区 */}
          <div className="hidden min-w-[5.875rem] items-center justify-end text-xl sm:flex">
            {!session ? (
              <Link href="/login">
                <AiOutlineLogin />
              </Link>
            ) : (
              <NavAvatar
                img={session.avatar_url ?? defaultAvatar}
                isAdmin={session === siteConfig.admin.email}
                signOutAction={signOutAction}
              />
            )}
          </div>

          {/* 移动端菜单按钮 */}
          <SmallScreenButton />
        </div>
      </div>
    </nav>
  );
};
