import type { APIRoute } from "astro";
import { supabaseSSR } from "../../db/ssr";

export const post: APIRoute = async (context) => {
  const { request } = context;
  const { access_token, refresh_token } = await request.json();

  async function loginUser() {
    const { data, error } = await supabaseSSR(context).auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
      console.error(error);
      return { data, error: true, message: error.message };
    }

    return { data, error: false };
  }

  const res = await loginUser();

  return {
    body: JSON.stringify({
      res,
    }),
  };
};
