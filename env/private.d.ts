// find the value?
// see `./private.mjs`
// this file just export the env, make it easy to use.

export * from "./public";

// base
export const BACKEND_URL: string;
export const SERVER_SECRET_KEY: string;

// OAuth
export const AUTH_GITHUB_ID: string | null | undefined;
export const AUTH_GITHUB_SECRET: string | null | undefined;
export const AUTH_OSU_ID: string | null | undefined;
export const AUTH_OSU_SECRET: string | null | undefined;
export const JWT_SECRET: string | undefined;
export const JWT_REFRESH_SECRET: string | undefined;

// email
export const ADMIN_EMAIL: string | null | undefined;
export const DEFAULT_FROM_EMAIL: string | null | undefined;
export const RESEND_API_KEY: string | null | undefined;

// supabase
export const SUPABASE_URL: string | null | undefined;
export const SUPABASE_KEY: string | null | undefined;

// cloudflare turnstile
export const TURNSTILE_SECRET_KEY: string | null | undefined;

// cap
export const CAP_SECRET_KEY: string | null | undefined;

// momento cache
export const MOMENTO_API_KEY: string | null | undefined;
export const MOMENTO_BASE_URL: string | null | undefined;
