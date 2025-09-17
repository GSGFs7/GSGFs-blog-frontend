import CacheStatus from "@/components/cache-status";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <div>
      <p>A strange page</p>
      <CacheStatus />
    </div>
  );
}
