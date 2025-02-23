import SigninButton from "@/components/sign-in-button";
import githubIcon from "@/public/github.svg";
import osuIcon from "@/public/osu.svg";

export default async function Page() {
  return (
    <div className="">
      <SigninButton disabled img={githubIcon} name="github" />
      <SigninButton disabled img={osuIcon} name="osu" />
      <p>登陆功能暂不可用(因为评论功能还没写完哦)</p>
    </div>
  );
}
