import { logout } from "../../utils/users/logout";

export function Logout() {
  return <button onclick={logout}>Logout</button>;
}
