import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../site';
import { path } from '../routes';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const siteUrl = new URL(path('/'), context.site!).toString();

  return rss({
    title: site.name,
    description: site.description,
    site: siteUrl,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: path(`/blog/${post.id}/`),
    })),
  });
}
