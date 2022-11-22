import { getUserData } from "./getUserData";

// TODO: USE STORE
export async function isLogin() {
  const user = await getUserData();
  return user !== null;
}
