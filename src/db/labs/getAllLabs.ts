import labs from "../../data/labs.json";
import { supabase } from "../db";

const isDev = import.meta.env.DEV;

export async function getAllLabs(useCache = true): Promise<typeof labs> {
  if (isDev && useCache) {
    // eslint-disable-next-line no-console
    console.log("Using local labs.json");
    return labs;
  }
  const { data, error } = await supabase.from("labs").select("*");
  if (error) {
    if (isDev) console.error(error);
    return [];
  }
  return data;
}
