"use client";

import { useEffect } from "react";

export function useBlogShowCodeLanguage() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll(
      'pre code[class*="language-"]',
    );

    codeBlocks.forEach((block) => {
      if (!(block instanceof HTMLElement)) return;

      // get all class
      const classes = block.className.split(" ");

      // found language class
      const languageClass = classes.find((cls) => cls.startsWith("language-"));

      if (!languageClass) return;

      // get language name
      const language = languageClass.replace("language-", "");

      // create a new element
      const label = document.createElement("span");

      label.className = "code-language-label";
      label.textContent = language;
      label.style.position = "absolute";
      label.style.top = "0";
      label.style.left = "0";
      label.style.padding = "0.25rem 0.5rem";
      label.style.borderRadius = "0.25rem";

      // get parent element
      const pre = block.parentElement;

      if (!pre || pre.tagName !== "PRE") return; // uppercase

      pre.style.position = "relative";
      pre.style.padding = "1rem";

      // add the label
      pre.appendChild(label);
    });
  }, []);
}
