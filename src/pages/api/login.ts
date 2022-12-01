import type { APIRoute } from "astro";
import { supabaseSSR } from "../../db/ssr";

export const post: APIRoute = async (context) => {
  const { request } = context;
  const { email, password } = await request.json();

  let res;

  const { data, error } = await supabaseSSR(context).auth.signInWithPassword({
    email,
    password,
  });

  if (!error) res = { data, error: false };
  else res = res = { data, error: true, message: error.message };

  return {
    body: JSON.stringify({
      res,
    }),
  };
};
