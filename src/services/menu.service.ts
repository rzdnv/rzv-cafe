import { api } from "../api/axios";

export const getMenu = async (category?: string) => {
  const response = await api.get("/menu", {
    params: { category },
  });
  return response.data;
};

export const getMenuDetail = async (id?: string) => {
  const response = await api.get(`/menu/${id}`);
  return {
    menu: response.data.menuItem ?? {},
    reviews: response.data.reviews ?? {},
  };
};

// export const getMenu = async (category?: string) => {
//   let url = `${environment.API_URL}/menu?page=1&pageSize=25`;
//   if (category) {
//     url += `&category=${category}`;
//   }
//   const result = await fetchAPI(url, {
//     method: "GET",
//   }).then((data) => data);

//   return result;
// };
