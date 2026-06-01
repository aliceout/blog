import { getSortedPosts } from "../utils/posts.js";
import site from "../data/site.json";

const escapeXml = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET(context) {
  const posts = await getSortedPosts();
  const siteUrl = (context.site?.toString() || "").replace(/\/$/, "");

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.data.title)}</title>
      <link>${siteUrl}/billets/${p.id}/</link>
      <guid isPermaLink="true">${siteUrl}/billets/${p.id}/</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
      <description>${escapeXml(p.data.excerpt)}</description>
      ${(p.data.tags || []).map((t) => `<category>${escapeXml(t)}</category>`).join("")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${siteUrl}/</link>
    <description>${escapeXml(site.description)}</description>
    <language>fr</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
