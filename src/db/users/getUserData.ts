import { setUser } from "../../stores/user";
import { supabase } from "../db";

export async function getUserData() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("error", error);
    return;
  }

  setUser(data.user);
}
