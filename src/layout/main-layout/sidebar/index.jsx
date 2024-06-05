import React from "react";
import classNames from "classnames";
import Menu from "./menu";



const Sidebar = ({ open }) => {
  return (
    <div
      className={classNames("w-64", "p-4 mt-5",
        { block: open, hidden: !open },
        "md:block","", "left-0", "bottom-0", "h-full",
        { static: !open, "md:h-auto": open }
      )}
    >
      <div className="w-full">
      <Menu />
      </div>
    </div>
  );
};

export default Sidebar;
