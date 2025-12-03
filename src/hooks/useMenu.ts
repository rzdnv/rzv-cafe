import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../services/menu.service";

export const useMenu = (category?: string) => {
  return useQuery({
    queryKey: ["menus", category], // cache berbeda tiap kategori
    queryFn: async () => {
      const res = await getMenu(category === "All" ? undefined : category);
      return res.data;
    },
  });
};
