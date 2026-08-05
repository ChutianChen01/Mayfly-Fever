// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

// ---------------------------------------------------------------------------
// Where the site lives.
//
// Right now this is a GitHub Pages *project* site, so it is served from a
// subpath: https://chutianchen01.github.io/Mayfly-Fever
//
// If you later move to a root site (rename the repo to
// ChutianChen01.github.io) or to a custom domain, change these two values and
// nothing else — every internal link and asset goes through the helpers in
// src/lib/url.ts, which read `base` at build time.
// ---------------------------------------------------------------------------
const SITE = 'https://chutianchen01.github.io';
const BASE = '/Mayfly-Fever';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // Emit /about/index.html rather than /about.html so URLs stay clean.
    format: 'directory',
  },
  vite: {
    // Lets us `import site from '../data/site.yml'` so site-wide settings can
    // live in a file that is pleasant to edit by hand on github.com.
    plugins: [yaml()],
  },
});
