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
  <p>Create an account.</p>
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
</style>
