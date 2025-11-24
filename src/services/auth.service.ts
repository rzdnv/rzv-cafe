import type { ILogin } from "../types/auth";
import { api } from "../api/axios";

export const login = async (payload: ILogin) => {
  const { data } = await api.post("/auth/login", payload);

  console.log("=== LOGIN RESPONSE ===");
  console.log(data);

  // simpan token (FIELD SESUAI BACKEND)
  localStorage.setItem("auth", data.token);

  return data;
};

// -----------------

// import { setLocalStorage } from "../utils/storage";

// export const login = async (payload: ILogin) => {
//   const { data } = await api.post("/auth/login", payload);
//   setLocalStorage("auth", data.token);
//   return data;
// };

// -----------------

// import { environment } from "../constants/environment";
// import { fetchAPI } from "../utils/fetch";

// export const login = async (payload: ILogin) => {
//   const result = await fetchAPI(`${environment.API_URL}/auth/login`, {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
//   return result;
// };
