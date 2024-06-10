import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../../assets/icon";

const MenuItem = ({ to, label, icon }) => {
  const location = useLocation();
  const active = location.pathname === to;
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
        className={`flex gap-6 items-center mb-3 p-3 rounded-md font-semibold fill-base cursor-pointer
          ${active ? "bg-[#0979A1CC]  text-[#fff]" : "hover:bg-[#0979A1CC] text-white"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon
          name={icon}
          className={backgroundBlue ? "fill-white" : "fill-white"}
        />
        {label}
      </div>
    </Link>
  );
};

const Menu = () => {
  const menuItems = [
    { to: "/", icon: "homeicon", label: "Dashboard" },
    {
      to: "/agents",
      icon: "homeicon",
      label: "Agents",
    },
    { to: "/updates", icon: "homeicon", label: "Updates" },
    { to: "/settings", icon: "homeicon", label: "Settings" },
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