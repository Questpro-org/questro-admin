import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MenuItem = ({ to, label, icon }) => {
  const location = useLocation();
  const active = location.pathname === to;
  const isSettings = to === "/settings";
  const [backgroundBlue, setBackgroundBlue] = useState(false);

  const handleMouseEnter = () => {
    setBackgroundBlue(true);
  };

  const handleMouseLeave = () => {
    setBackgroundBlue(false);
  };

  return (
    <Link to={to}>
      <div
        className={`flex gap-6 items-center mb-6 p-2 rounded-md font-semibold fill-base cursor-pointer
          ${active ? "bg-[#0979A1CC] ml-4 text-[#fff]" : "hover:bg-gray-100"}
          ${isSettings ? "mt-20" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* <Icon
          name={icon}
          className={backgroundBlue ? "fill-white" : "fill-white"}
        /> */}
        {label}
      </div>
    </Link>
  );
};

const Menu = () => {
  const menuItems = [
    { to: "/", icon: "account", label: "Accounts" },
    {
      to: "/transactions",
      icon: "transaction",
      label: "Transactions",
    },
    { to: "/refunds", icon: "refund", label: "Refunds" },
    { to: "/mediation", icon: "mediation", label: "Mediation" },
    { to: "/blacklist", icon: "blacklist", label: "Blacklist" },
    {
      to: "/support",
      icon: "support",
      label: "Customer Support",
    },
    { to: "/analytics", icon: "analytics", label: "Analytics" },
    { to: "/admins", icon: "account", label: "Admins" },
    { to: "/settings", icon: "settings", label: "Settings" },
  ];

  return (
    <div>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          to={item.to}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Menu;