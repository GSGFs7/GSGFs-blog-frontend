import { siteConfig } from "@/config/site";
import { NEXT_PUBLIC_SITE_URL } from "@/env/public";
import { getAllPostForFeed } from "@/lib/api";

const escapeXML = (unsafe: string) => `<![CDATA[${unsafe}]]>`;

export async function generateBlogFeed(): Promise<string> {
  const posts = await getAllPostForFeed();
  const siteUrl = NEXT_PUBLIC_SITE_URL;
  const feedUrl = `${siteUrl}/blog/feed.atom`;
  const feedUpdated = new Date(
    Math.max(
      ...(posts ?? []).map((p) => new Date(p.content_update_at).getTime()),
    ),
  ).toISOString();

  const entryXML =
    posts
      ?.map((post) => {
        const postUrl = `${siteUrl}/blog/${post.id}`;

        // TODO: generate summary by AI
        return `
    <entry>
      <id>${postUrl}</id>
      <title>${escapeXML(post.title)}</title>
      <updated>${new Date(post.content_update_at).toISOString()}</updated>
      <link rel="alternate" href="${postUrl}" type="text/html" />
      <summary>
        ${escapeXML(post.meta_description)}
      </summary>
      <content type="html" xml:base="${postUrl}">
        ${escapeXML(post.content_html ?? "")}
      </content>
      <published>${post.created_at}</published>
      <category term="${post.category?.name}" schema="${siteUrl}" />
    </entry>
          `;
      })
      .join("") ?? "";

  const rssXML = `<?xml version="1.0" encoding="UTF-8" ?>
<feed version="2.0" xmlns="http://www.w3.org/2005/Atom" xml:lang="zh-CN">
  <id>${feedUrl}</id>
  <title type="text">${siteConfig.siteName}</title>
  <updated>${feedUpdated}</updated>

  <author>
    <name>${siteConfig.author}</name>
    <email>${siteConfig.adminEmail}</email>
    <url>${siteUrl}</url>
  </author>

  <link rel="self" href="${feedUrl}" />
  <link rel="alternate" href="${siteUrl}/blog" type="text/html" />
  <link rel="license" href="https://creativecommons.org/licenses/by/4.0/" />

  <subtitle type="text">${siteConfig.description}</subtitle>
  <logo>${siteUrl}/favicon.ico</logo>
  <rights>Content licensed under Creative Commons Attribution 4.0 International (CC BY 4.0)</rights>
${entryXML}
</feed>
`;

  return rssXML;
}
