import aboutMd from "@/markdown/about.md";
import { markdownToHtml } from "@/utils";
import { title } from "@/utils/primitives";
import "@/styles/blog.css";
import "github-markdown-css/github-markdown-dark.css";

export default async function AboutPage() {
  const about = await markdownToHtml(aboutMd);

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
        className="markdown-body about w-full rounded-lg sm:px-6 sm:py-8"
      />
    </div>
  );
}
