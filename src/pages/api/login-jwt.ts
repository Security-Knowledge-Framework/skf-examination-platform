import type { APIRoute } from "astro";
import { supabaseSSR } from "../../db/ssr";

export const post: APIRoute = async (context) => {
  const { request } = context;
  const { access_token, refresh_token } = await request.json();

  if (!access_token || !refresh_token) {
    return {
      body: JSON.stringify({
        error: true,
        message: "Missing access_token or refresh_token",
      }),
    };
  }

  let res;

  const { data, error } = await supabaseSSR(context).auth.setSession({
    access_token,
    refresh_token,
  });

  if (!error) res = { data, error: false };
  else {
    res = { data, error: true, message: error.message };
    console.error(error);
  }

  return {
    body: JSON.stringify({
      res,
    }),
  };
};
