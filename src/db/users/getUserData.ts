import type { APIContext, AstroGlobal } from "astro";
import { getSupabase } from "../db";

export async function getUserData() {
  return await _getUserData();
}

export async function getUserDataSSR(context: APIContext | AstroGlobal) {
  return await _getUserData(context);
}

async function _getUserData(context?: APIContext | AstroGlobal) {
  const supabase = getSupabase(context);

  const { data, error } = await supabase.auth.getUser();

  if (!error) return data.user;
  console.error("error", error);
  return;
}
