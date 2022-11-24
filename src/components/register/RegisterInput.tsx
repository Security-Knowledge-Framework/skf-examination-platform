import { Component, createSignal, Show } from "solid-js";
import { useForm } from "./useRegisterForm";
import {
  loginWithGithub,
  loginWithGoogle,
} from "../../db/users/loginWithProvider";

export const RegisterInput: Component = () => {
  const { form, updateFormField, submit } = useForm();

  const [error, setError] = createSignal("");
  const [message, setMessage] = createSignal("");

  async function handleSubmit(event: Event) {
    event.preventDefault();

    if (
      form.email === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    const { error: submitError, message } = await submit(form);
    if (submitError && message) {
      setError(message);
    } else {
      setMessage("Registration successful");
      setInterval(() => {
        setMessage("");
        location.href = "/login";
      }, 3000);
    }
  }

  return (
    <div class="register-form">
      <h1>Register</h1>
      <form class="form" onSubmit={handleSubmit}>
        <div class="item-input">
          <label for="email">Email:</label>
          <input
            type="text"
            id="email"
            value={form.email}
            onChange={updateFormField("email")}
          />
        </div>
        <div class="item-input">
          {" "}
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={updateFormField("password")}
          />
        </div>
        <div class="item-input">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={updateFormField("confirmPassword")}
          />
        </div>
        <input class="btn" type="submit" value="Register" />
      </form>
      <Show when={error()}>
        <div class="error">{error}</div>
      </Show>
      <Show when={message()}>
        <div class="message">{message}</div>
      </Show>

      <div class="container-sign-with">
        <div class="title">
          <div> </div>
          <p>Or sign up with</p>
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
};
