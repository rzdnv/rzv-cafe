import type { RouteObject } from "react-router-dom";
import Login from "../feature/Login";
import CreateOrder from "../feature/CreateOrder";
import Home from "../feature/Home";
import Orders from "../pages/Orders";
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
