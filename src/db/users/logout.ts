import { supabase } from "../db";

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    return { error: true, message: error.message };
  }
  return { error: false };
}
