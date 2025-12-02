import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../services/review.service";

export const useReview = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => (await getReviews()).data,
  });
};
