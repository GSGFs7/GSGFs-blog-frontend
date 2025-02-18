import {
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@heroui/navbar";
import { default as Link, default as NextLink } from "next/link";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineLogin } from "react-icons/ai";

// import { ThemeSwitch } from "./theme-switch";
import NavAvatar from "./nav-avatar";

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
    <NextUINavbar
      className="h-14 max-w-6xl rounded-b-3xl border-x border-b border-gray-400/50 bg-[#1c1b22a2] backdrop-blur-sm"
      isBlurred={true}
      maxWidth="xl"
      position="sticky"
      shouldBlockScroll={false}
    >
      {/* 最左边的标志 */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3 opacity-90">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <HiOutlineHome className="relative -translate-y-[0.15rem] text-2xl" />
            <p className="text-2xl font-bold">GSGFs</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="basis-1/5 justify-center sm:basis-full"
        justify="center"
      >
        {/* 中间的链接 */}
        <NavItems />
      </NavbarContent>

      {/* 右边的功能区 */}
      <NavbarContent
        // min-w-[5.875rem] 用于和左边的log配平长度
        className="hidden min-w-[5.875rem] basis-1/5 justify-end text-xl sm:flex sm:basis-full"
        justify="end"
      >
        {/* <ThemeSwitch className="group flex items-center justify-center" /> */}
        {!session ? (
          <NextLink className="" href={"/login"}>
            <AiOutlineLogin />
          </NextLink>
        ) : (
          // <Image
          //   alt="avatar"
          //   height={10}
          //   src={session?.user?.image ?? (defaultAvatar || "")}
          //   width={10}
          // />
          <NavAvatar
            img={session.avatar_url ? session.avatar_url : defaultAvatar}
            // TODO: fix here
            isAdmin={session === siteConfig.admin.email}
            signOutAction={signOutAction}
          />
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="z-10 bg-black">
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link className="w-full" color="primary" href={item.href}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
};
