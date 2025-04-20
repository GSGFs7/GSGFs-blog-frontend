import First from "@/components/first";
import GPGMdx from "@/markdown/GPG.mdx";
import { commentMarkdownToHtml } from "@/utils/markdown";

export const dynamic = "force-static"; // static page
export const revalidate = 86400; // one day

export default async function Home() {
  const gpg = await commentMarkdownToHtml(GPGMdx);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <First gpg={gpg} />
    </section>
  );
}
