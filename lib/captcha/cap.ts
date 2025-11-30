import CapServer, { type ChallengeData } from "@cap.js/server";

import { cacheDelete, cacheGet, cacheSet } from "@/lib/cache";

// cap server side processor, process the captcha request at frontend
export const capServer = new CapServer({
  disableAutoCleanup: true,
  noFSState: true,
  storage: {
    challenges: {
      store: async (token, challengeData) => {
        await cacheSet<ChallengeData>(`cap:challenges:${token}`, challengeData);
      },
      read: async (token) => {
        return await cacheGet<ChallengeData>(`cap:challenges:${token}`);
      },
      delete: async (token) => {
        await cacheDelete(`cap:challenges:${token}`);
      },
      deleteExpired: async () => {}, // expired automatically
    },
    tokens: {
      store: async (tokenKey, expires) => {
        await cacheSet<number>(`cap:tokens:${tokenKey}`, expires);
      },
      get: async (tokenKey) => {
        const expires = await cacheGet<number>(`cap:tokens:${tokenKey}`);
        if (expires && expires >= Date.now()) {
          return expires;
        }
        return null;
      },
      delete: async (tokenKey) => {
        await cacheDelete(`cap:tokens:${tokenKey}`);
      },
      deleteExpired: async () => {},
    },
  },
});
