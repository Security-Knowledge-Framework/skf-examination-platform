import type { Provider } from "@supabase/supabase-js";
import { supabase } from "../client";

export async function loginWithProvider(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) {
    console.error(error);
    return { data, error: true, message: error.message };
  }

  return { data, error: false };
}

export async function loginWithGithub() {
  return await loginWithProvider("github");
}

export async function loginWithGoogle() {
  return await loginWithProvider("google");
}
