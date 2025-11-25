import { useState, type FormEvent } from "react";
import styles from "./CreateOrder.module.css";
import { getMenu } from "../../../services/menu.service";
import { createOrder } from "../../../services/order.service";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import type { CartItem, MenuItem } from "../../../types/order";
import { filters, tables } from "./CreateOrder.constants";

// ----------------
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/react";

const CreateOrder = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      addToast({
        title: "Success",
        description: "Order created successfully!",
        color: "success",
        variant: "solid",
      });
      navigate("/orders");
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "Failed to create order",
        color: "danger",
        variant: "solid",
      });
    },
  });

  // Mengambil data menu
  const [carts, setCarts] = useState<CartItem[]>([]);

  const [category, setCategory] = useState("All");

  const { data, isLoading } = useQuery({
    queryKey: ["category", category],
    queryFn: async () => {
      const result = await getMenu(category === "All" ? undefined : category);
      return result.data;
    },
  });

  const Menus = data ?? [];

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

  const handleOrder = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const payload = {
      customerName: form.customerName.value,
      tableNumber: form.tableNumber.value,
      cart: carts.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        notes: "",
      })),
    };

    mutation.mutate(payload);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-w-screen min-h-screen justify-center items-center text-2xl font-bold">
        <Spinner
          classNames={{ label: "text-foreground mt-4" }}
          label="Loading"
          variant="wave"
          size="lg"
        />
      </div>
    );
  }

  return (
    <div className={styles.create}>
      {/* Menus section start */}
      <div className={styles.menu}>
        <h1>Explore Our Best Menu</h1>
        {/* Filter start */}
        <div className={styles.filter}>
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
        <div className={styles.list}>
          {Menus.map((item: MenuItem) => (
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
        {/* Menu End */}
      </div>
      {/* Menus section End */}

      {/* Cart section start */}
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
      {/* Cart section end */}
    </div>
  );
};

export default CreateOrder;

// const handleOrder = async (e: FormEvent) => {
//   e.preventDefault();
//   const form = e.target as HTMLFormElement;
//   const payload = {
//     customerName: form.customerName.value,
//     tableNumber: form.tableNumber.value,
//     cart: carts.map((item: CartItem) => ({
//       menuItemId: item.id,
//       quantity: item.quantity,
//       notes: "",
//     })),
//   };
//   await createOrder(payload);
//   window.location.href = "/orders";
// };
