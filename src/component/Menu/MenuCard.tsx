import type { MenuItem } from "../../types/order";
// import { Button } from "@heroui/react";

export default function MenuCard({
  item,
  img,
}: {
  item: MenuItem;
  img: string;
}) {
  return (
    <div className="w-56 shrink-0 rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="aspect-square overflow-hidden">
        <img src={img} className="object-cover w-full h-full" />
      </div>
      <div className="flex justify-between p-4">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <h2 className="text-lg">${item.price}</h2>
      </div>
      <div className="px-4 pb-4">
        <button className="w-full p-4 bg-almond-400">add to cart</button>
      </div>
    </div>
  );
}
