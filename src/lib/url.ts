/**
 * Link and asset helpers.
 *
 * The site is served from a subpath (`/Mayfly-Fever`) on GitHub Pages, which
 * means a bare `href="/about"` would 404. Astro does not rewrite these
 * automatically, so every internal link goes through `url()` and every
 * uploaded file through `asset()`.
 *
 * Both read `import.meta.env.BASE_URL`, so changing `base` in astro.config.mjs
 * (for a custom domain, say) is all that is needed to move the whole site.
 */

const BASE = import.meta.env.BASE_URL;

/** Join the configured base path with an internal path. `url('/blog')` -> `/Mayfly-Fever/blog` */
export function url(path = '/'): string {
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const rest = path.startsWith('/') ? path : `/${path}`;
  return `${base}${rest}` || '/';
}

/**
 * Resolve a path stored in content (e.g. `/media/photo.jpg`, written by the
 * CMS) to a URL the browser can fetch. External URLs are passed through
 * untouched so you can also paste in a link to an image hosted elsewhere.
 */
export function asset(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return url(path);
}

/** Absolute URL, for OpenGraph tags and RSS. */
export function absolute(path: string, site: URL | undefined): string {
  const rel = url(path);
  return site ? new URL(rel, site).href : rel;
}
