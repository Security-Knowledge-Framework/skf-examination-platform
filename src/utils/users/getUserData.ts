import type { User } from "@supabase/supabase-js";
import { supabase } from "../db/db";

// TODO: USE STORE
export async function getUserData() {
  const { data, error } = await supabase.auth.getUser();
  let user: User | null = null;

  if (error) {
    console.log("error", error);
  } else {
    user = data.user;
  }

  return user;
}
