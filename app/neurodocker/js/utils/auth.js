import { API_HOST } from "../config";

let _csrfToken = null;
export async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${API_HOST}/csrf`, {
      credentials: "include"
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}
