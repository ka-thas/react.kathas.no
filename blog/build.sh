#!/usr/bin/env bash
# Builds the Quartz blog into ../dist/blog (served at kathas.no/blog).
# Runs after `vite build` as part of `npm run build`.
# Extra args go to `quartz build`, e.g. `bash blog/build.sh --serve` for a local preview.
set -euo pipefail

QUARTZ_VERSION=v5.1.0
cd "$(dirname "$0")"

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
cp custom.scss .quartz/quartz/styles/custom.scss
cp icon.png .quartz/quartz/static/icon.png
# Custom components, plus the nav links shared with the React navbar.
cp components/*.tsx ../src/data/navLinks.json .quartz/quartz/components/

# Notes (the Obsidian vault). Quartz skips .obsidian/ and templates/ via ignorePatterns.
rm -rf .quartz/content
cp -R content .quartz/content

cd .quartz
npx quartz build -d content -o ../../dist/blog "$@"
