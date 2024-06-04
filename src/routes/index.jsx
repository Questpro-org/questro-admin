import { useRoutes } from "react-router-dom";
import Login from "../pages/auth/login";


// ================|| ROUTING RENDER ||================ //

export default function ThemeRoutes() {
  return useRoutes([
    // Landing,
    MainRoutes,
    { path: "/login", element: <Login /> },
  ]);
}
