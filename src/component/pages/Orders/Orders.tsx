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

import styles from "./Orders.module.css";
import {
  deleteOrder,
  getOrders,
  updateOrder,
} from "../../../services/order.service";
import Button from "../../ui/Buttton";

import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface OrderType {
  id: string;
  customer_name: string;
  table_number: number;
  total: number;
  status: "PROCESSING" | "COMPLETED";
}

const Orders = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    return <p>Loading orders...</p>;
  }

  return (
    <main className={styles.order}>
      <section className={styles.header}>
        <h1 className={styles.title}>Order List</h1>
        <div className={styles.button}>
          <Link to="/create">
            <Button>Create Order</Button>
          </Link>
          <Button color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </section>

      <section>
        <table
          border={1}
          className={styles.table}
          cellSpacing={0}
          cellPadding={10}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Customer Name</th>
              <th>Table</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order: OrderType, index: number) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customer_name}</td>
                <td>{order.table_number}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
                <td className={styles.action}>
                  <Link to={`/orders/${order.id}`}>
                    <Button>Detail</Button>
                  </Link>

                  {order.status === "PROCESSING" && (
                    <Button
                      onClick={() => handleCompleteOrder(order.id)}
                      color="success"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Orders;
