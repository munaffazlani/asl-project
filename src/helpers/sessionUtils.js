import { Map } from "immutable";

export function clearToken() {
  localStorage.removeItem("remember_me");
  localStorage.removeItem("user_token");
  sessionStorage.removeItem("user_token");
  sessionStorage.removeItem("refresh_token");
  localStorage.removeItem("refresh_token");
}

export function getToken() {
  try {
    const idToken =
      localStorage.getItem("user_token") ||
      sessionStorage.getItem("user_token");
    return new Map({ idToken });
  } catch (err) {
    clearToken();
    return new Map();
  }
}
