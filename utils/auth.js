export function saveAuth(token, user, remember) {
  const storage = remember ? localStorage : sessionStorage;

  // ✅ client-side storage
  storage.setItem("token", token);
  storage.setItem("user", JSON.stringify(user));

  // ✅ cookie for middleware (IMPORTANT)
  document.cookie = `token=${token}; path=/; ${
    remember ? "max-age=604800;" : ""
  }`;
}

// ======================
// TOKEN
// ======================
export function getToken() {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token")
  );
}

// ======================
// USER
// ======================
export function getUser() {
  if (typeof window === "undefined") return null;

  const user =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  return user ? JSON.parse(user) : null;
}

// ======================
// LOGOUT
// ======================
export function logout() {
  localStorage.clear();
  sessionStorage.clear();

  // ✅ remove cookie
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}
