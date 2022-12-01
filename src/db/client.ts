import { createClient } from "@supabase/supabase-js";
import { getApiKey } from "../utils/consts";

const supabaseUrl = "https://ccsgfooankckfqpmcfyb.supabase.co";
const supabaseKey = (await getApiKey()) || "";

export const supabase = createClient(supabaseUrl, supabaseKey);
