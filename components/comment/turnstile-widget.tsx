import Turnstile from "react-turnstile";

export default function TurnstileWidget({
  handleVerifyAction,
}: {
  handleVerifyAction: () => void;
}) {
  return (
    <Turnstile
      refreshExpired="auto"
      sitekey={`${process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}`}
      theme="dark"
      onVerify={handleVerifyAction}
    />
  );
}
