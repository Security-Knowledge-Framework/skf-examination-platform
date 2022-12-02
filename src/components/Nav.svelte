<script lang="ts">
  import { logout, logoutSSR } from "../db/users/logout";
  import { user } from "../stores/user";

  export let isLoggedin: boolean;

  let showMenu = false;

  async function logoutHandler() {
    await logout();
    await logoutSSR();
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

<menu>
  <li>
    <a href="/">Home</a>
  </li>
  <li>
    <a href="/labs">Labs</a>
  </li>
  {#if isLoggedin || $user}
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
      <svg width="1em" height="1em" viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M17.754 14a2.249 2.249 0 0 1 2.249 2.25v.918a2.75 2.75 0 0 1-.513 1.598c-1.545 2.164-4.07 3.235-7.49 3.235c-3.421 0-5.944-1.072-7.486-3.236a2.75 2.75 0 0 1-.51-1.596v-.92A2.249 2.249 0 0 1 6.251 14h11.502ZM12 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z"
        /></svg
      >
    </li>
  {:else}
    <li>
      <a href="/login">Login/Register</a>
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
</menu>

<style lang="scss">
  menu {
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* gap: 0.5rem; */
    position: relative;
    @apply gap-1 sm:gap-2;
  }

  menu a {
    // padding: 1em 1.2em;
    @apply px-5 py-3;
    @apply md:px-6 sm:py-4;
    @apply lg:px-8 sm:py-4;
  }

  menu a:hover {
    /* text-decoration: underline var(--primary-200); */
    background-color: white;
    color: var(--primary-500);
    @apply rounded;
  }

  .toggle {
    cursor: pointer;
    user-select: none;
    @apply w-12 h-12;
    @apply flex items-center justify-center;
    @apply rounded-full;

    &:hover {
      @apply bg-white;
      color: var(--primary-500);
    }
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
