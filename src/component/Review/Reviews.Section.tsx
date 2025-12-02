import { useReview } from "../../hooks/useReview";
import { useMenu } from "../../hooks/useMenu";
import type { MenuItem, ReviewItem } from "../../types/order";
import ReviewCard from "./Review.Card";

export default function ReviewsSection() {
  const { data: reviews } = useReview();
  const { data: menus } = useMenu();
  const getItemName = (id: string) => {
    const itemFound = menus?.find((m: MenuItem) => m.id === id);
    return itemFound?.name ?? "Cappuccino";
  };

  return (
    <section id="review" className="p-12">
      <div className="flex flex-col gap-4">
        <h2 className="font-mono text-4xl font-bold">What People Say</h2>
        <div className="flex gap-4 p-4 overflow-x-auto scrollbar-hide">
          {reviews?.map((review: ReviewItem) => (
            <ReviewCard
              key={review.id}
              review={review}
              menuName={getItemName(review.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
