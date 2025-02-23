import { title } from "@/utils/primitives";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className={title()}>Pages</h1>
      <h3 className="text-gray-400">一些持续更新的固定页面</h3>
    </div>
  );
}
