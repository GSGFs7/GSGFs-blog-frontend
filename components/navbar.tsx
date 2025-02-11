// import { Input } from "@heroui/react";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@heroui/navbar";
import NextLink from "next/link";
import { AiOutlineLogin } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";

import { auth, signOut } from "@/app/auth";
import { SearchIcon } from "@/components/icons";
import { NavItems } from "@/components/nav-items";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import NavAvatar from "@/components/nav-avatar";

export const Navbar = async () => {
  // const searchInput = (
  //   <Input
  //     aria-label="Search"
  //     classNames={{
  //       inputWrapper: "bg-[#cccccc]",
  //       input: "text-sm",
  //     }}
  //     endContent={
  //       <Kbd className="hidden lg:inline-block" keys={["command"]}>
  //         K
  //       </Kbd>
  //     }
  //     labelPlacement="outside"
  //     placeholder="Search..."
  //     startContent={
  //       <SearchIcon className="pointer-events-none flex-shrink-0 text-base" />
  //     }
  //     type="search"
  //   />
  // );

  const session = await auth();
  // console.log(session);

  async function signOutAction() {
    "use server";
    await signOut();
  }

  return (
    <NextUINavbar
      className="h-14 max-w-6xl rounded-b-3xl border-x border-b border-gray-400/50 bg-[#1c1b22c7] backdrop-blur-sm"
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
        <ThemeSwitch className="group flex items-center justify-center" />
        {/* {!session?.user ? (
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
            img={session.user.image}
            // TODO: fix here
            isAdmin={session.user.email === siteConfig.admin.email}
            signOutAction={signOutAction}
          />
        )} */}
      </NavbarContent>

      {/* 小屏幕上右边的汉堡菜单 */}
      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="z-50 px-10 pt-6">
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
