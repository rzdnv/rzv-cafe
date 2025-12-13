import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder } from "@/services/order.service";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => (await deleteOrder(id)).data,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.removeQueries({ queryKey: ["orderDetail", id] });
    },
  });
};
