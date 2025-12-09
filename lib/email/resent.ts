import "server-only";

import { type CreateEmailResponse, Resend } from "resend";

import { ADMIN_EMAIL, DEFAULT_FROM_EMAIL, RESEND_API_KEY } from "@/env/private";

import { EmailTemplate } from "./email-template";

const resend_api_key = RESEND_API_KEY || "_";
const resend = new Resend(resend_api_key);

export async function mailAdmin(
  subject: string,
  content: string,
): Promise<CreateEmailResponse | null> {
  if (resend_api_key === "_" || !ADMIN_EMAIL || !DEFAULT_FROM_EMAIL) {
    return null;
  }

  const response = await resend.emails.send({
    from: DEFAULT_FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: subject,
    react: EmailTemplate({ content }),
  });

  return response;
}
