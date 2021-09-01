import axios from "axios";
import { LOGIN_USER, AUTH_USER } from "./types.js";

export function loginUser(dataSubmit) {
  const request = axios
    .post("http://localhost:5000/api/route/reqLogin", dataSubmit, {
      withCredentials: true
    })
    .then(response => response.data);
  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function authenTication() {
  const request = axios
    .get("http://localhost:5000/api/route/status", {
      withCredentials: true
    })
    .then(response => response.data);
  return {
    type: AUTH_USER,
    payload: request
  };
}
