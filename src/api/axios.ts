import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth");

  // console.log("TOKEN DI LOCALSTORAGE:", token);

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  // console.log("HEADER YANG TERKIRIM:", config.headers);

  return config;
});
