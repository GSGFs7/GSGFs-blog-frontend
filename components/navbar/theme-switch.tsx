// "use client";

// import { FC, useState } from "react";
// import { VisuallyHidden } from "@react-aria/visually-hidden";
// // import { useTheme } from "next-themes";
// // import { useIsSSR } from "@react-aria/ssr";
// import clsx from "clsx";

// import { MoonFilledIcon } from "@/components/icons";

// export interface ThemeSwitchProps {
//   className?: string;
// }

// export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
//   // const { theme, setTheme } = useTheme();
//   // const isSSR = useIsSSR();

//   // const onChange = () => {
//   //   theme === "light" ? setTheme("dark") : setTheme("light");
//   // };

//   const {
//     Component,
//     slots,
//     // isSelected,
//     getBaseProps,
//     getInputProps,
//     getWrapperProps,
//   } = useSwitch({
//     // 暂时禁用
//     // isSelected: theme === "light" || isSSR,
//     // "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
//     // onChange,
//   });

//   const [isHover, setIsHover] = useState(false);

//   return (
//     <Component
//       {...getBaseProps({
//         className: clsx(
//           "px-px transition-opacity hover:opacity-80 cursor-pointer",
//           "cursor-not-allowed", // 禁用点击
//           className,
//         ),
//       })}
//       onMouseEnter={() => setIsHover(true)}
//       onMouseLeave={() => setIsHover(false)}
//     >
//       <VisuallyHidden>
//         <input {...getInputProps()} />
//       </VisuallyHidden>
//       <div
//         {...getWrapperProps()}
//         className={slots.wrapper({
//           class: clsx([
//             "h-auto w-auto",
//             "bg-transparent",
//             "rounded-lg",
//             "flex items-center justify-center",
//             "group-data-[selected=true]:bg-transparent",
//             "!text-default-500",
//             "pt-px",
//             "px-0",
//             "mx-0",
//           ]),
//         })}
//         onMouseEnter={() => setIsHover(true)}
//         onMouseLeave={() => setIsHover(false)}
//       >
//         {/* {!isSelected || isSSR ? (
//           <SunFilledIcon size={22} />
//         ) : (
//           <MoonFilledIcon size={22} />
//         )} */}
//         <MoonFilledIcon size={22} />
//       </div>
//       {isHover ? (
//         <div className="bg-background absolute top-full mt-2 rounded-md px-2 py-1">
//           <p className="inline-block text-sm whitespace-nowrap">
//             浅色模式暂不可用
//           </p>
//         </div>
//       ) : null}
//     </Component>
//   );
// };
