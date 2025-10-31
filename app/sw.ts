// import { defaultCache } from "@serwist/next/worker";
// import {
//   type PrecacheEntry,
//   type RuntimeCaching,
//   Serwist,
//   type SerwistGlobalConfig,
// } from "serwist";

// declare global {
//   interface WorkerGlobalScope extends SerwistGlobalConfig {
//     __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
//   }
// }

// declare const self: ServiceWorkerGlobalScope;

// // the last rule will disable all cross site request
// // so, we need to change it
// const customCache: RuntimeCaching[] = defaultCache;
// const lastCache = customCache.at(-1);

// if (lastCache) {
//   // allow Turnstile to pass through
//   lastCache.matcher = ({ url, sameOrigin }) => {
//     if (url.origin === "https://challenges.cloudflare.com") {
//       return false;
//     }

//     return !sameOrigin;
//   };

//   // use the new rule
//   customCache.pop();
//   customCache.push(lastCache);
// }

// const serwist = new Serwist({
//   precacheEntries: self.__SW_MANIFEST,
//   skipWaiting: true,
//   clientsClaim: true,
//   navigationPreload: true,
//   runtimeCaching: customCache,
// });

// serwist.addEventListeners();
