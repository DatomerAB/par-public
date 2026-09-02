# Pär → par-public Sync

## What we receive from Pär

- `NOTICE.md` → `docs/NOTICE.md`
- Brand icons from `DatomerAB/datomer.eu`
- DMG URL via `repository_dispatch` event `release-published`

## Workflows

- `update-download-url.yml` — handles `release-published` dispatch.
- `check-par-sync.yml` — weekly validates `NOTICE.md` matches Pär.
- `static.yml` — deploys GitHub Pages.

## Source of truth

- `NOTICE.md`: `DatomerAB/Par/NOTICE.md`
- Download URL: `DatomerAB/Par` release payload `dmg_url`
- Icons: `DatomerAB/datomer.eu`

## If you change this repo

- Do not hardcode DMG URLs. Use `assets/landing/config.json`.
- Do not edit `docs/NOTICE.md` manually; it will be overwritten.
- If the landing page shape changes, update `update-download-url.yml`.

## Change impact checklist

- [ ] If the dispatch payload from Pär changes, update `update-download-url.yml`
      and this file.
- [ ] If the landing page consumes new data, document the source in
      `CROSS_REPO_DEPENDENCIES.md` (create if missing).
