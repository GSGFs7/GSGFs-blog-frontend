"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export function useBlogAddCopyButton() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll("pre code");

    codeBlocks.forEach((codeBlock) => {
      const container = codeBlock.parentElement;
      const wrapper = document.createElement("div");

      wrapper.className = "relative";

      const copyButton = document.createElement("button");

      copyButton.className = "copyButton cursor-pointer"; // defined in `@/styles/blog.css`
      copyButton.textContent = "Copy";

      // wrap
      container?.parentNode?.insertBefore(wrapper, container);
      wrapper.appendChild(container as Node);
      wrapper.appendChild(copyButton);

      // cliek to copy
      copyButton.addEventListener("click", async () => {
        await navigator.clipboard.writeText(codeBlock.textContent || "");
        copyButton.textContent = "Copied";
        toast.success("Copied!");
        setTimeout(() => {
          copyButton.textContent = " Copy";
        }, 1500);
      });
    });
  }, []);
}
