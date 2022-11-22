import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ccsgfooankckfqpmcfyb.supabase.co";
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_API_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);
