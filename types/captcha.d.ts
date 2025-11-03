export type Captchas = "Cap" | "Turnstile";

export interface Captcha {
  type: Captchas;
  getToken(): string | null;
  reset(): void;
  render(): React.ReactNode;
}

export interface CaptchaWidget {
  setTokenAction: (token: string) => void;
}
