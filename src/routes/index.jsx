import { useRoutes } from "react-router-dom";
import Login from "../pages/auth/login";
import MainRoutes from "./main-routes"

// ================|| ROUTING RENDER ||================ //

export default function ThemeRoutes() {
  return useRoutes([
    // Landing,
    MainRoutes,
    { path: "/login", element: <Login /> },
  ]);
}
