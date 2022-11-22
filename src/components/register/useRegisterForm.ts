import { createStore } from "solid-js/store";
import { registerUser } from "../../utils/users/registerUser";

type FormFields = {
  [key in fields]: string;
};

type fields = "email" | "password" | "confirmPassword";

export function useForm() {
  const [form, setForm] = createStore<FormFields>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const updateFormField = (fieldName: fields) => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    setForm({
      [fieldName]: inputElement.value,
    });
  };

  return { form, submit, updateFormField };
}

async function submit(form: FormFields) {
  const dataToSubmit: FormFields = {
    email: form.email,
    password: form.password,
    confirmPassword: form.confirmPassword,
  };

  // console.log({ dataToSubmit });
  const registerResponse = await registerUser(
    dataToSubmit.email,
    dataToSubmit.password
  );

  return registerResponse;
}
