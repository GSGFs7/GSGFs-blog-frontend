import { z } from "zod";

const publicSchema = z.object({
  SITE_URL: z.string().url(),
  TURNSTILE_SITE_KEY: z.string().optional(),
});

const privateSchema = publicSchema.extend({
  BACKEND_URL: z.string().url(),
  SERVER_SECRET_KEY: z.string().min(32),
  AUTH_GITHUB_ID: z.string().optional(),
  AUTH_GITHUB_SECRET: z.string().optional(),
  AUTH_OSU_ID: z.string().optional(),
  AUTH_OSU_SECRET: z.string().optional(),
  JWT_SECRET: z.string().min(32).optional(),
  JWT_REFRESH_SECRET: z.string().min(32).optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  DEFAULT_FROM_EMAIL: z.string().email().optional(),
  RESEND_API_KEY: z.string().optional(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  MOMENTO_API_KEY: z.string().optional(),
  MOMENTO_BASE_URL: z.string().url().optional(),
});

export const validatePublicEnv = () => {
  return publicSchema.parse({
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  });
};

export const validatePrivateEnv = () => {
  return privateSchema.parse({
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    BACKEND_URL: process.env.BACKEND_URL,
    SERVER_SECRET_KEY: process.env.SERVER_SECRET_KEY,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_OSU_ID: process.env.AUTH_OSU_ID,
    AUTH_OSU_SECRET: process.env.AUTH_OSU_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    DEFAULT_FROM_EMAIL: process.env.DEFAULT_FROM_EMAIL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    MOMENTO_API_KEY: process.env.MOMENTO_API_KEY,
    MOMENTO_BASE_URL: process.env.MOMENTO_BASE_URL,
  });
};
