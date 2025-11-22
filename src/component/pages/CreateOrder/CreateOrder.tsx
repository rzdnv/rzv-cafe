import { useEffect, useState, type FormEvent } from "react";
import styles from "./CreateOrder.module.css";
import { getMenu } from "../../../services/menu.service";
import { createOrder } from "../../../services/order.service";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../ui/Buttton";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import type { CartItem, MenuItem } from "../../../types/order";
import { filters, tables } from "./CreateOrder.constants";

const CreateOrder = () => {
  const [menu, setMenu] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [carts, setCarts] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const result = await getMenu(searchParams.get("category") as string);
      setMenu(result.data);
    };
    fetchMenu();
  }, [searchParams]);

  const handleAddToCart = (type: string, id: string, name: string) => {
    const itemIsInCart = carts.find((item: CartItem) => item.id === id);
    if (type === "increment") {
      if (itemIsInCart) {
        setCarts(
          carts.map((item: CartItem) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        setCarts([...carts, { id, name, quantity: 1 }]);
      }
    } else {
      if (itemIsInCart && itemIsInCart.quantity <= 1) {
        setCarts(carts.filter((item: CartItem) => item.id !== id));
      } else {
        setCarts(
          carts.map((item: CartItem) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    }
  };

  const handleOrder = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const payload = {
      customerName: form.customerName.value,
      tableNumber: form.tableNumber.value,
      cart: carts.map((item: CartItem) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        notes: "",
      })),
    };
    await createOrder(payload);
    window.location.href = "/orders";
  };

  return (
    <div className={styles.create}>
      <div className={styles.menu}>
        <h1>Explore Our Best Menu</h1>
        <div className={styles.filter}>
          {filters.map((filter) => (
            <Button
              type="button"
              color={
                (!searchParams.get("category") && filter === "All") ||
                filter === searchParams.get("category")
                  ? "primary"
                  : "secondary"
              }
              onClick={() =>
                setSearchParams(filter === "All" ? {} : { category: filter })
              }
              key={filter}
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className={styles.list}>
          {menu.map((item: MenuItem) => (
            <div className={styles.item} key={item.id}>
              <img
                src={item.image_url}
                alt={item.name}
                className={styles.image}
              />
              <h2>{item.name}</h2>
              <div className={styles.bottom}>
                <p className={styles.price}>${item.price}</p>
                <Button
                  type="submit"
                  onClick={() =>
                    handleAddToCart("increment", item.id, item.name)
                  }
                >
                  Order
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form className={styles.form} onSubmit={handleOrder}>
        <div>
          <div className={styles.header}>
            <h2 className={styles.title}>Customer Information</h2>
            <Link to="/orders">
              <Button color="secondary">Cancel</Button>
            </Link>
          </div>
          <div className={styles.input}>
            <Input
              id="name"
              label="Name"
              name="customerName"
              placeholder="Insert Name"
              required
            />
            <Select
              name="tableNumber"
              id="table"
              label="Table Number"
              options={tables}
            />
          </div>
        </div>
        <div>
          <div className={styles.header}>
            <h2 className={styles.title}>Current Order</h2>
          </div>
          {carts.length > 0 ? (
            <div className={styles.cart}>
              {carts.map((item: CartItem) => (
                <div className={styles.cartItem} key={item.id}>
                  <h4 className={styles.name}>{item.name}</h4>
                  <div className={styles.quantity}>
                    <Button
                      type="button"
                      onClick={() =>
                        handleAddToCart("decrement", item.id, item.name)
                      }
                      color="secondary"
                    >
                      -
                    </Button>
                    <div className={styles.number}>{item.quantity}</div>
                    <Button
                      type="button"
                      onClick={() =>
                        handleAddToCart("increment", item.id, item.name)
                      }
                      color="secondary"
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="submit">Order</Button>
            </div>
          ) : (
            <div className={styles.cart}>
              <h4>Cart is empty</h4>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
