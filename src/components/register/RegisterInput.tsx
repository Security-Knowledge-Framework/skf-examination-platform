import { Component, createSignal, Show } from "solid-js";
import { useForm } from "./useRegisterForm";

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
    <>
      <form onSubmit={handleSubmit}>
        <label for="email">Email:</label>
        <input
          type="text"
          id="email"
          value={form.email}
          onChange={updateFormField("email")}
        />
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={updateFormField("password")}
        />
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={form.confirmPassword}
          onChange={updateFormField("confirmPassword")}
        />
        <input type="submit" value="Register" />
      </form>
      <Show when={error()}>
        <div class="error">{error}</div>
      </Show>
      <Show when={message()}>
        <div class="message">{message}</div>
      </Show>
    </>
  );
};
