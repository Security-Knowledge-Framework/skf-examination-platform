import type { User } from "@supabase/supabase-js";
import { createStore } from "solid-js/store";

type emptyObject = Record<string, unknown>;

export const [user, setUser] = createStore<User | emptyObject>({});
