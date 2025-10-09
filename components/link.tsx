"use client";

import { LinkProps, default as NextLink } from "next/link";
import React from "react";

import { useLoading } from "@/app/providers";

/**
 * Custom Link commponent, provider global loading state
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
