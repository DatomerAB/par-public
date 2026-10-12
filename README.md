# par-public — Pär download & legal fallback

This is the lightweight public fallback site for [Pär](https://datomer.eu). It is hosted on GitHub Pages and serves as a resilient download and legal-attribution mirror for the product.

**datomer.eu is the canonical marketing site.** This repository intentionally does *not* duplicate product features, pricing, FAQ, or blog content. All marketing content lives at [https://datomer.eu](https://datomer.eu).

## What's here

- `index.html` — minimal download & legal landing page
- `assets/landing/` — styles, scripts, icons, and images
- `docs/NOTICE.md` — third-party open-source model attribution (auto-synced)
- `.github/workflows/static.yml` — GitHub Pages deployment
- `.github/workflows/check-par-sync.yml` — validates `NOTICE.md` stays in sync

## What's NOT here

All source code, models, build scripts, documentation, signing keys, and license infrastructure live in the private `Pär` repository. Signed releases are published to a separate public releases repository.

## Local preview

```bash
python3 -m http.server 8000
```

Open http://localhost:8000.

## Deploy

Push to the `main` branch. GitHub Actions will deploy to Pages automatically.

## Beta downloads

`downloads.json` in `DatomerAB/par-releases` is the source of truth for beta installers and their platform/variant presentation metadata. The landing page renders available catalog entries dynamically and validates installer URLs against immutable release assets.

`.github/workflows/update-beta-downloads.yml` validates the catalog and its assets, updates `assets/landing/config.json` with the latest verified snapshot, runs the site tests and build, commits the snapshot, explicitly deploys GitHub Pages, and verifies the deployed revision. The snapshot is the fallback if the live catalog cannot be fetched. Do not edit it by hand unless you are fixing an emergency fallback.

Legacy release dispatches without a catalog URL continue through `.github/workflows/update-download-url.yml` and update the single `downloadUrl` fallback.

## Model attribution

`docs/NOTICE.md` is kept in sync automatically by the `sync-public-content.yml` workflow in the private `Pär` repository. The canonical source is `Pär/NOTICE.md`, generated from `config/routing.yaml` by the `LicenseAttributionAgent`.

If the automated sync fails, run the following in the `Pär` repository and then trigger the `sync-public-content.yml` workflow:

```bash
python scripts/sync_attribution.py --write
```
