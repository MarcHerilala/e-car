import { fetchUtils } from "react-admin";
import Cookies from "js-cookie";

export const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({
      Accept: "application/json",
    });
  }

  const token = Cookies.get("token");
  if (token) {
    options.headers.set("Authorization", `Bearer ${token}`);
    console.log("io le token",token)
  }

  return fetchUtils.fetchJson(url, options);
};
