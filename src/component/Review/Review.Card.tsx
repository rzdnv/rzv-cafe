import { Avatar } from "@heroui/react";
import type { ReviewItem } from "../../types/order";

export default function ReviewCard({
  review,
  menuName,
}: {
  review: ReviewItem;
  menuName: string;
}) {
  return (
    <div
      key={review.id}
      className="flex flex-col p-5 w-96 h-64 shrink-0 rounded-lg border border-gray-200 shadow-md bg-white"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Avatar
          size="md"
          src={`https://avatar.iran.liara.run/public?username=${review.reviewer_name}`}
        />
        <h2 className="font-semibold text-lg">{review.reviewer_name}</h2>
      </div>

      {/* Comment box */}
      <div className="flex-1 overflow-y-auto text-base leading-relaxed my-1 bg-gray-100 p-3 rounded-md">
        " {review.comment} ."
      </div>

      {/* Rating */}
      <div className="flex gap-2 items-center">
        <p className="font-semibold">⭐ {review.rating}</p>
        <p className="text-sm italic">Ordered: {menuName}</p>
      </div>
    </div>
  );
}
