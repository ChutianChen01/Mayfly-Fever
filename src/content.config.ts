import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content model.
 *
 * Every collection below is mirrored in `.pages.yml`, which is what drives the
 * visual editor at pagescms.org. If you add a field here, add it there too —
 * otherwise the CMS will silently drop it when it re-saves a file.
 *
 * Schemas are deliberately forgiving: almost everything except a title is
 * optional, so a half-filled entry still builds instead of breaking the site.
 */

/** A single page of long-form content (currently just About). */
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    headline: z.string().optional(),
    portrait: z.string().optional(),
    location: z.string().optional(),
    /** Short punchy statements rendered as a row of cards under the intro. */
    focus: z
      .array(
        z.object({
          label: z.string(),
          description: z.string().optional(),
        }),
      )
      .default([]),
    /** Grouped skill lists, e.g. "Languages" -> [TypeScript, Python]. */
    skills: z
      .array(
        z.object({
          group: z.string(),
          items: z.array(z.string()).default([]),
        }),
      )
      .default([]),
  }),
});

/** Jobs, internships, research posts, teaching — anything CV-shaped. */
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    organisation: z.string(),
    /** Free text so "Remote", "London, UK" and "Hybrid — Berlin" all work. */
    location: z.string().optional(),
    /** Free text rather than a date: "Jan 2024" reads better than 2024-01-01. */
    start: z.string(),
    /** Leave blank and set `current: true` to render "Present". */
    end: z.string().optional(),
    current: z.boolean().default(false),
    kind: z
      .enum(['Work', 'Internship', 'Research', 'Education', 'Volunteer'])
      .default('Work'),
    summary: z.string().optional(),
    /** Bullet points. This is the part recruiters actually read. */
    highlights: z.array(z.string()).default([]),
    tech: z.array(z.string()).default([]),
    url: z.string().optional(),
    /** Higher numbers float to the top; ties fall back to start date. */
    order: z.number().default(0),
  }),
});

/** Things you built. Each one gets its own detail page. */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** One-line pitch, shown on the card. */
    blurb: z.string(),
    date: z.coerce.date().optional(),
    status: z.enum(['Active', 'Shipped', 'Archived', 'Prototype']).default('Shipped'),
    tech: z.array(z.string()).default([]),
    cover: z.string().optional(),
    repo: z.string().optional(),
    demo: z.string().optional(),
    /** Featured projects are pulled onto the home page. */
    featured: z.boolean().default(false),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

/** The blog. */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    /** Drafts are excluded from the built site entirely. */
    draft: z.boolean().default(false),
  }),
});

/** Photography, grouped into albums so uploads stay manageable. */
const albums = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/albums' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    location: z.string().optional(),
    /** Falls back to the first photo if not set. */
    cover: z.string().optional(),
    gear: z.string().optional(),
    photos: z
      .array(
        z.object({
          image: z.string(),
          /** Shown under the photo in the lightbox. */
          caption: z.string().optional(),
          /** Screen-reader description. Falls back to the caption. */
          alt: z.string().optional(),
        }),
      )
      .default([]),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, experience, projects, blog, albums };
