import React from "react";
import Icon from "../../../assets/icon";
import HomeDashboard from "./home";

const Dashboard = () => {
  return (
    <>
      <div className="bg-[#459BDA] h-[80px] flex justify-between px-10 py-7">
        <h3 className="text-[16px] font-semibold text-white">Welcome Admin</h3>
        <button>
          <Icon name="bellicon" />
        </button>
      </div>

      <HomeDashboard />
    </>
  );
};

export default Dashboard;
