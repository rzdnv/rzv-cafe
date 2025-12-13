import { Card, CardBody, CardFooter, Button, Image } from "@heroui/react";
import type { MenuItem } from "../../../types/menu";

import { ShoppingCart } from "lucide-react";

export const MenuCard = ({
  item,
  onAdd,
}: {
  item: MenuItem;
  onAdd: () => void;
}) => {
  return (
    <Card shadow="sm">
      <CardBody className="p-0 overflow-visible">
        <Image
          alt={item.name}
          src={item.image_url}
          className="w-full aspect-4/3 object-cover"
          radius="lg"
          shadow="sm"
        />
      </CardBody>

      <CardFooter className="flex flex-col gap-4 p-4 h-full justify-between">
        <div className="w-full">
          <h1 className="text-lg font-semibold text-slate-900">{item.name}</h1>
          <p className="text-medium text-slate-900">{item.description}</p>
        </div>

        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-medium text-slate-900">
            Price: ${item.price}
          </span>
          <Button color="primary" onPress={onAdd}>
            <ShoppingCart />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
