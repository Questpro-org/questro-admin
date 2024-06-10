import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
// import logo from "../../assets/logo.png";
import classNames from "classnames";
import Icon from "../../assets/icon";

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarBackgroundCheck = pathname.split("/")[1];
  const showSidebar = !pathname.startsWith("/notification");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (sidebarBackgroundCheck === "" || sidebarBackgroundCheck === "agents" || sidebarBackgroundCheck === "updates" || sidebarBackgroundCheck === "settings") {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [sidebarBackgroundCheck]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("User logged out");
  };

  return (
    <div className="max-w-1500 mx-auto flex flex-col md:flex-row">
      {showSidebar && (
        <aside
          className={classNames(
            "bg-[#459BDA]  transition-all duration-300 h-[140vh] border-r border-gray-200",
            {
              "w-64": sidebarOpen,
              "w-0": !sidebarOpen,
            }
          )}
        >
          <div className="flex justify-between mx-4 px-4 py-2.5 h-[62px] rounded-md bg-[#0979A1CC] mt-5">
            <section className="flex gap-3">
              <Icon name="questicon" />
              <h3 className="text-[15px] text-white font-bold">
                {" "}
                Questpro <span className="font-normal block">Admin</span>
              </h3>
            </section>
            <button onClick={handleDropdownToggle}>
              <Icon name="arrowdownicon" className="mt-4" />
            </button>
          </div>
          {dropdownOpen && (
            <div className="absolute w-[12%] h-[60px] left-8 mt-2 bg-white shadow-lg rounded-md" onClick={handleLogout}>
              <button
                className="block px-4 py-4 text-[#FF0000] font-medium hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
          <Sidebar open={sidebarOpen} />
        </aside>
      )}
      <main
        className={classNames(
          "flex-grow transition-all duration-300",
          {
            "": sidebarOpen,
            "pl-2 ": !sidebarOpen,
          }
        )}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
