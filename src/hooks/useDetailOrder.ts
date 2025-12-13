import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../services/order.service";

export const useDetailOrder = (id?: string) => {
  return useQuery({
    queryKey: ["orderDetail", id],
    queryFn: async () => {
      const response = await getOrderById(id!);
      return response.data; // ambil datanya saja
    },
    enabled: !!id, // query hanya jalan kalau id ada
    staleTime: 1000 * 60, // optional: biar tidak fetch ulang sering
  });
};
