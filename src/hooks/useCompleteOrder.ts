import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "@/services/order.service";

export const useCompleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) =>
      (await updateOrder(id, { status: "COMPLETED" })).data,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orderDetail", id] });
    },
  });
};
