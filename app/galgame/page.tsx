export const runtime = "edge";

import { title } from "@/utils/primitives";

export default async function Page() {
  return (
    <div>
      <h1 className={title()}>Galgame</h1>
    </div>
  );
}
