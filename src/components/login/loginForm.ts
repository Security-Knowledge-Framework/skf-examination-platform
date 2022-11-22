import { createStore } from "solid-js/store";
import { loginUser } from "../../db/users/loginUser";

type FormFields = {
  [key in fields]: string;
};

type fields = "email" | "password";

export function useForm() {
  const [form, setForm] = createStore<FormFields>({
    email: "",
    password: "",
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
  };

  console.log({ dataToSubmit });
  const loginResponse = await loginUser(
    dataToSubmit.email,
    dataToSubmit.password
  );

  console.log({ loginResponse });

  return loginResponse;
}
