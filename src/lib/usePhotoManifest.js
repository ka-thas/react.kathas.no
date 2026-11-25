import { useEffect, useState } from "react";
import { applyCaptions, groupByTrip, parseManifest } from "./photos";
import { noteCaptions } from "./photoCaptions";

// Where Pothos publishes: the R2 bucket's public URL (set in Vercel and .env.local).
// In dev the bucket goes through the dev server's /photos-bucket proxy (vite.config.js),
// so any localhost port works; without the variable, dev uses public/sample-photos/.
const envBase = (import.meta.env.VITE_PHOTOS_BASE_URL ?? "").trim().replace(/\/+$/, "");
export const PHOTOS_BASE = import.meta.env.DEV
  ? envBase ? "/photos-bucket" : "/sample-photos"
  : envBase;

/**
 * Fetches and groups the photo manifest at runtime, so new photos show up
 * without a redeploy.
 * status: "loading" | "ready" | "error". `retry` fetches again.
 */
export function usePhotoManifest() {
  const [state, setState] = useState({ status: "loading", groups: [], updated: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // Not set up yet (production without the env variable): an empty gallery.
    if (!PHOTOS_BASE) {
      setState({ status: "ready", groups: [], updated: "" });
      return;
    }

    const controller = new AbortController();
    setState((s) => ({ ...s, status: "loading" }));

    fetch(`${PHOTOS_BASE}/manifest.json`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`manifest.json: HTTP ${res.status}`);
        return res.json();
      })
      .then((raw) => {
        const manifest = applyCaptions(parseManifest(raw), noteCaptions);
        setState({ status: "ready", groups: groupByTrip(manifest), updated: manifest.updated });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("photos:", error);
        setState({ status: "error", groups: [], updated: "" });
      });

    return () => controller.abort();
  }, [attempt]);

  return { ...state, base: PHOTOS_BASE, retry: () => setAttempt((n) => n + 1) };
}
