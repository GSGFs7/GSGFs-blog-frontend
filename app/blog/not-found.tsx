export const runtime = "edge";

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1>404 - Page Not Found</h1>
      <p>杂鱼，你要找的文章貌似不存在</p>
    </div>
  );
}
