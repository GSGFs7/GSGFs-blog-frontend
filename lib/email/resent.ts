import { CreateEmailResponse, Resend } from "resend";

import { EmailTemplate } from "./email-template";

const resend_api_key = process.env.RESEND_API_KEY || "_";
const resend = new Resend(resend_api_key);

export async function mailAdmin(
  subject: string,
  content: string,
): Promise<CreateEmailResponse | null> {
  if (resend_api_key == "_") return null;

  const response = await resend.emails.send({
    from: process.env.DEFAULT_FROM_EMAIL!,
    to: process.env.ADMIN_EMAIL!,
    subject: subject,
    react: EmailTemplate({ content }),
  });

  return response;
}
