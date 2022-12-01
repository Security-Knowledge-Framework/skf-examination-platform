import type { APIRoute } from "astro";
import { supabaseSSR } from "../../db/ssr";

export const post: APIRoute = async (context) => {
  let res;
  const { error } = await supabaseSSR(context).auth.signOut();

  if (error) {
    console.error(error);
    res = { error: true, message: error.message };
  }
  res = { error: false };

  return {
    body: JSON.stringify({
      res,
    }),
  };
};
