<script lang="ts">
  import { user } from "../stores/user";

  let showMenu = false;

  function logoutHandler() {
    user.set(null);
    location.href = "/";
  }

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function closeMenu() {
    showMenu = false;
  }

  export function clickOutside(node: Node) {
    const handleClick = (event: Event) => {
      if (event.target && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent("outclick"));
      }
    };

    document.addEventListener("click", handleClick, true);

    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }
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
    <li
      class="toggle"
      on:click={toggleMenu}
      use:clickOutside
      on:outclick={closeMenu}
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
