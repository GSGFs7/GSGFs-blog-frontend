import CacheStatus from "@/components/cache-status";
import TestButton from "@/components/test-button";
import { getPostBySearch } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Page() {
  const action = async () => {
    "use server";
    const res = await getPostBySearch("python");
    console.log(res);
  };

  return (
    <div>
      <p>A strange page</p>
      <CacheStatus />
      <TestButton action={action} />
    </div>
  );
}
