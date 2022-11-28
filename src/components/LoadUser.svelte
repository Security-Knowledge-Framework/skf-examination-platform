<script lang="ts">
  import { getUserData } from "../db/users/getUserData";
  import { user } from "../stores/user";
  import { onMount } from "svelte";

  onMount(async () => {
    const userData = await getUserData();
    if (userData) {
      $user = userData;
    }
  });
</script>
