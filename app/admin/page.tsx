import TestButton from "@/components/test-button";
import { generateSitemap } from "@/utils/sitemap";

export default async function Page() {
  return (
    <>
      <div>Admin</div>
      <TestButton action={generateSitemap} />
    </>
  );
}
