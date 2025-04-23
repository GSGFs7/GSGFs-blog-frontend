import Turnstile from "react-turnstile";

export default function TurnstileWidget({
  setToken,
}: {
  setToken: (token: string) => void;
}) {
  return (
    <Turnstile
      refreshExpired="auto"
      sitekey={`${process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}`}
      theme="dark"
      onVerify={(token) => setToken(token)}
    />
  );
}
