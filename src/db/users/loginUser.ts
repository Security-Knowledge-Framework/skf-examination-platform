import { supabase } from "../client";

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    return { data, error: true, message: error.message };
  }

  return { data, error: false };
}
