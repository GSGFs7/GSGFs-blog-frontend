import { z } from "zod";

export const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
});

export const privateSchema = publicSchema.extend({
  BACKEND_URL: z.url(),
  SERVER_SECRET_KEY: z.string().min(32),
  ADMIN_EMAIL: z.email().optional(),
  AUTH_GITHUB_ID: z.string().optional(),
  AUTH_GITHUB_SECRET: z.string().optional(),
  AUTH_OSU_ID: z.string().optional(),
  AUTH_OSU_SECRET: z.string().optional(),
  DEFAULT_FROM_EMAIL: z.email().optional(),
  GOOGLE_ANALYTICS_ID: z.string().optional(),
  JWT_REFRESH_SECRET: z.string().min(32).optional(),
  JWT_SECRET: z.string().min(32).optional(),
  MOMENTO_API_KEY: z.string().optional(),
  MOMENTO_BASE_URL: z.url().optional(),
  RESEND_API_KEY: z.string().optional(),
  SUPABASE_KEY: z.string().optional(),
  SUPABASE_URL: z.url().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
});
