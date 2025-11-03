import { z } from "zod";

export const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional().nullable(),
  NEXT_PUBLIC_CAP_INSTANCE_URL: z.url().optional().nullable(),
  NEXT_PUBLIC_CAP_SITE_KEY: z.string().optional().nullable(),
});

export const privateSchema = publicSchema.extend({
  BACKEND_URL: z.url(),
  SERVER_SECRET_KEY: z.string().min(32),
  ADMIN_EMAIL: z.email().optional().nullable(),
  AUTH_GITHUB_ID: z.string().optional().nullable(),
  AUTH_GITHUB_SECRET: z.string().optional().nullable(),
  AUTH_OSU_ID: z.string().optional().nullable(),
  AUTH_OSU_SECRET: z.string().optional().nullable(),
  DEFAULT_FROM_EMAIL: z.email().optional().nullable(),
  JWT_REFRESH_SECRET: z.string().min(32).optional(),
  JWT_SECRET: z.string().min(32).optional(),
  MOMENTO_API_KEY: z.string().optional().nullable(),
  MOMENTO_BASE_URL: z.url().optional().nullable(),
  RESEND_API_KEY: z.string().optional().nullable(),
  SUPABASE_KEY: z.string().optional().nullable(),
  SUPABASE_URL: z.url().optional().nullable(),
  TURNSTILE_SECRET_KEY: z.string().optional().nullable(),
  CAP_SECRET_KEY: z.string().optional().nullable(),
});
