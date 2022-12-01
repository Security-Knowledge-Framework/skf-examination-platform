<script lang="ts">
  export let mode: "login" | "register";

  import {
    loginWithGithub,
    loginWithGoogle,
  } from "../db/users/loginWithProvider";
  import { registerUser } from "../db/users/registerUser";
  import { loginUser } from "../db/users/loginUser";
  import GitHub from "./svgs/GitHub.svelte";
  import Google from "./svgs/Google.svelte";
  import LogoSvelte from "./svgs/LogoSvelte.svelte";
  import { setUserSSRSession } from "../db/users/setUserSSRSession";

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

      const accessToken = data.session?.access_token;
      const refreshToken = data.session?.refresh_token;

      if (accessToken && refreshToken) {
        await setUserSSRSession(accessToken, refreshToken);
      }

      location.href = "/dashboard";
      return;
    }
  }
</script>

<div class="form">
  <div class="title">
    <LogoSvelte />
    {#if mode === "register"}
      <p>Create an account.</p>
    {:else}
      <p>Sign in to your account.</p>
    {/if}
  </div>

  <form on:submit|preventDefault={handleSubmit}>
    <div class="item-input">
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={emailInput} />
    </div>
    <div class="item-input">
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={passwordInput} />
    </div>
    {#if mode === "register"}
      <div class="item-input">
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          bind:value={passwordConfirmInput}
        />
      </div>
    {:else}
      <a href="/" class="small-text">Forgot Password?</a>
    {/if}
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
      <button class="sign-with github" on:click={loginWithGithub}>
        <GitHub />
      </button>
      <button class="sign-with google" on:click={loginWithGoogle}>
        <Google />
      </button>
    </div>
    <svg height="10" width="100%">
      <line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        style="stroke:var(--primary-300);stroke-width:2"
      />
    </svg>
  </div>

  {#if mode === "login"}
    <p class="small-text">
      Don’t have an account yet? <a href="/register">Sign up</a>
    </p>
  {/if}
</div>

<style>
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 3rem;
    gap: 2rem;
    margin: auto;
    background-color: var(--primary-700);
    border-radius: 1rem;
  }

  .form .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    font-size: 1rem;
    font-weight: 600;
  }

  .form form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
    width: 100%;
  }

  .form form .btn {
    width: 100%;
    background-color: var(--primary-400);
    color: var(--text-primary);
    margin-top: 0.5rem;
  }

  .form form .btn:hover {
    background-color: var(--primary-500);
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
    font-size: 14px;
  }

  .item-input input {
    background: rgba(245, 245, 245, 0.1);
    border-radius: 4px;
    height: 32px;
    width: 100%;
    border: none;
    padding: 8px 8px;
    color: var(--text-primary);
  }

  input.btn {
    width: 100%;
  }

  .container-sign-with .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
  }

  .container-sign-with .title p {
    min-width: fit-content;
    color: var(--primary-300);
    text-align: center;
    font-size: 12px;
  }

  .container-sign-with .title div {
    width: 100%;
    height: 0.5px;
    background-color: var(--primary-300);
  }

  .container-sign-with .list-social {
    display: flex;
    flex-direction: row;
    gap: 24px;
    margin: 16px 0px;
  }

  .list-social .sign-with {
    width: 100%;
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
    padding: 8px 16px;
  }

  .list-social .github {
    background-color: black;
  }

  .list-social .google {
    background-color: #db4437;
  }

  a:hover {
    text-decoration: underline var(--text-primary);
  }
</style>
