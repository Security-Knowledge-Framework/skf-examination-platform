export async function setUserSSRSession(
  access_token: string,
  refresh_token: string
) {
  // TODO: HANDLE ERRORS
  await fetch("/api/login-jwt", {
    method: "POST",
    body: JSON.stringify({
      access_token: access_token,
      refresh_token: refresh_token,
    }),
  });
}
