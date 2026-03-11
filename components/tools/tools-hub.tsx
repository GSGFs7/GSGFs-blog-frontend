"use client";

import clsx from "clsx";
import { useState } from "react";
import { LuLayoutGrid, LuX } from "react-icons/lu";

import { AIChatWidget } from "./ai-chat-widget";
import { PostSearchWidget } from "./post-search-widget";

export function ToolsHub() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-center gap-3">
      <div
        className={clsx(
          "flex flex-col items-center gap-3",
          isOpen
            ? "animate-slide-up visible opacity-100"
            : "animate-slide-down pointer-events-none invisible opacity-0",
        )}
      >
        <AIChatWidget />
        <PostSearchWidget />
      </div>

      <button
        aria-label={isOpen ? "收起工具栏" : "展开工具栏"}
        className={clsx(
          "cursor-pointer rounded-full p-2 backdrop-blur-sm",
          "bg-blue-500/60 transition-transform duration-200",
          isOpen && "rotate-90",
        )}
        type="button"
        onClick={toggle}
      >
        {isOpen ? (
          <LuX className="h-8 w-8" />
        ) : (
          <LuLayoutGrid className="h-8 w-8" />
        )}
        <span className="sr-only">{isOpen ? "收起工具栏" : "展开工具栏"}</span>
      </button>
    </div>
  );
}
