import { supabase } from "../client";

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return { error: true, message: error.message };
  }
  return { error: false };
}

export async function logoutSSR() {
  const response = await fetch("/api/logout", {
    method: "POST",
    body: JSON.stringify({}),
  });
  const json = await response.json();
  return json;
}
