import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4 md:py-4">
      <div className="inline-block w-full max-w-5xl justify-center text-left">
        {children}
      </div>
    </div>
  );
}
