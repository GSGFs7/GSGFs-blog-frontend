import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import DOQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import DOShardedTagCache from "@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache";

export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: DOQueue,
  tagCache: DOShardedTagCache({ baseShardSize: 12, regionalCache: true }),
});
