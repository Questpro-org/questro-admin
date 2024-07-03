import React, { useEffect, useState } from "react";
import Icon from "../../../assets/icon";
import HomeDashboard from "./home";
import NotificationsTable from "./notification-table";
import useRequest from "../../../component/hook/use-request";

const Dashboard = () => {
  const userToken = localStorage.getItem("token");
  const [metrics, setMetrics] = useState([]);
  const { makeRequest: getMetrics } = useRequest("/admin/dashboard", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getMetrics();
      setMetrics(response?.data?.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bg-[#459BDA] h-[80px] flex justify-between px-10 py-7">
        <h3 className="text-[16px] font-semibold text-white">Welcome Admin</h3>
        <button>
          <Icon name="bellicon" />
        </button>
      </div>

      <HomeDashboard metrics={metrics} />
      <NotificationsTable />
    </>
  );
};

export default Dashboard;
