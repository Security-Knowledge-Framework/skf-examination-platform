import { setUser } from "../../stores/user";
import { supabase } from "../db";

export async function getUserData() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("error", error);
    return;
  }

  setUser(data.user);
}
