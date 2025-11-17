import CapServer, { type ChallengeData } from "@cap.js/server";

import { cacheDelete, cacheGet, cacheSet } from "@/lib/cache";

// cap server side processor, process the captcha request at frontend
export const capServer = new CapServer({
  disableAutoCleanup: true,
  noFSState: true,
  storage: {
    challenges: {
      store: async (token, challengeData) => {
        await cacheSet(`cap:challenges:${token}`, challengeData);
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
        await cacheSet(`cap:tokens:${tokenKey}`, expires);
      },
      get: async (tokenKey) => {
        const data = await cacheGet<number>(`cap:tokens:${tokenKey}`);
        if (data && data <= Date.now()) {
          return data;
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
