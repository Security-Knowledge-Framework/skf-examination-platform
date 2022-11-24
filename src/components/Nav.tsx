import { isUserLoggedIn } from "../db/users/isLogin";

export function Nav() {
  return (
    <ul>
      <li>
        <a href="/">Home</a>
      </li>

      {isUserLoggedIn() && (
        <li>
          <a href="/profile">Profile</a>
        </li>
      )}
      {isUserLoggedIn() && (
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
      )}
      {!isUserLoggedIn() && (
        <li>
          <a href="/login">Login</a>
        </li>
      )}
      {!isUserLoggedIn() && (
        <li>
          <a href="/register">Register</a>
        </li>
      )}
      <li>
        <a href="/labs">Labs</a>
      </li>
    </ul>
  );
}
