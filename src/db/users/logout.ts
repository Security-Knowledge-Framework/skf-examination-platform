import { supabase } from "../db";

export async function logout() {
  const { error } = await supabase.auth.signOut();
  await logoutSSR();

  if (error) {
    console.error(error);
    return { error: true, message: error.message };
  }
  return { error: false };
}

async function logoutSSR() {
  const response = await fetch("/api/logout", {
    method: "POST",
    body: JSON.stringify({}),
  });
  const json = await response.json();
  return json;
}
