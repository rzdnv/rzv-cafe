import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
import { useDisclosure } from "@heroui/react";

// -----------------------
import { useOrder } from "@/hooks/useOrder";
import { useDetailOrder } from "@/hooks/useDetailOrder";
import { useCompleteOrder } from "@/hooks/useCompleteOrder";
import { useDeleteOrder } from "@/hooks/useDeleteOrder";

// -----------------------
import { ModalDetailOrder } from "../component/ModalDetailOrder";

// -----------------------
import type { OrderType } from "@/types/order";

type ChipColor = "success" | "warning" | "danger" | "default";

const Orders = () => {
  const navigate = useNavigate();
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

  // GET ORDERS
  const { data: orders, isLoading } = useOrder();

  // GET : DETAIL ORDER
  const { data: order, isLoading: isDetailLoading } =
    useDetailOrder(selectedOrderId);

  const handleOpenDetail = () => {
    onOpen();
  };

  const handleClose = () => {
    setSelectedOrderId(undefined);
    onClose();
  };

  // MUTATION: UPDATE ORDER
  const { mutate: updateOrder } = useCompleteOrder();
  const handleCompleteOrder = (id: string) => {
    updateOrder(id);
  };

  // MUTATION: DELETE ORDER
  const { mutate: deleteOrder } = useDeleteOrder();
  const handleDeleteOrder = (id: string) => {
    deleteOrder(id);
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
          <Button color="default" variant="bordered" onPress={handleLogout}>
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
        <ModalDetailOrder
          order={order}
          isDetailLoading={isDetailLoading}
          openModal={isOpen}
          handleClose={handleClose}
        />
        {/* Detail Order */}
      </section>
    </main>
  );
};

export default Orders;
