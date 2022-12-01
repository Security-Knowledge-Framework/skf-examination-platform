import { supabase } from "./client";
import { supabaseSSR } from "./ssr";
import type { APIContext, AstroGlobal } from "astro";

export function getSupabase(context?: APIContext | AstroGlobal) {
  if (!context) return supabase;
  return supabaseSSR(context);
}
