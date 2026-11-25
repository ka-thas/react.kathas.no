// Photo gallery data: parses the manifest Pothos publishes to R2 and groups the
// photos by trip. No React here, so the layouts stay swappable.
// The contract is described in docs/photos-manifest.md.

/**
 * @typedef {{ ja?: string, en?: string }} Caption
 * @typedef {{ id: string, name: string, start: string, end: string }} Trip
 * @typedef {{
 *   id: string,
 *   file: string,
 *   thumb: string,
 *   takenAt: string,
 *   trip: string,
 *   width: number,
 *   height: number,
 *   caption?: Caption,
 * }} Photo
 * @typedef {{ updated: string, trips: Trip[], photos: Photo[] }} Manifest
 * @typedef {{ trip: Trip | null, photos: Photo[] }} PhotoGroup  trip is null for "Other"
 */

const isText = (x) => typeof x === "string" && x.trim() !== "";
const isDate = (x) => isText(x) && !Number.isNaN(Date.parse(x));
const isSize = (x) => Number.isFinite(x) && x > 0;

/** @returns {Caption | undefined} */
function parseCaption(c) {
  if (!c || typeof c !== "object") return undefined;
  const caption = {};
  if (isText(c.ja)) caption.ja = c.ja.trim();
  if (isText(c.en)) caption.en = c.en.trim();
  return caption.ja || caption.en ? caption : undefined;
}

/** @returns {Trip | null} */
function parseTrip(t) {
  if (!t || !isText(t.id) || !isText(t.name) || !isDate(t.start) || !isDate(t.end)) return null;
  return { id: t.id, name: t.name, start: t.start, end: t.end };
}

/** @returns {Photo | null} */
function parsePhoto(p) {
  if (
    !p || !isText(p.id) || !isText(p.file) || !isText(p.thumb) ||
    !isDate(p.takenAt) || !isSize(p.width) || !isSize(p.height)
  ) return null;
  const photo = {
    id: p.id,
    file: p.file,
    thumb: p.thumb,
    takenAt: p.takenAt,
    trip: isText(p.trip) ? p.trip : "",
    width: p.width,
    height: p.height,
  };
  const caption = parseCaption(p.caption);
  if (caption) photo.caption = caption;
  return photo;
}

/**
 * Light runtime check of the manifest. Bad trips and photos are skipped with a
 * warning instead of breaking the page. Throws only if it isn't a manifest at all.
 * @returns {Manifest}
 */
export function parseManifest(raw) {
  if (!raw || typeof raw !== "object" || !Array.isArray(raw.photos)) {
    throw new Error("Not a photo manifest");
  }

  const keep = (list, parse, kind) => {
    const seen = new Set();
    const out = [];
    for (const entry of Array.isArray(list) ? list : []) {
      const item = parse(entry);
      if (!item || seen.has(item.id)) {
        console.warn(`photos: skipped a bad or duplicate ${kind}`, entry);
        continue;
      }
      seen.add(item.id);
      out.push(item);
    }
    return out;
  };

  return {
    updated: isDate(raw.updated) ? raw.updated : "",
    trips: keep(raw.trips, parseTrip, "trip"),
    photos: keep(raw.photos, parsePhoto, "photo"),
  };
}

const time = (d) => Date.parse(d);

/**
 * Newest trip first (by start date), newest photo first within each trip.
 * Photos whose trip isn't in the manifest end up in a last group with trip null.
 * @param {Manifest} manifest
 * @returns {PhotoGroup[]}
 */
export function groupByTrip({ trips, photos }) {
  const byId = new Map(trips.map((trip) => [trip.id, { trip, photos: [] }]));
  const other = { trip: null, photos: [] };
  for (const photo of photos) (byId.get(photo.trip) ?? other).photos.push(photo);

  const groups = [...byId.values()]
    .filter((g) => g.photos.length > 0)
    .sort((a, b) => time(b.trip.start) - time(a.trip.start));
  if (other.photos.length > 0) groups.push(other);

  for (const g of groups) g.photos.sort((a, b) => time(b.takenAt) - time(a.takenAt));
  return groups;
}

/** A manifest path ("photos/x.jpg") as a full URL under the bucket's base URL. */
export function photoUrl(base, path) {
  try {
    const url = new URL(path, new URL(`${base}/`, window.location.origin));
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

/** Alt text: the English caption if there is one, else the day it was taken. */
export function photoAlt(photo) {
  return photo.caption?.en ?? photo.caption?.ja ?? `Photo taken ${formatDay(photo.takenAt)}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Read straight from the ISO text, so it's the local day the photo was taken,
// whatever the viewer's time zone.
const ymd = (iso) => iso.slice(0, 10).split("-").map(Number);

/** "20 Nov 2026" */
export function formatDay(iso) {
  const [y, m, d] = ymd(iso);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "Sep 2026 to May 2027", or "Mar 2027" when the trip fits in one month. */
export function formatTripDates({ start, end }) {
  const month = (iso) => {
    const [y, m] = ymd(iso);
    return `${MONTHS[m - 1]} ${y}`;
  };
  const a = month(start);
  const b = month(end);
  return a === b ? a : `${a} to ${b}`;
}
