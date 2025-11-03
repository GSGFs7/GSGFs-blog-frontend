"use client";

import type { CapSolveEvent } from "@cap.js/widget";
import dynamic from "next/dynamic";
import { createElement, useEffect, useRef, useState } from "react";

import { NEXT_PUBLIC_CAP_SITE_KEY } from "@/env/public";
import type { Captcha, Captchas, CaptchaWidget } from "@/types/captcha";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "cap-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          id?: string;
          "data-cap-api-endpoint"?: string;
          "data-cap-worker-count"?: string;
          "data-cap-hidden-field-name"?: string;
          onsolve?: string;
          onerror?: string;
          onreset?: string;
          onprogress?: string;
        },
        HTMLElement
      > & {
        reset?: () => void;
        solve?: () => Promise<{ success: boolean; token: string }>;
        token?: string | null;
        tokenValue?: string | null;
      };
    }
  }
}

export class Cap implements Captcha {
  private token: string | null = null;
  type: Captchas = "Cap";

  private _setTokenAction(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    // or get token from HTML element?
    return this.token;
  }

  reset(): void {
    const widget = document.querySelector("#cap") as
      | JSX.IntrinsicElements["cap-widget"]
      | null;
    if (!widget) {
      throw new Error("Captcha widget not found");
    }
    if (!widget.reset) {
      throw new Error("Captcha widget reset method not available");
    }
    widget.reset();
  }

  render(): React.ReactNode {
    // context is lost, must bind it
    return CapWidget({ setTokenAction: this._setTokenAction.bind(this) });
  }
}

// disable SSR
const CapWidgetInner = dynamic(
  async () => {
    window.CAP_CUSTOM_WASM_URL = `${window.location.origin}/cap/cap_wasm.js`;
    const { default: Cap } = await import("@cap.js/widget");

    return function CapWidgetComponent({ setTokenAction }: CaptchaWidget) {
      const endpoint = `${window.location.origin}/api/proxy/cap/${NEXT_PUBLIC_CAP_SITE_KEY}/`;
      const ref = useRef<any>(undefined);
      const [isCapInit, setIsCapInit] = useState(false);

      useEffect(() => {
        new Cap({
          apiEndpoint: endpoint,
          "data-cap-api-endpoint": endpoint,
        });
        setIsCapInit(true);
      }, [endpoint]);

      useEffect(() => {
        if (!isCapInit) {
          return;
        }

        const widget = document.querySelector("cap-widget");
        const a = widget?.shadowRoot?.querySelector(
          "a.credits",
        ) as HTMLElement | null;
        if (a) {
          a.style.transform = "translateY(12px)";
        }
      }, [isCapInit]);

      const handleSolve = (e: CapSolveEvent) => {
        setTokenAction(e.detail.token);
      };

      return createElement("cap-widget", {
        id: "cap",
        "data-cap-api-endpoint": endpoint,
        "data-cap-i18n-verifying-label": " ",
        "data-cap-i18n-initial-state": "I'm not bot",
        "data-cap-i18n-solved-label": "U're a human",
        "data-cap-i18n-error-label": "Try again",
        "data-cap-i18n-wasm-disabled": "WASM pls",
        onsolve: (e: CapSolveEvent) => handleSolve(e),
        style: {
          "--cap-background": "#1a1c25",
          "--cap-border-color": "#ffffff00",
          "--cap-border-radius": "0px",
          "--cap-widget-height": "full",
          "--cap-widget-width": "165px",
          "--cap-widget-padding": "14px",
          "--cap-gap": "15px",
          "--cap-color": "#ffffff",
          "--cap-checkbox-size": "20px",
          "--cap-checkbox-border": "1px solid #aaaaaad1",
          "--cap-checkbox-border-radius": "4px",
          "--cap-checkbox-background": "#e7e7e7",
          "--cap-checkbox-margin": "2px",
          "--cap-font": "LXGW WenKai Screen",
          "--cap-spinner-color": "#2bac70",
          "--cap-spinner-background-color": "#eee",
          "--cap-spinner-thickness": "3px",
        },
        ref,
      });
    };
  },
  {
    ssr: false,
    loading: () => <div className="spinner-mini mr-3" />,
  },
);

export function CapWidget({ setTokenAction }: CaptchaWidget) {
  return <CapWidgetInner setTokenAction={setTokenAction} />;
}
