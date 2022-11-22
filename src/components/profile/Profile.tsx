import { createResource, Show } from "solid-js";

import { getUserData } from "../../utils/users/getUserData";

export function Profile() {
  const [user] = createResource(async () => {
    return await getUserData();
  });

  return (
    <Show when={user()} fallback={<p>Loading...</p>}>
      {/* <p>Profile page for {JSON.stringify(user(), null, 2)}</p> */}
      <p>{user()?.email}</p>
    </Show>
  );
}
