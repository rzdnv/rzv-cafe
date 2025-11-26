import {
  deleteOrder,
  getOrders,
  getOrderById,
  updateOrder,
} from "../../../services/order.service";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// HEROUI -----------------------
import { Spinner } from "@heroui/react";
import { Button } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
} from "@heroui/react";

// -----------------------

interface MenuItem {
  name: string;
  image_url: string;
}

interface CartItem {
  menuItemId: string;
  quantity: number;
  menuItem: MenuItem;
}

interface OrderType {
  id: string;
  customer_name: string;
  table_number: number;
  total: number;
  status: "PROCESSING" | "COMPLETED";
}

type ChipColor = "success" | "warning" | "danger" | "default";

const Orders = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrderId, setSelectedOrderId] = useState<string>();

  function getChipColor(status: string): ChipColor {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "PROCESSING":
        return "warning";
      case "CANCELLED":
        return "danger";
      default:
        return "default";
    }
  }

  // ----------------------------------------------------------------
  // FETCH ORDERS (REPLACE useEffect)
  // ----------------------------------------------------------------
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const result = await getOrders();
      return result.data; // karena getOrders return.data
    },
  });

  // ----------------------------------------------------------------
  // GET : DETAIL ORDER
  // ----------------------------------------------------------------

  const { data: order, isLoading: isDetailLoading } = useQuery({
    queryKey: ["menuDetail", selectedOrderId],
    queryFn: async () => {
      const result = await getOrderById(selectedOrderId as string);
      return result;
    },
    enabled: !!selectedOrderId,
  });

  const handleOpenDetail = () => {
    onOpen();
  };

  const handleClose = () => {
    setSelectedOrderId(undefined);
    onClose();
  };

  // ----------------------------------------------------------------
  // MUTATION: UPDATE ORDER
  // ----------------------------------------------------------------
  const completeOrderMutation = useMutation({
    mutationFn: async (id: string) => updateOrder(id, { status: "COMPLETED" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  // ----------------------------------------------------------------
  // MUTATION: DELETE ORDER
  // ----------------------------------------------------------------
  const deleteOrderMutation = useMutation({
    mutationFn: async (id: string) => deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleCompleteOrder = (id: string) => {
    completeOrderMutation.mutate(id);
  };

  const handleDeleteOrder = (id: string) => {
    deleteOrderMutation.mutate(id);
  };

  // ----------------------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-w-screen min-h-screen justify-center items-center text-2xl font-bold">
        <Spinner
          classNames={{ label: "text-foreground mt-4" }}
          label="Loading"
          variant="wave"
        />
      </div>
    );
  }

  return (
    <main className="container p-5">
      <section className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-slate-800 font-bold">Order List</h1>
        <div className="flex flex-row gap-2.5">
          <Link to="/create">
            <Button color="primary">Create Order</Button>
          </Link>
          <Button color="default" variant="bordered" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </section>

      <section>
        <Table aria-label="Order Table" className="min-w-full ">
          <TableHeader>
            <TableColumn className="text-center font-semibold">No</TableColumn>
            <TableColumn className="text-center font-semibold">
              Customer Name
            </TableColumn>
            <TableColumn className="text-center font-semibold">
              Table
            </TableColumn>
            <TableColumn className="text-center font-semibold">
              Total
            </TableColumn>
            <TableColumn className="text-center font-semibold">
              Status
            </TableColumn>
            <TableColumn className="text-center font-semibold">
              Actionn
            </TableColumn>
          </TableHeader>
          <TableBody>
            {orders.map((order: OrderType, index: number) => (
              <TableRow key={order.id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">
                  {order.customer_name}
                </TableCell>
                <TableCell className="text-center">
                  {order.table_number}
                </TableCell>
                <TableCell className="text-center">{`$ ${order.total}`}</TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Chip
                      color={getChipColor(order.status)}
                      size="md"
                      variant="flat"
                    >
                      {order.status}
                    </Chip>
                  </div>
                </TableCell>
                <TableCell className="flex justify-center gap-2.5">
                  <Button
                    onPress={() => {
                      setSelectedOrderId(order.id);
                      handleOpenDetail();
                    }}
                  >
                    Detail
                  </Button>

                  {order.status === "PROCESSING" && (
                    <Button
                      onPress={() => handleCompleteOrder(order.id)}
                      color="success"
                      className="text-white"
                    >
                      Completed
                    </Button>
                  )}

                  {order.status === "COMPLETED" && (
                    <Button
                      onPress={() => handleDeleteOrder(order.id)}
                      color="danger"
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Detail Order */}
        <Modal isOpen={isOpen} size="lg" onClose={handleClose}>
          <ModalContent>
            <>
              <ModalHeader>
                {isDetailLoading ? "Loading..." : `Order #${order?.id}`}
              </ModalHeader>

              <ModalBody>
                {isDetailLoading ? (
                  <Spinner />
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row">
                      <div className="flex-1 ">
                        <div className="flex flex-col gap-1">
                          <h2>Customer :</h2>
                          <Chip color="default" variant="bordered">
                            {order?.customer_name}
                          </Chip>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2>Table :</h2>
                          <Chip color="default" variant="bordered">
                            {order?.table_number}
                          </Chip>
                        </div>
                      </div>
                      <div className="flex-1 ">
                        <div className="flex flex-col gap-1">
                          <h2>Status :</h2>
                          <Chip color="default" variant="bordered">
                            {order?.status}
                          </Chip>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2>Total :</h2>
                          <Chip color="default" variant="bordered">
                            ${order?.total}
                          </Chip>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Order Items
                      </h3>

                      <div className="flex flex-col gap-3">
                        {order?.cart?.map((item: CartItem) => (
                          <div
                            key={item.menuItemId}
                            className="flex gap-3 p-3 rounded-md shadow-sm bg-gray-200"
                          >
                            <Image
                              src={item.menuItem.image_url}
                              alt={item.menuItem.name}
                              className="w-16 h-16 rounded-md object-cover"
                            />

                            <div>
                              <p className="font-semibold">
                                {item.menuItem.name}
                              </p>
                              <p>Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
        {/* Detail Order */}
      </section>
    </main>
  );
};

export default Orders;
