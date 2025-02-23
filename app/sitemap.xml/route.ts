import { generateSitemap } from "@/utils/sitemap";

export async function GET() {
  try {
    const sitemap = await generateSitemap();

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Generate sitemap error: ", e);

    return new Response("Error generating sitemap", { status: 500 });
  }
}
