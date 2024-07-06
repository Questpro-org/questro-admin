import React, { useEffect, useState } from "react";
import Icon from "../../../assets/icon";
import useRequest from "../../../component/hook/use-request";
import { useNavigate } from "react-router-dom";
import NotificationTable from "./notification-table";

function Notifications() {
  const userToken = localStorage.getItem("token");
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();
  const { makeRequest: getNotification } = useRequest("/notifications", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getNotification();
      setNotification(response?.data?.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notificationCount = notification.length;

  const handleClick = () => {
    navigate("/notifications");
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

      
      <div className="flex justify-between w-full px-10 py-14">
        <div className="border-2 rounded-md solid pl-5 bg-transparent h-[45px] flex gap-3">
          <Icon name="searchIcon" className="mt-3 rounded" />
          <input
            className="outline-none border-none bg-transparent"
            id="input-placeholder"
            placeholder="Search agent"
            // value={searchQuery}
            // onChange={handleSearchChange}
          />
        </div>

        <section className="flex gap-4">
          <select
            className=" custom-select border px-3 py-1 bg-[#fff] text-[#459BDA] text-[14px] font-semibold rounded-full border-[#459BDA]"
            // value={selectedStatus}
            // onChange={handleStatusChange}
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="deactivated">Deactivated</option>
          </select>
        </section>
      </div>


      <NotificationTable notification={notification} />
    </>
  );
}

export default Notifications;
