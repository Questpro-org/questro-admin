import MainLayout from "../layout/main-layout";
import Agents from "../pages/views/agents";
import AgentDetails from "../pages/views/agents/agent-details";
import ActiveListings from "../pages/views/agents/agent-details/active-listing";
import Dashboard from "../pages/views/dashboard";
import Settings from "../pages/views/settings";
import Updates from "../pages/views/updates";
import PropertyUpdates from "../pages/views/updates/property-updates/index";
import PushNotification from "../pages/views/updates/push-notification";
import AuthGuard from "../utilities/constant/private-route";


const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
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
    {
      path: "/agent/:_id",
      element: <AgentDetails />,
    },
    {
      path: "/properties/:_id",
      element: <ActiveListings />,
    },
    {
      path: "/property/update",
      element: <PropertyUpdates />,
    },
    {
      path: "/push/notification",
      element: <PushNotification />,
    },
  ],
};

export default MainRoutes;
