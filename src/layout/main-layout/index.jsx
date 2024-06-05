import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
// import logo from "../../assets/logo.png";
import classNames from "classnames";

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarBackgroundCheck = pathname.split("/")[1];
  const showSidebar = !pathname.startsWith("/notification");

  useEffect(() => {
    if (
      sidebarBackgroundCheck === "" ||
      sidebarBackgroundCheck === "dashboard" ||
      sidebarBackgroundCheck === "transactions" ||
      sidebarBackgroundCheck === "blacklist" ||
      sidebarBackgroundCheck === "blacklists" ||
      sidebarBackgroundCheck === "account" ||
      sidebarBackgroundCheck === "refunds" ||
      sidebarBackgroundCheck === "transaction" ||
      sidebarBackgroundCheck === "report" ||
      sidebarBackgroundCheck === "settings" ||
      sidebarBackgroundCheck === "mediation" ||
      sidebarBackgroundCheck === "payment" ||
      sidebarBackgroundCheck === "support" ||
      sidebarBackgroundCheck === "request" ||
      sidebarBackgroundCheck === "admins" ||
      sidebarBackgroundCheck === "analytics"
    ) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [sidebarBackgroundCheck]);

  return (
    <div className="max-w-1500 mx-auto flex flex-col md:flex-row pt-5">
      {showSidebar && (
        <aside
          className={classNames(
            "bg-gray-100  transition-all duration-300 h-[140vh] border-r border-gray-200",
            {
              "w-64": sidebarOpen,
              "w-0": !sidebarOpen,
            }
          )}
        >
          {/* <div className="p-4">
            <img src={logo} alt="logo" />
            <hr className="mt-8"/>
          </div> */}

          <Sidebar open={sidebarOpen} />
        </aside>
      )}
      <main
        className={classNames(
          "py-2 md:py-5 flex-grow transition-all duration-300",
          {
            "pl-12": sidebarOpen,
            "pl-2 md:pl-3.5": !sidebarOpen,
          }
        )}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
