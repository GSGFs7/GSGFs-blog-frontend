import type { SupabaseClient } from "@supabase/supabase-js";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_KEY ?? "";

// If supabase configuration is not given
let supabaseClient: SupabaseClient | null = null;

if (supabaseUrl && supabaseKey) {
  supabaseClient = createClient(supabaseUrl, supabaseKey);
} else {
  // eslint-disable-next-line no-console
  console.warn("Missing Supabase credentials - some features will disable.");
}

export default supabaseClient;
