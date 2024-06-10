import MainLayout from "../layout/main-layout";
import Agents from "../pages/views/agents";
import Dashboard from "../pages/views/dashboard";
import Settings from "../pages/views/settings";
import Updates from "../pages/views/updates";
import AuthGuard from "../utilities/constant/private-route";


const MainRoutes = {
  path: "/",
  element: (
    // <AuthGuard>
      <MainLayout />
    // </AuthGuard>
  ),
  children: [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/agents",
      element: <Agents />,
    },
    {
      path: "/updates",
      element: <Updates />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
  ],
};

export default MainRoutes;
