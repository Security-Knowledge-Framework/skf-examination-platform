<script lang="ts">
  import { getUserData } from "../db/users/getUserData";
  import { user } from "../stores/user";
  import { onMount } from "svelte";
  import { supabase } from "../db/client";

  onMount(async () => {
    // maybe use onAuthStateChange
    const session = await supabase.auth.getSession();

    // TODO: HANDLE ERRORS
    await fetch("/api/login-jwt", {
      method: "POST",
      body: JSON.stringify({
        access_token: session.data.session?.access_token,
        refresh_token: session.data.session?.refresh_token,
      }),
    });

    const userData = await getUserData();
    if (userData) {
      $user = userData;
    }
  });
</script>
