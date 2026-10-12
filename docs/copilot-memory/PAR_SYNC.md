# Pär → par-public Sync

## What we receive from Pär

- `NOTICE.md` → `docs/NOTICE.md`
- Brand icons from `DatomerAB/datomer.eu`
- Beta installer catalog from `DatomerAB/par-releases/downloads.json`, announced by `release-published` with `client_payload.download_catalog_url`
- Legacy single-DMG URL through `client_payload.dmg_url` when no catalog URL is present

## Workflows

- `update-beta-downloads.yml` — accepts catalog events, validates the catalog and installer URLs, updates the verified `config.json` snapshot, tests/builds, commits, explicitly dispatches `static.yml`, and verifies the deployed revision.
- `update-download-url.yml` — handles legacy `release-published` events without `download_catalog_url`; catalog events are skipped so the single-DMG update cannot overwrite catalog state.
- `check-par-sync.yml` — weekly validates `NOTICE.md` matches Pär.
- `static.yml` — deploys GitHub Pages on `main` pushes or explicit dispatch; the catalog receiver explicitly dispatches it after its bot commit.

## Source of truth

- `NOTICE.md`: `DatomerAB/Par/NOTICE.md`
- Beta installers and presentation metadata: `DatomerAB/par-releases/downloads.json`
- Legacy single-DMG URL: `DatomerAB/Par` release payload `dmg_url`
- Deployed fallback snapshot: `assets/landing/config.json`
- Icons: `DatomerAB/datomer.eu`

## If you change this repo

- Do not hardcode installer URLs or platform labels. Use the validated catalog; `config.json` contains its verified fallback snapshot.
- Do not edit `docs/NOTICE.md` manually; it will be overwritten.
- Preserve exact canonical release-asset URL validation when changing catalog handling.

## Change impact checklist

- [ ] If Pär's dispatch payload changes, update the matching beta or legacy receiver, its tests, and this file.
- [ ] If the catalog schema or metadata contract changes, update `Pär/docs/copilot-memory/CROSS_REPO_CONTRACTS.md` and `Pär/docs/copilot-memory/DEPENDENCY_MAP.md`.
