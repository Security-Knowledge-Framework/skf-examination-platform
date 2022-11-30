<script lang="ts">
  // import { user } from "../../stores/user";
  import User from "../svgs/User.svelte";
  export let isLoggedin = false;
</script>

{#if isLoggedin}
  <section>
    <div class="info">
      <div class="avatar">
        <User />
      </div>
      <h1>Jane Smith</h1>
      <p class="email">jane@smith.com</p>
    </div>
    <div class="form">
      <!-- change name -->
      <label for="name">Name</label>
      <input type="text" name="name" id="name" />
      <!-- change email -->
      <label for="email">Email</label>
      <input type="email" name="email" id="email" />
      <!-- change password -->
      <label for="password">Password</label>
      <input type="password" name="password" id="password" />
      <!-- confirm password -->
      <label for="confirm-password">Confirm Password</label>
      <input type="password" name="confirm-password" id="confirm-password" />
      <button class="submit" type="submit">Save</button>
    </div>
  </section>
{/if}

<style>
  section {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 1rem;
    background-color: var(--primary-700);
    padding: 3.5rem 1.5rem;
    border-radius: 0.5rem;
    align-items: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: flex;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .email {
    font-size: 0.8rem;
    color: var(--primary-00);
  }

  .form {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 1.5rem;
  }

  label {
    font-size: 0.8rem;
  }

  .submit {
    grid-column: 1 / 3;
    justify-self: end;
  }
</style>
