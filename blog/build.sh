#!/usr/bin/env bash
# Builds the Quartz blog. By default into ../dist/blog for kathas.no/blog, run
# after `vite build` as part of `npm run build`. The root.kathas.no project
# (blog/vercel.json) builds the same vault as a standalone site via env vars:
#   QUARTZ_BASE_URL  site address without https://   (default kathas.no/blog)
#   QUARTZ_OUT       output folder, relative to blog/ (default ../dist/blog)
#   KATHAS_NAV=off   leave out the kathas.no navbar
# Extra args go to `quartz build`, e.g. `bash blog/build.sh --serve` for a local preview.
set -euo pipefail

QUARTZ_VERSION=v5.1.0
cd "$(dirname "$0")"
BASE_URL="${QUARTZ_BASE_URL:-kathas.no/blog}"
OUT="$(pwd)/${QUARTZ_OUT:-../dist/blog}"

# Shallow checkout of Quartz, kept in the gitignored .quartz/ and reused between builds.
if [ "$(cat .quartz/.kathas-version 2>/dev/null)" != "$QUARTZ_VERSION" ]; then
  rm -rf .quartz
  git -c advice.detachedHead=false clone --quiet --depth 1 --branch "$QUARTZ_VERSION" \
    https://github.com/jackyzha0/quartz.git .quartz
  (cd .quartz && npm ci --no-audit --no-fund --loglevel=error && npx quartz plugin install)
  echo "$QUARTZ_VERSION" > .quartz/.kathas-version
fi

# Our config (v5: YAML, plus quartz.ts for the navbar), theme overrides and favicon.
cp quartz.config.yaml quartz.ts .quartz/
# Site address for this build (the YAML holds the kathas.no/blog default).
sed -i.bak "s#^  baseUrl: .*#  baseUrl: $BASE_URL#" .quartz/quartz.config.yaml && rm -f .quartz/quartz.config.yaml.bak
grep -q "^  baseUrl: $BASE_URL\$" .quartz/quartz.config.yaml || { echo "build.sh: baseUrl not set in quartz.config.yaml" >&2; exit 1; }
cp custom.scss .quartz/quartz/styles/custom.scss
cp icon.png .quartz/quartz/static/icon.png
# Custom components, plus the nav links shared with the React navbar.
cp components/*.tsx ../src/data/navLinks.json .quartz/quartz/components/

# 404 button text (Quartz's en-GB locale; it's only used by the 404 page).
# Fails the build if a Quartz upgrade moves the string, instead of silently reverting.
LOCALE=.quartz/quartz/i18n/locales/en-GB.ts
sed -i.bak 's/home: "Return to Homepage"/home: "Back to safety"/' "$LOCALE" && rm -f "$LOCALE.bak"
grep -q 'home: "Back to safety"' "$LOCALE" || { echo "build.sh: 404 button text not patched in $LOCALE" >&2; exit 1; }

# Notes (the Obsidian vault). Quartz skips .obsidian/ and templates/ via ignorePatterns.
rm -rf .quartz/content
cp -R content .quartz/content

cd .quartz
npx quartz build -d content -o "$OUT" "$@"
