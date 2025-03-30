import { First } from "@/components/first";

export const dynamic = "force-static"; // static page
export const revalidate = 86400; // one day

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <First />
    </section>
  );
}
