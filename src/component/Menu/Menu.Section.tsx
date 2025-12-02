import { useMenu } from "../../hooks/useMenu";
import MenuCard from "./MenuCard";
import type { MenuItem } from "../../types/order";

import {
  almonddanish,
  americano,
  applepie,
  bluberrycake,
  blueberrymuffin,
  cafélatte,
  chaitealatte,
  cheesecake,
  cappuccino,
  chickenpesto,
} from "../../assets/menu";

export default function MenuSection() {
  const { data: menus } = useMenu();

  const menuImages: Record<string, string> = {
    americano,
    cheesecake,
    bluberrycake,
    blueberrymuffin,
    cappuccino,
    applepie,
    almonddanish,
    chaitealatte,
    cafélatte,
    chickenpesto,
  };

  return (
    <section id="menu" className="p-12">
      <h2 className="text-4xl font-mono font-bold mb-4">Our Specials</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {menus?.map((item: MenuItem) => {
          const key = item.name.toLowerCase().replace(/\s+/g, "");
          const imgSrc = menuImages[key];
          return <MenuCard key={item.id} item={item} img={imgSrc} />;
        })}
      </div>
    </section>
  );
}
