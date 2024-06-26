import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
import classNames from "classnames";
import Icon from "../../assets/icon";

const DashboardLayout = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarBackgroundCheck = pathname.split("/")[1];
  const showSidebar = !pathname.startsWith("/notification");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (
      sidebarBackgroundCheck === "" ||
      sidebarBackgroundCheck === "agents" ||
      sidebarBackgroundCheck === "updates" ||
      sidebarBackgroundCheck === "settings" ||
      sidebarBackgroundCheck === "agent" ||
      sidebarBackgroundCheck === "properties" ||
      sidebarBackgroundCheck === "property" ||
      sidebarBackgroundCheck === "push"
    
    ) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [sidebarBackgroundCheck]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="flex">
      {showSidebar && (
        <aside
          className={classNames(
            "bg-[#459BDA] transition-all duration-300 h-full fixed top-0 left-0 border-r border-gray-200 z-10",
            {
              "w-64": sidebarOpen,
              "w-0": !sidebarOpen,
            }
          )}
          style={{ height: "100vh" }}
        >
          <div className="flex justify-between mx-4 px-4 py-2.5 h-[62px] rounded-md bg-[#0979A1CC] mt-5">
            <section className="flex gap-3">
              <Icon name="questicon" />
              <h3 className="text-[15px] text-white font-bold">
                Questpro{" "}
                <span className="font-normal block">{parsedUser?.roles}</span>
              </h3>
            </section>
            <button onClick={handleDropdownToggle}>
              <Icon name="arrowdownicon" className="mt-4" />
            </button>
          </div>
          {dropdownOpen && (
            <div
              className="absolute w-[70%] h-[60px] left-8 mt-2 bg-white shadow-lg rounded-md"
              onClick={handleLogout}
            >
              <button className="block w-full px-4 py-4 text-[#FF0000] font-medium hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
          <Sidebar open={sidebarOpen} />
        </aside>
      )}
      <main
        className={classNames(
          "flex-grow transition-all duration-300 ml-0 md:ml-64",
          {
            "ml-64": sidebarOpen,
            "ml-0": !sidebarOpen,
          }
        )}
        style={{ marginLeft: sidebarOpen ? "16rem" : "0" }}
      >
        <div className="">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
