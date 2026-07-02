// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const githubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/RAYS_website";

export default defineConfig({
  // Static prerender for GitHub Pages; local dev stays at `/`.
  nitro: false,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    ...(githubPages
      ? {
          router: { basepath: repoBasePath },
          prerender: {
            enabled: true,
            crawlLinks: true,
            failOnError: true,
          },
          spa: { enabled: true },
        }
      : {}),
  },
  vite: {
    base: githubPages ? `${repoBasePath}/` : "/",
  },
});
