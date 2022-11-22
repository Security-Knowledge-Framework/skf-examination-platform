import type { User } from "@supabase/supabase-js";
import { createStore } from "solid-js/store";

export const [user, setUser] = createStore<User | {}>({});
