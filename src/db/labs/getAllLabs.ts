import labs from "../../data/labs.json";
import { supabase } from "../db";

const isDev = import.meta.env.DEV;

export async function getAllLabs(useCache = true): Promise<typeof labs> {
  if (isDev && useCache) {
    console.log("Using local labs.json");
    return labs;
  }
  const { data, error } = await supabase.from("labs").select("*");
  if (error) {
    console.log(error);
    return [];
  }
  return data;
}
