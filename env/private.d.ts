export * from "./public";

// base
export const BACKEND_URL: string;
export const SERVER_SECRET_KEY: string;

// OAuth
export const AUTH_GITHUB_ID: string | undefined;
export const AUTH_GITHUB_SECRET: string | undefined;
export const AUTH_OSU_ID: string | undefined;
export const AUTH_OSU_SECRET: string | undefined;
export const JWT_SECRET: string | undefined;
export const JWT_REFRESH_SECRET: string | undefined;

// email
export const ADMIN_EMAIL: string | undefined;
export const DEFAULT_FROM_EMAIL: string | undefined;
export const RESEND_API_KEY: string | undefined;

// supabase
export const SUPABASE_URL: string | undefined;
export const SUPABASE_KEY: string | undefined;

// cloudflare turnstile
export const TURNSTILE_SECRET_KEY: string | undefined;

// momento cache
export const MOMENTO_API_KEY: string | undefined;
export const MOMENTO_BASE_URL: string | undefined;
