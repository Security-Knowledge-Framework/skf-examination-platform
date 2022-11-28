import { supabase } from "../db";

export async function getUserData() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("error", error);
    return;
  }

  return data.user;
}
