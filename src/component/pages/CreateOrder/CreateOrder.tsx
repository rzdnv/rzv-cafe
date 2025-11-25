import { useState, type FormEvent } from "react";
import styles from "./CreateOrder.module.css";
import { getMenu, getMenuDetail } from "../../../services/menu.service";
import { createOrder } from "../../../services/order.service";
import { Link } from "react-router-dom";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import type { CartItem, MenuItem } from "../../../types/order";
import { filters, tables } from "./CreateOrder.constants";

// ----------------
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/react";
import { addToast } from "@heroui/react";
import { Spinner } from "@heroui/react";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
// ----------------

const CreateOrder = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMenuId, setSelectedMenuId] = useState<string>();

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

  const [carts, setCarts] = useState<CartItem[]>([]);

  // Mengambil data menu
  const [category, setCategory] = useState("All");

  const { data, isLoading } = useQuery({
    queryKey: ["category", category],
    queryFn: async () => {
      const result = await getMenu(category === "All" ? undefined : category);
      return result.data;
    },
  });
  const Menus = data ?? [];
  // --------------------

  // Menu Detail
  // const { data: Mdetail = {}, isLoading: isDetailLoading } = useQuery({
  //   queryKey: ["menuItem", selectedMenuId],
  //   queryFn: async () => {
  //     if (!selectedMenuId) return null;
  //     const result = await getMenuDetail(selectedMenuId);
  //     return result.data;
  //   },
  //   enabled: !!selectedMenuId, // query jalan hanya kalau ada ID
  // });

  const { data: Mdetail, isLoading: isDetailLoading } = useQuery({
    queryKey: ["menuDetail", selectedMenuId],
    queryFn: async () => {
      const result = await getMenuDetail(selectedMenuId);
      return result.menu;
    },
    enabled: !!selectedMenuId,
  });

  // const { data: Mdetail = {} } = useQuery({
  //   queryKey: ["category", category],
  //   queryFn: async () => {
  //     const result = await getMenuDetail();
  //     return result.data;
  //   },
  // });

  // Add to cart
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
  // ------------------

  // Send Order
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
  // -----------

  // Loading state
  // if (isLoading) {
  //   return (
  //     <div className="flex min-w-screen min-h-screen justify-center items-center text-2xl font-bold">
  //       <Spinner
  //         classNames={{ label: "text-foreground mt-4" }}
  //         label="Loading"
  //         variant="wave"
  //         size="lg"
  //       />
  //     </div>
  //   );
  // }
  // ------------

  const handleOpenDetail = () => {
    onOpen();
  };

  const handleClose = () => {
    setSelectedMenuId(undefined);
    onClose();
  };

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
          {/* Card */}
          {isLoading ? (
            <div className="flex mt-20 ml-40 text-2xl font-bold">
              <Spinner
                classNames={{ label: "text-foreground mt-4" }}
                label="Loading"
                variant="wave"
                size="lg"
              />
            </div>
          ) : (
            Menus.map((item: MenuItem, index: number) => (
              <Card key={index} shadow="sm">
                <CardBody
                  className="overflow-visible p-0 "
                  onClick={() => {
                    setSelectedMenuId(item.id);
                    handleOpenDetail();
                  }}
                >
                  <Image
                    alt={item.name}
                    src={item.image_url}
                    className="w-full object-cover aspect-4/3"
                    radius="lg"
                    shadow="sm"
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-medium font-semibold text-slate-900">
                      {item.name}
                    </h1>
                    <h1 className="text-medium font-medium text-slate-900">
                      Price : ${item.price}
                    </h1>
                  </div>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleAddToCart("increment", item.id, item.name);
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
        {/* detail menu start */}
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalContent>
            <>
              <ModalHeader>
                {isDetailLoading ? "Loading..." : Mdetail?.name}
              </ModalHeader>
              <ModalBody>
                {isDetailLoading ? (
                  <Spinner />
                ) : (
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Image
                        className="aspect-square object-cover w-full rounded-lg"
                        src={Mdetail?.image_url}
                        alt={Mdetail?.name}
                      />
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                      <p>Description : {Mdetail?.description}</p>
                      <p className="font-semibold text-lg">
                        Price: ${Mdetail?.price}
                      </p>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isDisabled={!Mdetail}
                  onPress={() => {
                    handleAddToCart("increment", Mdetail.id, Mdetail.name);
                    handleClose();
                  }}
                >
                  Add to Cart
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>

        {/* detail menu end */}
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

// {
//   isLoading ? (
//     <div className="flex min-w-screen min-h-screen justify-center items-center text-2xl font-bold">
//       <Spinner
//         classNames={{ label: "text-foreground mt-4" }}
//         label="Loading"
//         variant="wave"
//         size="lg"
//       />
//     </div>
//   ) : (
//     <Card
//       key={index}
//       isPressable
//       shadow="sm"
//       onPress={() => {
//         setSelectedMenuId(item.id);
//         console.log(item.id);
//         handleOpenDetail();
//       }}
//     >
//       <CardBody className="overflow-visible p-0">
//         <Image
//           alt={item.name}
//           className="w-full object-cover h-[140px]"
//           radius="lg"
//           shadow="sm"
//           src={item.image_url}
//           width="100%"
//         />
//       </CardBody>
//       <CardFooter className="text-small justify-between ">
//         <b>{item.name}</b>
//         <p className="text-default-500"> $ {item.price}</p>
//       </CardFooter>
//     </Card>
//   );
// }
