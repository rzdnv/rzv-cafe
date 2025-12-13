import { type FormEvent } from "react";
import { createOrder } from "../../../services/order.service";

// ----------------
import { useCartStore } from "../../../store/cart.store";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";

// Component
import { MenuSection } from "../component/MenuSection";
import { CartSection } from "../component/CartSection";

const CreateOrder = () => {
  const navigate = useNavigate();

  // MUTATION: CREATE ORDER
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

  // ADD  TO CART
  const { carts, add, remove } = useCartStore();

  // SEND ORDER
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

  return (
    <div className="flex flex-col gap-8 p-4 md:flex-row">
      <MenuSection add={add} />

      <CartSection
        onOrder={handleOrder}
        carts={carts}
        onRemove={(id) => remove(id)}
        onAdd={(id, name) => add(id, name)}
      />
    </div>
  );
};

export default CreateOrder;
