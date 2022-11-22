import { createSignal, Show } from "solid-js";
import {
  loginWithGithub,
  loginWithGoogle,
} from "../../db/users/loginWithProvider";
import { useForm } from "./loginForm";

export function LoginInpout() {
  const { form, updateFormField, submit } = useForm();

  const [error, setError] = createSignal("");
  const [message, setMessage] = createSignal("");

  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (form.email === "" || form.password === "") {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    const { error: submitError, message } = await submit(form);
    if (submitError && message) {
      setError(message);
    } else {
      setMessage("Login successful");
      setInterval(() => {
        setMessage("");
        location.href = "/dashboard";
      }, 3000);
    }
  }

  return (
    <>
      <h3>Sign in to your account</h3>
      <form onSubmit={handleSubmit} action="" method="post">
        <label for="email">Username or email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={form.email}
          onChange={updateFormField("email")}
        />

        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={updateFormField("password")}
        />
        <Show when={error()}>
          <div class="error">{error}</div>
        </Show>
        <Show when={message()}>
          <div class="message">{message}</div>
        </Show>
        <a href="/">Forgot Password?</a>
        <input type="submit" value="Sign In" />
      </form>
      <p>Or sign in with</p>
      <button class="sign-with" onclick={loginWithGithub}>
        Github
      </button>
      <button class="sign-with" onclick={loginWithGoogle}>
        Google
      </button>
      <div class="new-user">
        <span>
          New user? <a href="/register">Register</a>
        </span>
      </div>
    </>
  );
}
