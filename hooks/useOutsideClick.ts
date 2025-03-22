import { RefObject, useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing: boolean = true,
): RefObject<T | null> {
  // 用泛型 HTMLElement 表示 DOM
  const ref = useRef<T | null>(null);

  // 封装一个带有特殊效果的ref
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    // 事件传播的三个阶段，1.捕获阶段 2.目标阶段 3.冒泡阶段
    // 如果设置为true，在目标阶段开始处理事件，沿着DOM树向上冒泡的事件不会触发listener
    // 如果为false（默认），在冒泡阶段开始处理事件
    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  // 返回这个ref等待绑定到某个元素上
  return ref;
}
