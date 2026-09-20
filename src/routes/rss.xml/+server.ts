import type { BlogpostSummary } from "$lib/domain/blogpost/blogpost";
import { getBlogposts } from "$lib/domain/blogpost/blogpostController";

export const prerender = true;

// Header options
const responseInit : ResponseInit =
{
    headers : 
    {
      'Cache-Control': `max-age=0, s-max-age=${600}`,
      'Content-Type': 'application/xml',
    }
}



export async function GET() 
{
  const items = getBlogposts().map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${linkFor(post)}</link>
      <guid isPermaLink="true">${linkFor(post)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(`${post.date.slice(0, 4)}-${post.date.slice(4, 6)}-${post.date.slice(6, 8)}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`).join('');

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <atom:link href="https://www.jefmeijvis.com/rss.xml" rel="self" type="application/rss+xml" />
    <title>Jef Meijvis</title>
    <link>https://www.jefmeijvis.com</link>
    <language>en</language>
    <description>Blogging about secure software development, .NET, Azure and Svelte.</description>${items}
  </channel>
</rss>`;
  return new Response(body, responseInit);
}

function linkFor(post: BlogpostSummary) {
  return `https://www.jefmeijvis.com/blog/${post.path}`;
}

function escapeXml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
