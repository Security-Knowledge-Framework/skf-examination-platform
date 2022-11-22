import { Show } from "solid-js";
import type { User } from "@supabase/supabase-js";
import { user } from "../../stores/user";
import { isObjEmpty } from "../../utils/utils";

export function Profile() {
  const user_ = user as User;
  return (
    <Show when={!isObjEmpty(user)} fallback={<p>Loading...</p>}>
      <p>email: {user_.email}</p>
    </Show>
  );
}
