import MainLayout from "../layout/main-layout";
import Agents from "../pages/views/agents";
import AgentDetails from "../pages/views/agents/agent-details";
import ActiveListings from "../pages/views/agents/agent-details/active-listing";
import Dashboard from "../pages/views/dashboard";
import Notifications from "../pages/views/notify/index.jsx";
import Settings from "../pages/views/settings";
import Updates from "../pages/views/updates";
import PropertyUpdatesRoute from "../pages/views/updates/property-updates-route.jsx";
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
      path: "/notifications",
      element: <Notifications />,
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
      path: "/assets/update/:_id",
      element: <PropertyUpdatesRoute />,
    },
    {
      path: "/push/notification",
      element: <PushNotification />,
    },
  ],
};

export default MainRoutes;
