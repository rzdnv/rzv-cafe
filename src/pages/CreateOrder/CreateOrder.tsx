import { useState, type FormEvent } from "react";
import { getMenu, getMenuDetail } from "../../services/menu.service";
import { createOrder } from "../../services/order.service";
import { Link } from "react-router-dom";
import type { CartItem, MenuItem } from "../../types/order";
import { filters, tables } from "./CreateOrder.constants";

// ----------------
import { useCartStore } from "../../store/cart.store";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Button, Input } from "@heroui/react";
import { addToast } from "@heroui/react";
import { Spinner } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
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

  // ----------------------------------------------------------------
  // MUTATION: CREATE ORDER
  // ----------------------------------------------------------------
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

  // ----------------------------------------------------------------
  // GET : MENU
  // ----------------------------------------------------------------
  const [category, setCategory] = useState("All");

  const { data: Menus, isLoading } = useQuery({
    queryKey: ["category", category],
    queryFn: async () => {
      const result = await getMenu(category === "All" ? undefined : category);
      return result.data;
    },
  });

  // ----------------------------------------------------------------
  // GET : DETAIL MENU
  // ----------------------------------------------------------------
  const { data: Mdetail, isLoading: isDetailLoading } = useQuery({
    queryKey: ["menuDetail", selectedMenuId],
    queryFn: async () => {
      const result = await getMenuDetail(selectedMenuId);
      return result.menu;
    },
    enabled: !!selectedMenuId,
  });

  const handleOpenDetail = () => {
    onOpen();
  };

  const handleClose = () => {
    setSelectedMenuId(undefined);
    onClose();
  };

  // ----------------------------------------------------------------
  // ADD  TO CART
  // ----------------------------------------------------------------
  const { carts, add, remove } = useCartStore();
  // ------------------

  // ----------------------------------------------------------------
  // SEND ORDER
  // ----------------------------------------------------------------
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
      {/* Menus section start */}
      <div className="md:w-[70%]">
        <h1 className="text-2xl text-slate-900 font-bold">
          Explore Our Best Menu
        </h1>
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
                    onPress={() => add(item.id, item.name)}
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
                    add(Mdetail.id, Mdetail.name);
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
      <form
        className="md:w-[30%] flex flex-col h-fit sticky p-4 gap-6 rounded-3xl"
        onSubmit={handleOrder}
      >
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Customer Information
            </h2>
            <Link to="/orders">
              <Button color="danger">Cancel</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4 p-4 rounded-2xl">
            <Input
              isRequired
              label="Name"
              labelPlacement="outside"
              name="name"
              placeholder="Enter Name"
              type="text"
              size="lg"
              variant="bordered"
              validate={(value) => {
                if (value.length < 3) {
                  return "Nama pengguna harus terdiri dari minimal 3 karakter.";
                }
              }}
            />
            <Select
              isRequired
              labelPlacement="outside"
              className="max-w-full"
              label="Table"
              placeholder="Select Table"
              variant="bordered"
              size="lg"
            >
              {tables.map((table) => (
                <SelectItem key={table.value}>{table.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold text-slate-900">
              Current Order
            </h2>
          </div>
          {carts.length > 0 ? (
            <div className="flex flex-col gap-4 p-4 bg-gray-200 rounded-2xl">
              {carts.map((item: CartItem) => (
                <div
                  className="flex flex-col justify-between gap-2 items-center"
                  key={item.id}
                >
                  <h4 className="text-base font-semibold ">{item.name}</h4>
                  <div className="flex w-full items-center justify-between font-bold">
                    <Button
                      type="button"
                      onPress={() => remove(item.id)}
                      color="danger"
                      variant="faded"
                    >
                      -
                    </Button>
                    <div className="w-6 text-center">{item.quantity}</div>
                    <Button
                      type="button"
                      onPress={() => add(item.id, item.name)}
                      color="success"
                      variant="faded"
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="submit" color="primary">
                Order
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-4 bg-gray-200 rounded-2xl">
              <h4 className="text-base font-semibold">Cart is empty</h4>
            </div>
          )}
        </div>
      </form>
      {/* Cart section end */}
    </div>
  );
};

export default CreateOrder;
