import { Redis } from "@upstash/redis";
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Vercel's Redis/KV integration provisions KV_REST_API_* vars; fall back to
// the Upstash-native UPSTASH_REDIS_REST_* names if those are set instead.
const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN!,
});
const KEY = "visitor-count";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const count = await redis.incr(KEY);
    return res.json({ count });
  }

  const count = (await redis.get<number>(KEY)) ?? 0;
  return res.json({ count });
}