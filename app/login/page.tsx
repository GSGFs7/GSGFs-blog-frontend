import { Suspense } from "react";

import SigninButton from "@/components/sign-in-button";
import githubIcon from "@/public/github.svg";
import osuIcon from "@/public/osu.svg";

export default async function Page({}: {}) {
  return (
    <div className="">
      {/* useSearchParams() 需要包裹在 Suspense 中 */}
      <Suspense>
        <SigninButton img={githubIcon} name="github" />
        <SigninButton img={osuIcon} name="osu" />
      </Suspense>
      <p>登陆功能暂不可用(因为评论功能还没写完哦)</p>
    </div>
  );
}
