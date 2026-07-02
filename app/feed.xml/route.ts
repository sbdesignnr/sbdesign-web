import { getAllPosts } from "@/lib/blog-api";
import { site } from "@/lib/site";

export const revalidate = 3600;

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: string): string {
  const d = new Date(date);
  return isNaN(d.getTime()) ? new Date(0).toUTCString() : d.toUTCString();
}

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map((p) => {
      const link = `${site.url}/blog/${p.slug}`;
      return `    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${xmlEscape(p.excerpt ?? "")}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(site.name)} — Blog</title>
    <link>${site.url}/blog</link>
    <description>Praktické články o weboch, dizajne a online marketingu.</description>
    <language>sk</language>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
