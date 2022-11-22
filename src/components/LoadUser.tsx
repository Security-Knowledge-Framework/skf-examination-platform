import { onMount } from "solid-js";
import { getUserData } from "../db/users/getUserData";

export function LoadUser() {
  onMount(async () => {
    await getUserData();
  });
  return;
}
