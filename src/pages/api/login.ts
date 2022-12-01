import type { APIRoute } from "astro";
import { supabase } from "../../db/db";
import { supabaseSSR } from "../../db/ssr";

export const post: APIRoute = async (context) => {
  const { request } = context;
  const { email, password } = await request.json();

  async function loginUser(email: string, password: string) {
    const { data, error } = await supabaseSSR(context).auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
      return { data, error: true, message: error.message };
    }
    return { data, error: false };
  }

  const res = await loginUser("acp325@gmail.com", "123456");

  return {
    body: JSON.stringify({
      res,
    }),
  };
};
