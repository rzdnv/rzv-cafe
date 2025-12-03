import { useQuery } from "@tanstack/react-query";
import { getMenuDetail } from "../services/menu.service";

export const useDetailMenu = (id?: string) => {
  return useQuery({
    queryKey: ["menuDetail", id],
    queryFn: async () => {
      const result = await getMenuDetail(id);
      return result.menu;
    },
    enabled: !!id,
  });
};
