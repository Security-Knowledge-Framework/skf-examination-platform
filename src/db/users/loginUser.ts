import { supabase } from "../db";

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
    return { data, error: true, message: error.message };
  }
  document.cookie = "loggedIn=true";
  return { data, error: false };
}
