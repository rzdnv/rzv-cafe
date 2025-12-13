import type { ILogin } from "../types/auth";
import { api } from "../../../api/axios";

export const login = async (payload: ILogin) => {
  const { data } = await api.post("/auth/login", payload);

  console.log("=== LOGIN RESPONSE ===");
  console.log(data);

  // simpan token (FIELD SESUAI BACKEND)
  localStorage.setItem("auth", data.token);

  return data;
};
