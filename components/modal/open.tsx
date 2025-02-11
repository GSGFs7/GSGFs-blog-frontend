"use client";

import { useContext, cloneElement } from "react";

import { ModalContext } from "./modal";

export function Open({
  children,
  opens: opensWindowName,
}: {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  opens: string;
}) {
  const { open } = useContext(ModalContext);

  // 复制一份, 再加上属性
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}
