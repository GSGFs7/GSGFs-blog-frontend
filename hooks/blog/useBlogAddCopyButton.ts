import { useEffect } from "react";
import toast from "react-hot-toast";

export function useBlogAddCopyButton(html: string) {
  // 使用 useEffect 查找代码块并添加复制按钮
  useEffect(() => {
    const codeBlocks = document.querySelectorAll("pre code");

    codeBlocks.forEach((codeBlock) => {
      const container = codeBlock.parentElement;
      const wrapper = document.createElement("div");

      wrapper.className = "relative";

      const copyButton = document.createElement("button");

      copyButton.className = "copyButton cursor-pointer"; // 在 @/styles/blog.css 这里定义
      copyButton.textContent = "Copy";

      // 图标
      // const iconSpan = document.createElement("span");

      // 图标来自 react-icon 中的 <MdCopyAll />
      // iconSpan.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18 2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H9V4h9v12zM3 15v-2h2v2H3zm0-5.5h2v2H3v-2zM10 20h2v2h-2v-2zm-7-1.5v-2h2v2H3zM5 22c-1.1 0-2-.9-2-2h2v2zm3.5 0h-2v-2h2v2zm5 0v-2h2c0 1.1-.9 2-2 2zM5 6v2H3c0-1.1.9-2 2-2z"></path></svg>`;
      // copyButton.appendChild(iconSpan);

      // 包装代码块
      container?.parentNode?.insertBefore(wrapper, container);
      wrapper.appendChild(container as Node);
      wrapper.appendChild(copyButton);

      // 添加复制功能
      copyButton.addEventListener("click", async () => {
        await navigator.clipboard.writeText(codeBlock.textContent || "");
        copyButton.textContent = "Copied";
        toast.success("Copied!");
        setTimeout(() => {
          copyButton.textContent = " Copy";
        }, 1500);
      });
    });
  }, [html]);
}
