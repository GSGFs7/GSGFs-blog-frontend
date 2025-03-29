export const runtime = "edge";

import { Suspense } from "react";

import SigninButton from "@/components/sign-in-button";
import githubIcon from "@/public/github.svg";
import osuIcon from "@/public/osu.svg";

export default async function Page({}: {}) {
  return (
    <div className="">
      {/* useSearchParams() 需要包裹在 Suspense 中 */}
      <Suspense fallback={<div className="spinner-big" />}>
        <SigninButton img={githubIcon} name="github" />
        <SigninButton img={osuIcon} name="osu" />
      </Suspense>
    </div>
  );
}
