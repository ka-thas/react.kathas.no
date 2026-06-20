// Quick Redis connectivity check.
// Run: node --env-file=.env.local api/_test-redis.mjs
import { Redis } from "@upstash/redis";

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  console.error("✗ Missing Redis env vars (KV_REST_API_URL / KV_REST_API_TOKEN).");
  process.exit(1);
}

const redis = new Redis({ url, token });

try {
  const pong = await redis.ping();
  const before = (await redis.get("visitor-count")) ?? 0;
  const after = await redis.incr("test:_smoke");
  const ttl = await redis.expire("test:_smoke", 60); // auto-clean the test key

  console.log("✓ Connected to Redis");
  console.log("  ping            :", pong);
  console.log("  visitor-count   :", before);
  console.log("  test:_smoke incr:", after, ttl ? "(expires in 60s)" : "");
  process.exit(0);
} catch (err) {
  console.error("✗ Redis call failed:", err?.message ?? err);
  process.exit(1);
}
