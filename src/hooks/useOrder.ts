import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/order.service";

export const useOrder = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => (await getOrders()).data,
  });
};
