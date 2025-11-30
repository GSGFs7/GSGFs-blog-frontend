"use client";

import type { SolveResult } from "@cap.js/widget";
import { useEffect, useState } from "react";

export function useInvisibleCap() {
  const [isMounted, setIsMount] = useState(false);
  const [getToken, setGetToken] = useState<() => Promise<SolveResult>>();

  useEffect(() => {
    setIsMount(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    window.CAP_CUSTOM_WASM_URL = `${window.location.origin}/cap/cap_wasm.js`;
    import("@cap.js/widget").then(({ default: Cap }) => {
      const cap = new Cap({
        apiEndpoint: `${window.location.origin}/api/captcha/cap/`,
      });
      setGetToken(() => cap.solve.bind(cap));
    });

    return () => {
      // How clear it?
    };
  }, [isMounted]);

  return getToken;
}
