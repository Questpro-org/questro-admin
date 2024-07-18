import React, { useEffect, useState } from "react";
import Icon from "../../../assets/icon";
import HomeDashboard from "./home";
import NotificationsTable from "./notification-table";
import useRequest from "../../../component/hook/use-request";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const userToken = localStorage.getItem("token");
  const [metrics, setMetrics] = useState([]);
  const [notification, setNotification] = useState([]);
  const navigate  = useNavigate();

  const { makeRequest: getMetrics } = useRequest("/admin/dashboard", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  const { makeRequest: getNotification } = useRequest("/notifications", "GET", {
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

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getNotification(undefined, {
        recipientType: 'admin'
      });
      const notifications = response?.data?.data?.docs || [];
      setNotification(notifications);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notificationCount = notification.filter(notify => !notify.readBy || notify.readBy.length === 0).length;

  const handleClick = () => {
    navigate('/notifications');
  };

  return (
    <>
      <div className="bg-[#459BDA] h-[80px] flex justify-between items-center px-10 py-7">
        <h3 className="text-[16px] font-semibold text-white">Welcome Admin</h3>
        <div className="relative" onClick={handleClick}>
          <button>
            <Icon name="bellicon" />
          </button>
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
              {notificationCount}
            </span>
          )}
        </div>
      </div>

      <HomeDashboard metrics={metrics} />
      <NotificationsTable notification={notification} />
    </>
  );
};

export default Dashboard;
