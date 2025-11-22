// import { environment } from "../constants/environment";
// import { fetchAPI } from "../utils/fetch";
// import { getLocalStorage } from "../utils/storage";

import { api } from "../api/axios";

// ----------------------

// export const getOrders = async () => {
//   const url = `${environment.API_URL}/orders?page=1&pageSize=20`;
//   const result = await fetchAPI(url, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${getLocalStorage("auth")}`,
//     },
//   }).then((data) => data);

//   return result;
// };

export const getOrders = async () => {
  const response = await api.get("/orders", {
    params: { page: 1, pageSize: 20 },
  });
  return response.data;
};

// ----------------------

// export const getOrderById = async (id: string) => {
//   const url = `${environment.API_URL}/orders/${id}`;
//   const result = await fetchAPI(url, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${getLocalStorage("auth")}`,
//     },
//   }).then((data) => data);

//   return result;
// };

export const getOrderById = async (id: string) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// ----------------------

// export const createOrder = async (payload: {
//   customerName: string;
//   tableNumber: number;
//   cart: { menuItemId: string; quantity: number; notes: string }[];
// }) => {
//   const result = await fetchAPI(`${environment.API_URL}/orders`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${getLocalStorage("auth")}`,
//     },
//     body: JSON.stringify(payload),
//   });

//   return result;
// };

export const createOrder = async (payload: {
  customerName: string;
  tableNumber: number;
  cart: { menuItemId: string; quantity: number; notes: string }[];
}) => {
  const response = await api.post("/orders", payload);
  return response.data;
};

// ----------------------

// export const deleteOrder = async (id: string) => {
//   const result = await fetchAPI(`${environment.API_URL}/orders/${id}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${getLocalStorage("auth")}`,
//     },
//   });

//   return result;
// };

export const deleteOrder = async (id: string) => {
  const { data } = await api.delete(`/orders/${id}`);
  return data;
};

// ----------------------

// export const updateOrder = async (
//   id: string,
//   payload: {
//     status: string;
//   }
// ) => {
//   const result = await fetchAPI(`${environment.API_URL}/orders/${id}`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${getLocalStorage("auth")}`,
//     },
//     body: JSON.stringify(payload),
//   });

//   return result;
// };

export const updateOrder = async (id: string, payload: { status: string }) => {
  const { data } = await api.put(`/orders/${id}`, payload);
  return data;
};
