# Photo manifest

The contract between **Pothos** (which publishes photos) and the **/photos** page on kathas.no (which shows them).

Pothos uploads the green-tagged photos plus a `manifest.json` to a Cloudflare R2 bucket. The site fetches the manifest at runtime, so new photos show up without a redeploy.

## Bucket layout

```
manifest.json          at the bucket root
photos/<id>.jpg        full size, shown in the lightbox
thumbs/<id>.jpg        small, shown in the grid
```

`file` and `thumb` in the manifest are paths relative to the bucket root. The site resolves them against `VITE_PHOTOS_BASE_URL`.

## manifest.json

```json
{
  "updated": "2026-11-25T14:00:00+09:00",
  "trips": [
    { "id": "nagoya", "name": "Nagoya", "start": "2026-09-01", "end": "2027-05-31" },
    { "id": "chengdu", "name": "Chengdu", "start": "2027-03-03", "end": "2027-03-10" }
  ],
  "photos": [
    {
      "id": "nagoya-001",
      "file": "photos/nagoya-001.jpg",
      "thumb": "thumbs/nagoya-001.jpg",
      "takenAt": "2026-11-20T15:32:00+09:00",
      "trip": "nagoya",
      "width": 1440,
      "height": 1080,
      "caption": { "ja": "寒いね", "en": "It's cold, huh" }
    }
  ]
}
```

### Fields

| Field | Required | Notes |
| --- | --- | --- |
| `updated` | yes | ISO 8601 with offset. Shown as "Last updated" under the gallery. |
| `trips[].id` | yes | Unique. Referenced by `photos[].trip`. |
| `trips[].name` | yes | Heading shown above the trip's photos. |
| `trips[].start`, `trips[].end` | yes | `YYYY-MM-DD`, both days included. |
| `photos[].id` | yes | Unique. Also a good file name. |
| `photos[].file`, `photos[].thumb` | yes | Paths relative to the bucket root. |
| `photos[].takenAt` | yes | ISO 8601 **with the local offset** where the photo was taken. The site shows the date part as is. |
| `photos[].width`, `photos[].height` | yes | Pixel size of the image as it should be displayed (after rotation). Used to reserve space so the page doesn't jump. |
| `photos[].trip` | no | A trip `id`. Missing or unknown means the photo goes in an "Other" group at the end. |
| `photos[].caption` | no | `{ "ja"?, "en"? }`, at least one. Only a few photos will have one. |

### Trip assignment (Pothos, at publish time)

A photo belongs to the trip whose date range contains the local date of `takenAt`. If several ranges match, **the shortest range wins**, so a side trip (Chengdu) beats the long stay (Nagoya) it falls inside.

### Images

- Bake EXIF rotation into the pixels, or at least make `width` and `height` match how the photo is displayed. The site doesn't read EXIF.
- JPG. Thumbnails around 480 to 600 px on the long side.
- Never reuse a file name for different pixels (images are cached for a year, see below). If a photo is re-edited, give it a new name.

### Upload order

Upload images first and `manifest.json` last, so the site never points at files that aren't there yet.

## How the site uses it

- Code: `src/lib/photos.js` (types, validation, grouping), `src/lib/usePhotoManifest.js` (fetch), `src/pages/PhotosPage.jsx`.
- Photos are shown newest first (by `takenAt`) within each trip, and the trip with the newest photo comes first.
- Bad trips or photos (missing fields, bad dates, duplicate ids) are skipped with a console warning. The page only shows an error if the manifest can't be fetched or isn't an object with a `photos` array.
- Captions show inside the photo like a subtitle. Japanese first; English on hover or tap.

## Infra setup (not done yet)

### 1. Public access

Give the bucket a public URL in the Cloudflare dashboard (R2 > bucket > Settings):

- **Custom domain** (recommended), for example `photos.kathas.no`. Needs the kathas.no zone on Cloudflare DNS. Gets Cloudflare's CDN cache.
- **r2.dev subdomain**: quick for testing, but rate limited and not meant for production.

Current choice: **r2.dev**. kathas.no DNS lives at Domeneshop (hyp.net), not Cloudflare, so a custom domain would mean moving DNS (MX for email, Vercel, the `projects` GitHub Pages record) first. Switching later only means changing `VITE_PHOTOS_BASE_URL`, since manifest paths are relative.

### 2. CORS

The page fetches `manifest.json` with `fetch()`, so the bucket must allow it. Images load through `<img>` and don't need CORS. R2 > bucket > Settings > CORS policy:

```json
[
  {
    "AllowedOrigins": ["https://kathas.no", "https://www.kathas.no", "http://localhost:5173"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

Add a Vercel preview origin too if you want previews to load real photos.

### 3. Cache-Control

Set it as object metadata when Pothos uploads (`CacheControl` on the S3 `PutObject` call):

| Object | Cache-Control |
| --- | --- |
| `manifest.json` | `public, max-age=60` |
| `photos/*`, `thumbs/*` | `public, max-age=31536000, immutable` |

### 4. Env variable

Set `VITE_PHOTOS_BASE_URL` to the bucket's public URL, without a trailing slash (for example `https://photos.kathas.no`):

- In Vercel: Project > Settings > Environment Variables, then redeploy (Vite bakes it in at build time).
- Locally, in `.env.local` (gitignored), if you want dev to use the real bucket.

Without it, `npm run dev` uses the sample bucket in `public/sample-photos/`, and a production build shows "No photos here yet".
