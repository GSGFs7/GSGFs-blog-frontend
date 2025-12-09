import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

import { SUPABASE_KEY, SUPABASE_URL } from "@/env/private";

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;

// If supabase configuration is not given
let supabaseClient: SupabaseClient | null = null;

if (supabaseUrl && supabaseKey) {
  supabaseClient = createClient(supabaseUrl, supabaseKey);
} else {
  // console.warn("Missing Supabase credentials - some features will disable.");
}

export default supabaseClient;
