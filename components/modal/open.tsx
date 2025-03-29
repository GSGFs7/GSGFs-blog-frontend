"use client";

import { useContext, cloneElement, useEffect } from "react";

import { ModalContext } from "./modal";

export function Open({
  children,
  opens: opensWindowName,
  autoOpen = false,
}: {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  opens: string;
  autoOpen?: boolean;
}) {
  const { open } = useContext(ModalContext);

  useEffect(() => {
    if (autoOpen) {
      open(opensWindowName);
    }
  }, [autoOpen, opensWindowName, open]);

  // 复制一份, 再加上属性
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}
