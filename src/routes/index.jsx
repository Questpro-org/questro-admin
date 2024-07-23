import { useRoutes } from "react-router-dom";
import Login from "../pages/auth/login";
import MainRoutes from "./main-routes"
import ForgotPassword from "../pages/auth/forgot-password";
import ResetPassword from "../pages/auth/reset-password";
import SetPassword from "../pages/auth/set-password";

// ================|| ROUTING RENDER ||================ //

export default function ThemeRoutes() {
  return useRoutes([
    // Landing,
    MainRoutes,
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password/:id", element: <ResetPassword /> },
    { path: "/setpassword/:id", element: <SetPassword /> },
  ]);
}
