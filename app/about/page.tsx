import AboutContent from "@/components/about-content";
import { title } from "@/components/primitives";

export default async function AboutPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className={title()}>About</h1>
        <p className="text-gray-400">
          {process.env.NODE_ENV === "development" && (
            <span>当前运行环境: </span>
          )}
          <span>{process.env.NODE_ENV}</span>
        </p>
      </div>
      <AboutContent />
    </div>
  );
}
