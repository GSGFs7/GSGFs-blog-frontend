import clsx from "clsx";
import { Suspense } from "react";

import AprilFoolConfirm from "@/components/galgame/april-fool-confirm";
import { GalList } from "@/components/galgame";
import { title } from "@/utils/primitives";

export default async function Page() {
  return (
    <div className="flex flex-col">
      <h1 className={clsx(title(), "mb-12")}>Galgame</h1>
      <Suspense fallback={<div className="spinner-big" />}>
        <GalList />
      </Suspense>
      <AprilFoolConfirm />
    </div>
  );
}
