import { defaultCache } from "@serwist/next/worker";
import {
  PrecacheEntry,
  RuntimeCaching,
  Serwist,
  SerwistGlobalConfig,
} from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// the last rule will disable all cross site request
const customCache: RuntimeCaching[] = defaultCache;
const lastCache = customCache.at(-1);

if (lastCache) {
  lastCache.matcher = ({ url: { origin }, sameOrigin }) => {
    if (origin === "https://challenges.cloudflare.com") {
      return false;
    }

    return !sameOrigin;
  };

  customCache.pop();
  customCache.push(lastCache);
}

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: customCache,
});

serwist.addEventListeners();
