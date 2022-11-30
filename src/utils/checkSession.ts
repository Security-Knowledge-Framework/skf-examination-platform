export function checkSession(cookie: string | null) {
  if (!cookie) return false;
  const cookies = cookie.split(";");
  const session = cookies.find((cookie) => cookie.includes("loggedIn"));
  if (!session) return false;
  const islogged = session.split("=")[1];
  if (islogged !== "true") return false;
  return true;
}
