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

export const DashboardCards = ({ statistics }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8 mt-14 px-10 ">
      <DashboardCard
        title="Total number of agents"
        value={statistics?.all || 0}
      />
      <DashboardCard
        title="Total number of customers"
        value={statistics?.active || 0}
      />
      <DashboardCard
        title="Total number of properties"
        value={statistics?.suspended || 0}
      />
      <DashboardCard
        title="Total number of conversations"
        value={statistics?.all || 0}
      />
      <DashboardCard
        title="Total number of verified agents"
        value={statistics?.active || 0}
      />
      <DashboardCard
        title="Total number of subscribed agents"
        value={statistics?.suspended || 0}
      />
    </div>
  );
};
