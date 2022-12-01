import type { APIContext, AstroGlobal } from "astro";
import labs from "../../data/labs.json";
import { getSupabase } from "../db";

const isDev = import.meta.env.DEV;

export async function getAllLabs(useCache = true) {
  return await _getAllLabs(undefined, useCache);
}

export async function getAllLabsSSR(
  context: APIContext | AstroGlobal,
  useCache = true
) {
  return await _getAllLabs(context, useCache);
}

async function _getAllLabs(
  context?: APIContext | AstroGlobal,
  useCache = true
): Promise<typeof labs> {
  if (isDev && useCache) {
    // eslint-disable-next-line no-console
    console.log("Using local labs.json");
    return labs;
  }

  const supabase = getSupabase(context);

  const { data, error } = await supabase.from("labs").select("*");

  if (!error) return data;

  if (isDev) console.error(error);
  return [];
}
