import clsx from "clsx";
import { Suspense } from "react";

import { GalList } from "@/components/galgame";
import { title } from "@/utils/primitives";
import Intro from "@/components/galgame/intro";

export default async function Page() {
  return (
    <div className="flex flex-col">
      <h1 className={clsx(title(), "mb-12")}>Galgame</h1>
      <Suspense fallback={<div className="spinner-big" />}>
        <GalList />
      </Suspense>
      <Intro />
    </div>
  );
}
