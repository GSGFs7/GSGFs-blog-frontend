// "use client";

// import Script from "next/script";
// import {
//   Ref,
//   useCallback,
//   useEffect,
//   useImperativeHandle,
//   useState,
// } from "react";

// import { NEXT_PUBLIC_TURNSTILE_SITE_KEY } from "@/env/public";

// // https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/
// interface TurnstileOptions {
//   sitekey: string;
//   theme?: "auto" | "light" | "dark";
//   size?: "normal" | "flexible" | "compact";
//   callback?: (token: string, preClearanceObtained: boolean) => void; // Success callback
//   "error-callback"?: (errorCode: string) => void;
//   execution?: "render" | "execute"; // When to run the challenge
//   appearance?: "always" | "execute" | "interaction-only"; // When the widget is visible
//   "expired-callback"?: (token: string) => void;
//   "timeout-callback"?: () => void;
// }

// // Extend Window type to include turnstile because turnstile is mounted directly under window
// declare global {
//   interface Window {
//     turnstile?: {
//       render: (
//         container: HTMLElement | string,
//         options: TurnstileOptions,
//       ) => string;
//       ready: (callback: () => any) => void;
//       reset: (widgetID?: HTMLElement | string) => void;
//       remove: (widgetID?: HTMLElement | string) => void;
//       isExpired: (widgetID?: HTMLElement | string) => void;
//       getResponse: (widgetID?: HTMLElement | string) => string;
//       execute: (widgetID?: HTMLElement | string, i?: any) => void;
//     };
//   }
// }

// interface TurnstileWidgetProp {
//   setTokenAction: (token: string) => void;
//   ref?: Ref<{ reset: () => void }>;
// }

// export default function TurnstileWidget({
//   setTokenAction,
//   ref,
// }: TurnstileWidgetProp) {
//   const [isWidgetLoaded, setWidgetIsLoaded] = useState(false);
//   const [isScriptReady, setIsScriptReady] = useState(false);
//   const [turnstile, setTurnstile] = useState<
//     typeof window.turnstile | undefined
//   >(undefined);

//   const initTurnstile = useCallback(() => {
//     if (!window.turnstile || isWidgetLoaded) return;

//     // first load turnstile
//     if (!turnstile) {
//       setTurnstile(window.turnstile);
//     }

//     // render turnstile
//     const _id = window.turnstile.render("#comment-turnstile-widget", {
//       sitekey: NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
//       theme: "dark",
//       callback: (token: string) => setTokenAction(token),
//       "error-callback": (e) => {
//         console.error("Turnstile error occurred: ", e);
//       },
//       "expired-callback": () => {
//         console.warn("Turnstile token expired");
//         setTokenAction("");
//       },
//     });

//     setWidgetIsLoaded(true);
//   }, [isWidgetLoaded, setTokenAction, turnstile]);

//   useEffect(() => {
//     if (!isScriptReady) {
//       return;
//     }

//     if (window.turnstile && !isWidgetLoaded) {
//       initTurnstile();
//     }

//     // clean
//     return () => {
//       if (window.turnstile) {
//         delete window.turnstile;
//       }
//       setWidgetIsLoaded(false);
//     };
//   }, [initTurnstile, isWidgetLoaded, isScriptReady]);

//   // debug
//   useEffect(() => {
//     console.log("Turnstile: ", window.turnstile);
//   }, [isWidgetLoaded, isScriptReady]);

//   // Expose reset method to the parent component through ref
//   useImperativeHandle(ref, () => {
//     return {
//       reset() {
//         if (!window.turnstile) {
//           window.turnstile = turnstile;
//         }
//         if (isScriptReady && isWidgetLoaded) {
//           window.turnstile?.reset();
//         }
//         window.turnstile = undefined;
//       },
//     };
//   }, [isScriptReady, isWidgetLoaded, turnstile]);

//   return (
//     <>
//       <Script
//         async
//         defer
//         src="https://challenges.cloudflare.com/turnstile/v0/api.js"
//         strategy="lazyOnload"
//         onLoad={() => {
//           setIsScriptReady(true);
//         }}
//       />

//       <div id="comment-turnstile-widget" />
//     </>
//   );
// }
