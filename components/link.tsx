"use client";

import { LinkProps, default as NextLink } from "next/link";
import React from "react";

import { useLoading } from "@/app/providers";

/**
 * Custom Link component, provider global loading state
 *
 * In this project, you should use this component to replace "next/link"
 * to provide page navigation state.
 *
 * For those who use useRouter,
 * if page navigation occurs use `useLoading` hook to set loading state
 */
export const Link = React.forwardRef<
  HTMLAnchorElement,
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps<any>> &
    LinkProps<any>
>(({ href, children, onNavigate, ...rest }, ref) => {
  const { setIsLoading } = useLoading();

  return (
    <NextLink
      href={href}
      onNavigate={(event) => {
        setIsLoading(true);

        if (onNavigate) {
          onNavigate(event);
        }
      }}
      {...rest}
      ref={ref}
    >
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";

export default Link;
