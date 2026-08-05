import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Shared content queries.
 *
 * Two rules live here so that no page has to remember them:
 *   - Draft entries never appear in the built site.
 *   - Sort order is defined once per collection, not per page.
 */

const published = <T extends { data: { draft?: boolean } }>(entries: T[]) =>
  entries.filter((e) => !e.data.draft);

/** Newest first, drafts removed. */
export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = published(await getCollection('blog'));
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Highest `order` first, then newest. */
export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = published(await getCollection('projects'));
  return projects.sort((a, b) => {
    if (b.data.order !== a.data.order) return b.data.order - a.data.order;
    return (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0);
  });
}

/** Current roles first, then by `order` descending. */
export async function getExperience(): Promise<CollectionEntry<'experience'>[]> {
  const roles = await getCollection('experience');
  return roles.sort((a, b) => {
    if (a.data.current !== b.data.current) return a.data.current ? -1 : 1;
    return b.data.order - a.data.order;
  });
}

/** Highest `order` first, then newest. */
export async function getAlbums(): Promise<CollectionEntry<'albums'>[]> {
  const albums = published(await getCollection('albums'));
  return albums.sort((a, b) => {
    if (b.data.order !== a.data.order) return b.data.order - a.data.order;
    return (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0);
  });
}

/** The cover to show for an album: the explicit one, else its first photo. */
export function albumCover(album: CollectionEntry<'albums'>): string | undefined {
  return album.data.cover || album.data.photos[0]?.image;
}

/** e.g. "14 June 2025". Kept in one place so every page agrees. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** e.g. "Mar 2024 — Present" */
export function formatRange(start: string, end?: string, current?: boolean): string {
  return `${start} — ${current || !end ? 'Present' : end}`;
}

/** Rough reading time, at a deliberately unhurried 200 words per minute. */
export function readingTime(body = ''): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
