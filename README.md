# Mayfly-Fever

Personal site — introduction, experience, projects, writing, and photography.
Dark sci-fi theme, statically generated, deployed to GitHub Pages on every push.

**Live at:** https://chutianchen01.github.io/Mayfly-Fever

---

## First-time setup

Three things, once. Steps 1 and 2 are required; step 3 is what gives you the
visual editor.

### 1. Push this repository

```bash
git add -A
git commit -m "Build personal website"
git push origin main
```

### 2. Turn on GitHub Pages

1. Go to **Settings → Pages** in this repository.
2. Under **Source**, choose **GitHub Actions**.

That is the whole configuration. The workflow in
`.github/workflows/deploy.yml` handles the rest, and the first deploy starts
as soon as you push. Watch it under the **Actions** tab; it takes about a
minute.

### 3. Connect the visual editor

1. Go to **https://app.pagescms.org** and sign in with GitHub.
2. Grant it access to this repository (you can limit it to just this one).
3. Open the project.

It reads `.pages.yml` from this repo and builds an editing interface from it.
No configuration on their side, and nothing to deploy.

> **Bookmark the editor on your phone.** Publishing from a train was the whole
> point of setting it up this way.

---

## Editing your site

Everything below is editable from the CMS. Save there and it commits to this
repository, which triggers a rebuild — your change is live in a minute or two.

| In the editor | What it changes | Underlying file |
| --- | --- | --- |
| **Site settings** | Name, tagline, contact links, home page hero | `src/data/site.yml` |
| **About page** | Your bio, skills, focus areas | `src/content/pages/about.md` |
| **Experience** | Jobs, internships, education | `src/content/experience/*.md` |
| **Projects** | Projects and tools, one page each | `src/content/projects/*.md` |
| **Blog posts** | Your writing | `src/content/blog/*.md` |
| **Photo albums** | Photography, grouped into albums | `src/content/albums/*.md` |

**You are never locked in.** Every one of those is a plain Markdown or YAML
file. If Pages CMS is ever down or you would rather not use it, click any file
on github.com and hit the pencil icon — same result, same deploy.

### Drafts

Projects, posts, and albums all have a **Draft** toggle. Ticking it removes
that entry from the published site entirely, so you can leave something
half-written without it appearing.

### Photographs

Upload from the **Photos** field inside an album. A few notes:

- **Resize before uploading.** Images are served as-is, so a 12&nbsp;MB camera
  JPEG will be a 12&nbsp;MB download. Export at roughly **2000px on the long
  edge, quality 80** — visually identical on a screen, a fraction of the size.
- **Alt text** is worth filling in. It is what screen readers announce and what
  shows if an image fails to load. It falls back to the caption if left blank.
- Clicking a photo opens a full-screen viewer with arrow-key navigation.

### The placeholder content

This repo ships with example entries so you can see the layout working. Before
launching, replace or delete:

- The three projects in `src/content/projects/`
- The three roles in `src/content/experience/`
- The two posts in `src/content/blog/`
- The two albums in `src/content/albums/` and the four `test-*.jpg` files in
  `public/media/`
- Your real email and LinkedIn URL in `src/data/site.yml`

Deleting entries is safe — every page has an empty state and will not break.

---

## Privacy

This is a public site, and it is built to stay that way safely:

- **No phone number, no home address** anywhere in the content model. There are
  no fields for them, so they cannot be added by accident.
- **Location is region-level** — "United Kingdom", not a street.
- **Your email is lightly obfuscated.** It is never written into the HTML as a
  plain `mailto:` link; the address is reassembled in the browser. This stops
  the naive scrapers rather than every scraper, and it stays readable and
  clickable for real visitors.
- **No analytics, no trackers, no third-party requests.** Fonts are served from
  your own domain, not from Google.

---

## Local development

Only needed if you want to change the design. Editing content does not require
any of this.

```bash
npm install
npm run dev      # http://localhost:4321/Mayfly-Fever
npm run build    # production build into dist/
npm run preview  # serve the built site
npm run check    # type-check
```

Requires Node 20 or newer.

---

## How it is put together

| | |
| --- | --- |
| Framework | [Astro](https://astro.build) — static HTML, no client framework |
| Styling | Hand-written CSS with custom properties (`src/styles/global.css`) |
| Content | Markdown + YAML, typed by Zod schemas in `src/content.config.ts` |
| Editor | [Pages CMS](https://pagescms.org), configured by `.pages.yml` |
| Hosting | GitHub Pages via GitHub Actions |

```
src/
├── content.config.ts     Content schemas — the shape of every entry
├── data/site.yml         Site-wide settings
├── content/              Your actual content
│   ├── pages/about.md
│   ├── experience/
│   ├── projects/
│   ├── blog/
│   └── albums/
├── layouts/Base.astro    HTML shell, meta tags, scroll reveal
├── components/           Header, Footer, Vortex backdrop, cards, Lightbox
├── lib/                  Content queries, formatting, URL helpers
├── pages/                One file per route
└── styles/global.css     The design system
```

The only JavaScript shipped to the browser is the mobile menu, the photo
lightbox, the email de-obfuscator, and a scroll-reveal observer. Every one of
them degrades gracefully: with JS disabled the nav is still fully visible,
photos open as normal image links, the email is readable as `you [at]
example.com`, and all content is shown immediately.

### Two things to know if you edit the code

**1. Internal links must go through the `url()` helper.**

The site is served from a subpath (`/Mayfly-Fever`), so a bare `href="/about"`
would 404. Use:

```astro
import { url, asset } from '../lib/url';

<a href={url('/about')}>About</a>          <!-- internal links -->
<img src={asset(photo.image)} />           <!-- uploaded media -->
```

**2. Schemas live in two places and must agree.**

`src/content.config.ts` (what the site expects) and `.pages.yml` (what the
editor offers) describe the same data. Add a field to one and you must add it
to the other, or the CMS will silently drop it the next time it saves.

### Moving to a custom domain later

Change `SITE` and `BASE` at the top of `astro.config.mjs` — for a root domain,
set `BASE` to `'/'`. Because every link and asset path goes through the helpers
above, nothing else needs touching. Then add a `CNAME` file in `public/` with
your domain and point your DNS at GitHub Pages.

---

## Colour and design notes

The theme is built on two accents against a near-black backdrop:

- **Cyan `#22d3ee`** is structural — links, borders, focus rings, active nav.
- **Amber `#f0a020`** is for emphasis — primary buttons, current role, dates.

They are never used on the same element; that restraint is what keeps it
reading as designed rather than decorated. All text colours clear WCAG AA
contrast against the brightest part of the animated backdrop, and the whole
vortex animation switches off under `prefers-reduced-motion`.
