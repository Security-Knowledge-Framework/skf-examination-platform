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
    <div class="login-form">
      <h3>Sign in to your account</h3>
      <form onSubmit={handleSubmit} action="" method="post">
        <div class="item-input">
          <label for="email">Username or email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={form.email}
            onChange={updateFormField("email")}
          />
        </div>

        <div class="item-input">
          <label for="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={updateFormField("password")}
          />
        </div>

        <Show when={error()}>
          <div class="error">{error}</div>
        </Show>
        <Show when={message()}>
          <div class="message">{message}</div>
        </Show>
        <a href="/">Forgot Password?</a>
        <input class="btn" type="submit" value="Sign In" />
      </form>
      <div class="container-sign-with">
        <div class="title">
          <div> </div>
          <p>Or sign in with</p>
          <div> </div>
        </div>
        <div class="list-social">
          <button class="sign-with" onclick={loginWithGithub}>
            Github
          </button>
          <button class="sign-with" onclick={loginWithGoogle}>
            Google
          </button>
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
  );
}
