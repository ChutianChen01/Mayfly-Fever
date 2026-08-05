import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../lib/site';
import { url } from '../lib/url';
import { getPosts } from '../lib/content';

/** RSS feed for the blog, served at /rss.xml. */
export async function GET(context: APIContext) {
  const posts = await getPosts();

  return rss({
    title: `${site.name} — Writing`,
    description: site.description,
    // context.site is the bare origin from astro.config.mjs, so the base path
    // has to be joined on or the channel link points at the wrong place.
    site: context.site ? new URL(import.meta.env.BASE_URL, context.site).href : '/',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? '',
      pubDate: post.data.date,
      categories: post.data.tags,
      // Must include the base path, or every feed link 404s.
      link: url(`/blog/${post.id}`),
    })),
    customData: '<language>en-gb</language>',
  });
}
