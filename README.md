# Pär Public Landing Page

This is the customer-facing repository for [Pär](https://par.app). It contains only the public landing page, assets, and the GitHub Pages deployment workflow.

## What's here

- `index.html` — public marketing page
- `assets/landing/` — styles, scripts, icons, and images
- `docs/NOTICE.md` — third-party open-source model attribution
- `.github/workflows/static.yml` — GitHub Pages deployment

## What's NOT here

All source code, models, build scripts, documentation, signing keys, and license infrastructure live in the private `Pär` repository. Signed releases are published to a separate public releases repository.

## Local preview

```bash
python3 -m http.server 8000
```

Open http://localhost:8000.

## Deploy

Push to the `main` branch. GitHub Actions will deploy to Pages automatically.

## Update the download link

Edit `assets/landing/config.json` and set `downloadUrl` to the signed DMG asset URL.

## Update model attribution

Model attributions are generated from the canonical model catalog in the private `Pär` repository (`config/routing.yaml`) by the `LicenseAttributionAgent`. When models change:

1. Run `python scripts/sync_attribution.py --write` in the `Pär` repository to regenerate `NOTICE.md` and `legal/` license texts.
2. Copy the model table in `docs/NOTICE.md` from the generated `NOTICE.md` or from [https://datomer.eu/models](https://datomer.eu/models).
3. Update `index.html` footer link if needed.
4. Commit and push to `main` to redeploy GitHub Pages.
