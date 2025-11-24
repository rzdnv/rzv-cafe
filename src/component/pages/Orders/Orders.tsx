import {
  deleteOrder,
  getOrders,
  updateOrder,
} from "../../../services/order.service";
// import Button from "../../ui/Buttton";

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

// -----------------------

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
            <TableColumn className="text-center">No</TableColumn>
            <TableColumn className="text-center">Customer Name</TableColumn>
            <TableColumn className="text-center">Table</TableColumn>
            <TableColumn className="text-center">Total</TableColumn>
            <TableColumn className="text-center">Status</TableColumn>
            <TableColumn className="text-center">Actionn</TableColumn>
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
                  <Link to={`/orders/${order.id}`}>
                    <Button>Detail</Button>
                  </Link>

                  {order.status === "PROCESSING" && (
                    <Button
                      onClick={() => handleCompleteOrder(order.id)}
                      color="success"
                      className="text-white"
                    >
                      Completed
                    </Button>
                  )}

                  {order.status === "COMPLETED" && (
                    <Button
                      onClick={() => handleDeleteOrder(order.id)}
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
      </section>
    </main>
  );
};

export default Orders;

// import { useEffect, useState } from "react";
// import styles from "./Orders.module.css";
// import {
//   deleteOrder,
//   getOrders,
//   updateOrder,
// } from "../../../services/order.service";
// import Button from "../../ui/Buttton";

// // ---------------------
// import { Link, useNavigate } from "react-router-dom";
// // import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // ---------------------

// interface OrderType {
//   id: string;
//   customer_name: string;
//   table_number: number;
//   total: number;
//   status: "PROCESSING" | "COMPLETED";
// }

// const Orders = () => {
//   const navigate = useNavigate();
//   // const queryClient = useQueryClient();

//   const [orders, setOrders] = useState<OrderType[]>([]);
//   const [refetchOrder, setRefetchOrder] = useState(true);

//   useEffect(() => {
//     if (refetchOrder) {
//       const fetchMenu = async () => {
//         const result = await getOrders();
//         setOrders(result.data); // aman → karena getOrders return data
//         setRefetchOrder(false);
//       };
//       fetchMenu();
//     }
//   }, [refetchOrder]);

//   const handleCompleteOrder = async (id: string) => {
//     await updateOrder(id, { status: "COMPLETED" }).then(() => {
//       setRefetchOrder(true);
//     });
//   };

//   const handleDeleteOrder = async (id: string) => {
//     await deleteOrder(id).then(() => {
//       setRefetchOrder(true);
//     });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("auth");
//     navigate("/login");
//   };

//   return (
//     <main className={styles.order}>
//       <section className={styles.header}>
//         <h1 className={styles.title}>Order List</h1>
//         <div className={styles.button}>
//           <Link to="/create">
//             <Button>Create Order</Button>
//           </Link>
//           <Button color="secondary" onClick={handleLogout}>
//             Logout
//           </Button>
//         </div>
//       </section>
//       <section>
//         <table
//           border={1}
//           className={styles.table}
//           cellSpacing={0}
//           cellPadding={10}
//         >
//           <thead>
//             <tr>
//               <th>No</th>
//               <th>Customer Name</th>
//               <th>Table</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, index) => (
//               <tr key={order.id}>
//                 <td>{index + 1}</td>
//                 <td>{order.customer_name}</td>
//                 <td>{order.table_number}</td>
//                 <td>${order.total}</td>
//                 <td>{order.status}</td>
//                 <td className={styles.action}>
//                   <Link to={`/orders/${order.id}`}>
//                     <Button>Detail</Button>
//                   </Link>
//                   {order.status === "PROCESSING" && (
//                     <Button
//                       onClick={() => handleCompleteOrder(order.id)}
//                       color="success"
//                     >
//                       Completed
//                     </Button>
//                   )}
//                   {order.status === "COMPLETED" && (
//                     <Button
//                       onClick={() => handleDeleteOrder(order.id)}
//                       color="danger"
//                     >
//                       Delete
//                     </Button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </main>
//   );
// };

// export default Orders;
