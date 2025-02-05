import SigninButton from "@/components/sign-in-button";
import githubIcon from "@/public/github.svg";
import googleIcon from "@/public/google.svg";

export default function Page() {
  return (
    <div className="">
      <SigninButton disabled img={githubIcon} name="github" />
      <SigninButton disabled img={googleIcon} name="google" />
      <p>登陆功能还没写完</p>
    </div>
  );
}
