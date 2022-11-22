import { supabase } from "../db";

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    return { data, error: true, message: error.message };
  }
  return { data, error: false };
}
