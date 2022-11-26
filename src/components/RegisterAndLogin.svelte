<script lang="ts">
  export let mode: "login" | "register";

  import {
    loginWithGithub,
    loginWithGoogle,
  } from "../db/users/loginWithProvider";
  import { registerUser } from "../db/users/registerUser";
  import { loginUser } from "../db/users/loginUser";

  let emailInput = "";
  let passwordInput = "";
  let passwordConfirmInput = "";
  let error = "";
  let message = "";

  async function handleSubmit() {
    if (
      passwordInput === "" ||
      (mode === "register" && passwordConfirmInput === "") ||
      emailInput === ""
    ) {
      error = "Please fill out all fields";
      return;
    }

    if (mode === "register" && passwordInput !== passwordConfirmInput) {
      error = "Passwords do not match";
      return;
    }

    const registerOrLogin = mode === "register" ? registerUser : loginUser;

    const {
      data,
      error: responseError,
      message: messageResponse,
    } = await registerOrLogin(emailInput, passwordInput);

    if (responseError && messageResponse) {
      error = messageResponse;
      return;
    }

    if (mode === "register" && data) {
      message = "User registered successfully";
      setTimeout(() => {
        message = "";
        location.href = "/login";
      }, 3000);
      return;
    }

    if (mode === "login" && data) {
      message = "Login successfully";
      setTimeout(() => {
        message = "";
        location.href = "/dashboard";
      }, 3000);
      return;
    }
  }
</script>

<div class="register-form">
  {#if mode === "register"}
    <p>Create an account.</p>
  {:else}
    <p>Sign in to your account.</p>
  {/if}

  <form class="form" on:submit|preventDefault={handleSubmit}>
    <div class="item-input">
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={emailInput} />
    </div>
    <div class="item-input">
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={passwordInput} />
    </div>
    <div class="item-input">
      {#if mode === "register"}
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          bind:value={passwordConfirmInput}
        />
      {/if}
    </div>
    <input
      class="btn"
      type="submit"
      value={mode === "register" ? "Register" : "Login"}
    />
  </form>
  {#if error}
    <div class="error">{error}</div>
  {/if}
  {#if message}
    <div class="message">{message}</div>
  {/if}

  <div class="container-sign-with">
    <div class="title">
      <div />
      <p>Or sign up with</p>
      <div />
    </div>
    <div class="list-social">
      <button class="sign-with" on:click={loginWithGithub}> Github </button>
      <button class="sign-with" on:click={loginWithGoogle}> Google </button>
    </div>
    <svg height="10" width="100%">
      <line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        style="stroke:rgb(160,160,160);stroke-width:2"
      />
    </svg>
  </div>
</div>

<style>
  .register-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 2rem;
    gap: 2rem;
    margin: 40px;
    background-color: var(--primary-700);
    border-radius: 1rem;
  }

  .register-form form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0px;
    gap: 16px;

    width: 280px;
  }

  .register-form form .btn {
    width: 100%;
    background-color: var(--primary-400);
    color: var(--text-primary);
  }

  form .item-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
  }

  .item-input label {
    font-family: var(--font-decoration);
  }

  .item-input input {
    background: rgba(245, 245, 245, 0.1);
    border-radius: 4px;
    height: 32px;
    width: 100%;
    border: none;
  }

  .container-sign-with .title {
    display: flex;
    flex-direction: row;
  }

  .container-sign-with .title div {
    width: 100%;
    height: 1px;
    background-color: rgb(160, 160, 160);
  }
  .container-sign-with .list-social {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }

  .list-social .sign-with {
    width: 100%;
    border-radius: 0.25rem;
    padding: 8px 16px;
  }
</style>
