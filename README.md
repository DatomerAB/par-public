# Pär Public Landing Page

This is the customer-facing repository for [Pär](https://par.app). It contains only the public landing page, assets, and the GitHub Pages deployment workflow.

## What's here

- `index.html` — public marketing page
- `assets/landing/` — styles, scripts, icons, and images
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
