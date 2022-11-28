<script lang="ts">
  import { user } from "../../stores/user";
  import { logout } from "../../db/users/logout";
</script>

{#if $user}
  <h2>Welcome {$user.email}</h2>
  <button on:click={logout}>Logout</button>
{/if}
