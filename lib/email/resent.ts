import { CreateEmailResponse, Resend } from "resend";

import { EmailTemplate } from "./email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function mailAdmin(
  subject: string,
  content: string,
): Promise<CreateEmailResponse> {
  const response = await resend.emails.send({
    from: process.env.DEFAULT_FROM_EMAIL!,
    to: process.env.ADMIN_EMAIL!,
    subject: subject,
    react: EmailTemplate({ content }),
  });

  return response;
}
