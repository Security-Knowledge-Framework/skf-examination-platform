import type { APIContext, AstroGlobal } from "astro";
import { getSupabase } from "../db/db";

export async function checkSession(context: APIContext | AstroGlobal) {
  const { error, data } = await getSupabase(context).auth.getSession();
  if (error) return false;
  if (data.session) return true;
  return false;
}
