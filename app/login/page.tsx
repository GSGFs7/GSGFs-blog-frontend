import { Suspense } from "react";

import { SigninButton } from "@/components/auth";
import { CookiePreference } from "@/components/auth/cookie-preference";
import githubIcon from "@/public/github.svg";
import osuIcon from "@/public/osu.svg";

export default async function Page() {
  return (
    <div className="">
      <Suspense fallback={<div className="spinner-big" />}>
        <SigninButton img={githubIcon} name="github" />
        <SigninButton img={osuIcon} name="osu" />
        <CookiePreference />
      </Suspense>
    </div>
  );
}
