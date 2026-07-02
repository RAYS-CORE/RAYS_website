# RAYS Foundation Website

Official marketing site for [RAYS Foundation](https://github.com/RAYS-CORE) — free AI for everyone, crowdfunded compute, and the open-source [RAYS Agent](https://github.com/RAYS-CORE/RAYS-CORE).

Built with [TanStack Start](https://tanstack.com/start), React, Tailwind CSS, and Vite.

## Live preview (after deploy)

Once pushed to GitHub and Pages is enabled, the site will be available at:

**https://rays-core.github.io/RAYS_website/**

Later, you can attach a custom domain in GitHub Pages settings so the URL shows your own domain instead of `github.io`.

## Local development

```bash
npm install
npm run dev
```

Open **http://localhost:8080** in your browser.

## Production build (GitHub Pages)

```bash
npm run build
```

This prerenders a static site into `dist/client/` with the `/RAYS_website/` base path used by GitHub Pages project sites.

Preview the static build locally:

```bash
npm run preview:static
```

Then open **http://localhost:4173/RAYS_website/** (note the repo path prefix).

## Deploy to GitHub Pages

1. Push this repo to `https://github.com/RAYS-CORE/RAYS_website.git`
2. In the repo on GitHub: **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **GitHub Actions**
4. Push to the `main` branch — the workflow in `.github/workflows/deploy.yml` builds and publishes automatically

## Downloads & demo

- **RAYS Studio** installers point at GitHub Releases on `RAYS-CORE/RAYS-CORE`
- **Demo video** is embedded from YouTube (keeps the repo small; GitHub is not used for the 384 MB video file)
- **Patreon** links to the RAYS Foundation creator page

## Project structure

```
src/
  routes/          File-based pages (home, agent, docs)
  components/      Shared UI (nav, docs layout, 3D background)
  assets/          Image assets
  lib/site.ts      External URLs (GitHub org, Patreon, YouTube)
public/            Static files copied to the build output
```

## License

MIT — see [LICENSE](./LICENSE).
