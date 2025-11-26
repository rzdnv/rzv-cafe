import type { RouteObject } from "react-router-dom";
import Login from "../component/pages/Login";
import CreateOrder from "../component/pages/CreateOrder/CreateOrder";
import Home from "../component/pages/Home";
import Orders from "../component/pages/Orders";
import ProtectedRoute from "./ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create",
    element: (
      <ProtectedRoute>
        <CreateOrder />
      </ProtectedRoute>
    ),
  },
];

export default routes;
