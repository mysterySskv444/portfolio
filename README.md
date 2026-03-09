# Sharma Sujeet Portfolio

A modern, responsive developer portfolio website with dark/light mode, glassmorphism styling, smooth scroll animations, and TypeScript-powered interactivity.

## Tech
- HTML5 + modern CSS (Grid/Flexbox)
- TypeScript + vanilla DOM APIs
- esbuild for bundling/minification
- GitHub Actions for GitHub Pages deployment

## Run locally
```bash
./start.sh
```

## Build
```bash
./build.sh
```

## Deploy and host on GitHub Pages
### One-time GitHub setup
1. Push this repository to GitHub.
2. In repository **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Ensure default branch is `main`.

### Automatic hosting (recommended)
Every push to `main` runs `.github/workflows/deploy.yml` and publishes `dist/` to GitHub Pages.

### Manual deployment from local machine
```bash
./deploy.sh
```

## Project structure
```
portfolio/
  src/
    components/
    scripts/
    styles/
  assets/
    images/
    icons/
  pages/
  index.html
  main.ts
  package.json
```
