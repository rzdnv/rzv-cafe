import { api } from "../api/axios";

export const getReviews = async () => {
  const response = await api.get("/reviews");
  return response.data;
};

export const createReview = async (payload: {
  reviewerName: string;
  rating: number;
  comment: string;
}) => {
  const { data } = await api.post("/reviews", payload);
  return data;
};
