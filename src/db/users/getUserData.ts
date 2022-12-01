import type { SupabaseClient } from "@supabase/supabase-js";
import type { APIContext, AstroGlobal } from "astro";
import { supabase } from "../db";
import { supabaseSSR } from "../ssr";

export async function getUserData() {
  return await _getUserData();
}

export async function getUserDataSSR(context: APIContext | AstroGlobal) {
  return await _getUserData(context);
}

async function _getUserData(context?: APIContext | AstroGlobal) {
  let sup: SupabaseClient;

  if (!context) sup = supabase;
  else sup = supabaseSSR(context);

  const { data, error } = await sup.auth.getUser();

  if (!error) return data.user;
  console.error("error", error);
  return;
}
