"use client";

import clsx from "clsx";
import { useContext } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

import { ModalContext } from "./modal";

import { useOutsideClick } from "@/hooks/useOutsideClick";

interface WindowChildProps {
  onCloseModal?: () => void;
}

export function Window({
  children,
  name,
  className = null,
}: {
  children: React.ReactElement<WindowChildProps>;
  name: string;
  className?: string | null;
}) {
  const { openModal: openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  const baseStyles =
    "absolute top-1/2 left-1/2 flex h-fit -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#1c1b22] shadow-2xs shadow-black px-4 pt-6 pb-4";

  const defaultWidth = !className ? "w-[38rem]" : "";

  // 通过createPortal将Modal组件渲染到body下
  // createPortal的第一个参数是要渲染的内容，第二个参数是要渲染到的位置
  // createPortal不会改变组件层级，依旧可以接受父组件的props
  return createPortal(
    <div className="absolute top-0 left-0 z-20 h-full w-full bg-white/5 p-4 font-mono backdrop-blur-md transition-all">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={clsx(baseStyles, defaultWidth, className)}
      >
        <button
          className="absolute top-4 right-4 z-10 cursor-pointer text-2xl"
          onClick={close}
        >
          <HiXMark />
        </button>

        {/* <div>{cloneElement(children, { onCloseModal: close })}</div> */}
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
