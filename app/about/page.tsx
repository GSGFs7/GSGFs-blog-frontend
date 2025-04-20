import aboutMdx from "@/markdown/about.mdx";
import { markdownToHtml } from "@/utils";
import { title } from "@/utils/primitives";
import "@/styles/blog.css";

export default async function AboutPage() {
  const about = await markdownToHtml(aboutMdx);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className={title()}>About</h1>
        <p className="text-gray-400">
          {process.env.NODE_ENV === "development" && (
            <>
              <span>当前运行环境: </span>
              <span>{process.env.NODE_ENV}</span>
            </>
          )}
        </p>
      </div>

      <article
        dangerouslySetInnerHTML={{ __html: about }}
        className="markdown-body about w-full rounded-lg px-6 py-8"
      />
    </div>
  );
}
