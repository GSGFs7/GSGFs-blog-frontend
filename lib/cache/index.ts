import { CacheInterface } from "@/types/cache";

export const CacheTTL = 60 * 30; // 30 minutes

let cacheModule: CacheInterface;

if (process.env.CF) {
  cacheModule = require("./cloudflare-KV") as CacheInterface;
} else {
  cacheModule = require("./momento") as CacheInterface;
}

export const cacheGet = cacheModule.cacheGet;
export const cacheSet = cacheModule.cacheSet;
export const cacheDelete = cacheModule.cacheDelete;
export const flushCache = cacheModule.flushCache;

export default cacheModule;
