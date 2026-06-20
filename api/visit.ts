import { Redis } from "@upstash/redis";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const redis = Redis.fromEnv();
const KEY = "visitor-count";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const count = await redis.incr(KEY);
    return res.json({ count });
  }

  const count = (await redis.get<number>(KEY)) ?? 0;
  return res.json({ count });
}