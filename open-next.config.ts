import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import R2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import DOQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import D1NextModeTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";

export default defineCloudflareConfig({
  incrementalCache: R2IncrementalCache,
  queue: DOQueue,
  tagCache: D1NextModeTagCache,
});
