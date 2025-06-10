import TestButton from "@/components/test-button";
import { cacheGet } from "@/lib/cache";

export const dynamic = "force-dynamic";

export default async function Page() {
  const action = async () => {
    "use server";
    // eslint-disable-next-line no-console
    console.log(await cacheGet("114514"));
  };

  return (
    <div>
      <p>A strange page</p>
      <TestButton action={action} />
    </div>
  );
}
