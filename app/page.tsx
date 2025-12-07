import First from "@/components/first";
import StructuredData from "@/components/structured-data";

export const dynamic = "force-static"; // static page
export const revalidate = 86400; // one day

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-6">
      <StructuredData />

      <First />
    </section>
  );
}
