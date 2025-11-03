export * from "./public.mjs";

// base
export const BACKEND_URL = process.env.BACKEND_URL;
export const SERVER_SECRET_KEY = process.env.SERVER_SECRET_KEY;

// OAuth
export const AUTH_GITHUB_ID = process.env.AUTH_GITHUB_ID;
export const AUTH_GITHUB_SECRET = process.env.AUTH_GITHUB_SECRET;
export const AUTH_OSU_ID = process.env.AUTH_OSU_ID;
export const AUTH_OSU_SECRET = process.env.AUTH_OSU_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// email
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const DEFAULT_FROM_EMAIL = process.env.DEFAULT_FROM_EMAIL;
export const RESEND_API_KEY = process.env.RESEND_API_KEY;

// supabase
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_KEY = process.env.SUPABASE_KEY;

// cloudflare turnstile
export const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

// cap
export const CAP_SECRET_KEY = process.env.CAP_SECRET_KEY;

// momento cache
export const MOMENTO_API_KEY = process.env.MOMENTO_API_KEY;
export const MOMENTO_BASE_URL = process.env.MOMENTO_BASE_URL;
