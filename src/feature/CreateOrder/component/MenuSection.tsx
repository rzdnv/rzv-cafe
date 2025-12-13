import { useState } from "react";

// Type
import type { MenuItem } from "../../../types/menu";

// Constants
import { filters } from "../constants/CreateOrder.constants";

// Hook
import { useMenu } from "../../../hooks/useMenu";

// UI Component
import { Button } from "@heroui/react";

// Component
import { MenuCard } from "./MenuCard";
import { MenuSkeleton } from "./MenuSkeleton";

export const MenuSection = ({
  add,
}: {
  add: (id: string, name: string) => void;
}) => {
  // GET : MENU
  const [category, setCategory] = useState("All");
  const { data: Menus, isLoading } = useMenu(category);
  const skeletonCount = Menus?.length || 12;

  return (
    <div className="md:w-[70%]">
      <h1 className="text-2xl text-slate-900 font-bold">Menu</h1>

      {/* Filter start */}
      <div className="flex gap-4 my-4 ">
        {filters.map((filter) => (
          <Button
            type="button"
            color={category === filter ? "primary" : "default"}
            variant={category === filter ? "solid" : "bordered"}
            onPress={() => setCategory(filter)}
            key={filter}
          >
            {filter}
          </Button>
        ))}
      </div>
      {/* Filter End */}

      {/* Menu Start */}
      <div className="grid grid-cols-3 gap-4 mt-5">
        {/* Card */}
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, i) => {
              return <MenuSkeleton key={i} />;
            })
          : Menus.map((item: MenuItem) => (
              <MenuCard
                key={item.id}
                item={item}
                onAdd={() => add(item.id, item.name)}
              />
            ))}
      </div>
      {/* Menu End */}
    </div>
  );
};
