import { logout } from "../../db/users/logout";

export function Logout() {
  return <button onclick={logout}>Logout</button>;
}
