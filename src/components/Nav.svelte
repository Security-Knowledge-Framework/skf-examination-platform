<script lang="ts">
  import { logout } from "../db/users/logout";
  import { user } from "../stores/user";

  export let isLoggedin: boolean;

  let showMenu = false;

  async function logoutHandler() {
    await logout();
    user.set(null);
    location.href = "/";
  }

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function clickOutside(e: Event) {
    const el = e.target as HTMLElement;
    if (!el.classList.contains("toggle")) {
      showMenu = false;
    }
  }
</script>

<svelte:body on:click={clickOutside} />

<ul>
  <li>
    <a href="/">Home</a>
  </li>
  <li>
    <a href="/labs">Labs</a>
  </li>
  {#if isLoggedin}
    <li>
      <a href="/dashboard">Dashboard</a>
    </li>
    <li>
      <a href="/profile">Profile</a>
    </li>
    <li
      class="toggle"
      on:click={toggleMenu}
      on:keypress={(e) => e.key === "Enter" && toggleMenu()}
    >
      ▼
    </li>
  {:else}
    <li>
      <a href="/login">Login</a>
    </li>
    <li>
      <a href="/register">Register</a>
    </li>
  {/if}

  {#if showMenu}
    <li class="menu">
      <div
        class="logout"
        on:click={logoutHandler}
        on:keypress={(e) => e.key === "Enter" && logoutHandler()}
      >
        Logout
      </div>
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
    position: relative;
  }

  ul a {
    padding: 1em 1.2em;
  }

  ul a:hover {
    text-decoration: underline var(--primary-200);
  }

  .toggle {
    cursor: pointer;
    user-select: none;
  }

  .menu {
    position: absolute;
    background-color: var(--primary-500);
    border-radius: 0.25rem;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
    padding: 0.75rem 1.25rem;
    right: 0;
    top: 3rem;
  }

  .logout {
    cursor: pointer;
    user-select: none;
  }
</style>
