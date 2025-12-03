import type { MenuItem } from "../../../types/menu";
import { Button } from "../../ui/button";

export default function MenuCard({
  item,
  img,
}: {
  item: MenuItem;
  img: string;
}) {
  return (
    <div
      className="w-56 shrink-0 rounded-lg shadow-lg overflow-hidden bg-white 
    hover:outline-2 hover:outline-aqua-deep-800 md:hover:-translate-2 md:duration-300 ease-in-out"
    >
      <div className="aspect-square overflow-hidden">
        <img src={img} className="object-cover w-full h-full" />
      </div>
      <div className="flex justify-between p-4">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <h2 className="text-lg">${item.price}</h2>
      </div>
      <div className="px-4 pb-4">
        <Button
          size={"lg"}
          className="w-full p-4 bg-aqua-deep-900 hover:bg-aqua-deep-600"
        >
          add to cart
        </Button>
      </div>
    </div>
  );
}
