import SigninButton from "@/components/sign-in-button";
import githubIcon from "@/public/github.svg";
import osuIcon from "@/public/osu.svg";

export default async function Page() {
  return (
    <div className="">
      <SigninButton img={githubIcon} name="github" />
      <SigninButton img={osuIcon} name="osu" />
    </div>
  );
}
