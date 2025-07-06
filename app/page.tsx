import First from "@/components/first";
import GPGMd from "@/markdown/GPG.md";
import { commentMarkdownToHtml } from "@/utils/markdown";

export const dynamic = "force-static"; // static page
export const revalidate = 86400; // one day

export default async function Home() {
  const gpg = await commentMarkdownToHtml(GPGMd);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-6">
      <First gpg={gpg} />
    </section>
  );
}
