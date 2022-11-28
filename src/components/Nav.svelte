<script lang="ts">
  import { user } from "../stores/user";
</script>

<ul>
  <li>
    <a href="/">Home</a>
  </li>
  <li>
    <a href="/labs">Labs</a>
  </li>
  {#if $user}
    <li>
      <a href="/dashboard">Dashboard</a>
    </li>
    <li>
      <a href="/profile">Profile</a>
    </li>
  {:else}
    <li>
      <a href="/login">Login</a>
    </li>
    <li>
      <a href="/register">Register</a>
    </li>
  {/if}
</ul>

<style>
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;

    align-items: center;
    gap: 0.5rem;
  }

  ul a {
    padding: 1em 1.2em;
  }

  ul a:hover {
    text-decoration: underline var(--primary-200);
  }
</style>
