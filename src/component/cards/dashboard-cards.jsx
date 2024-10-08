import React from "react";
import Icon from "../../assets/icon";

const DashboardCard = ({ title, value }) => {
  return (
    <section className="bg-white rounded-md border py-4 h-[140px] border-[#D2D9DF]">
      <p className="font-bold text-[40px] text-[#459BDA] pl-5">{value}</p>
      <span className="text-[16px] font-normal pl-5">{title}</span>
    </section>
  );
};

export const DashboardCards = ({ metrics }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8 mt-14 px-10 ">
      <DashboardCard
        title="Total number of agents"
        value={metrics?.totalAgents || 0}
      />
      <DashboardCard
        title="Total number of customers"
        value={metrics?.totalUsers || 0}
      />
      <DashboardCard
        title="Total number of properties"
        value={metrics?.totalProperties || 0}
      />
      <DashboardCard
        title="Total number of conversations"
        value={metrics?.all || 0}
      />
      <DashboardCard
        title="Total number of verified agents"
        value={metrics?.verifiedAgents || 0}
      />
      <DashboardCard
        title="Total number of subscribed agents"
        value={metrics?.subscribedAgents || 0}
      />
    </div>
  );
};
