<script lang="ts">
  import { getUserData } from "../db/users/getUserData";
  import { user } from "../stores/user";
  import { onMount } from "svelte";
  import { supabase } from "../db/client";
  import { setUserSSRSession } from "../db/users/setUserSSRSession";

  onMount(async () => {
    // maybe use onAuthStateChange
    const session = await supabase.auth.getSession();

    const accessToken = session.data.session?.access_token;
    const refreshToken = session.data.session?.refresh_token;

    if (accessToken && refreshToken) {
      await setUserSSRSession(accessToken, refreshToken);
    }

    const userData = await getUserData();
    if (userData) {
      $user = userData;
    }
  });
</script>
