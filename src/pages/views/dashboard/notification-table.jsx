import React, { useState, useEffect } from "react";
import Icon from "../../../assets/icon";
import { formatDate } from "../../../utilities/function";
import { Link } from "react-router-dom";
import NotificationDetails from "./notification-details";
import useRequest from "../../../component/hook/use-request";
import { showToast } from "../../../component/reusables/toast";

const NotificationsTable = ({ notification }) => {
  const [notificationModal, setNotificationModal] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [selectedNotificationStatus, setSelectedNotificationStatus] = useState({
    id: null,
    status: null
  });
  const userToken = localStorage.getItem("token");

  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;
  const userId = parsedUser?._id;

  const openNotification = (_id) => {
    setSelectedNotificationId(_id);
    setNotificationModal(true);
  };

  const { makeRequest: updateStatusPackage } = useRequest(
    `/notifications/update/${selectedNotificationStatus.id}`,
    "PATCH",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  useEffect(() => {
    const updateStatus = async () => {
      if (selectedNotificationStatus.id && selectedNotificationStatus.status) {
        const [response] = await updateStatusPackage({ status: selectedNotificationStatus.status });
        if (response.status) {
          showToast(response.message, true, {
            position: "top-center",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          showToast(response.message, false, {
            position: "top-center",
          });
        }
      }
    };
    updateStatus();
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNotificationStatus]);

  const handleStatusChange = (notifyId, newStatus) => {
    setSelectedNotificationStatus({ id: notifyId, status: newStatus });
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mt-10 mx-10">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/2 p-4 text-[14px] text-left">Notifications</th>
              <th className="w-1/4 p-4 text-[14px] text-left"></th>
              <th className="w-1/4 p-4 text-[14px] text-left"></th>
              <th className="w-1/12 text-[14px] text-left text-[#459BDA]">
                <Link to="/notifications">See more</Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {notification && notification.length > 0 ? (
              notification.slice(0, 5).map((notify) => {
                const isReadByUser = notify.readBy.some(
                  (reader) => reader.userId === userId
                );
                return (
                  <tr
                    key={notify._id}
                    className={`border-b font-bold border-gray-200 ${
                      isReadByUser ? "bg-gray-200" : ""
                    }`}
                  >
                    <td className="w-1/2 p-4 text-sm text-gray-700 truncate">
                      {notify?.content || "N/A"}
                    </td>
                    <td className="w-1/4 p-4">
                      <select
                        className={`inline-block px-3 py-2 text-sm font-semibold rounded-md ${
                          notify.status === "completed"
                            ? "bg-[#ECFDF3] text-[#008138]"
                            : "bg-[#FFFAEB] text-[#B54708]"
                        }`}
                        value={notify.status}
                        onChange={(e) =>
                          handleStatusChange(notify._id, e.target.value)
                        }
                      >
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                      </select>
                    </td>
                    <td className="w-1/4 p-4 text-sm text-gray-500">
                      {formatDate(notify.createdAt)}
                    </td>
                    <td
                      className="w-1/12 p-4 text-right cursor-pointer"
                      onClick={() => openNotification(notify._id)}
                    >
                      <Icon name="dotIcon" className="text-gray-400" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-sm text-gray-500"
                >
                  No notifications
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <NotificationDetails
        notificationId={selectedNotificationId}
        visible={notificationModal}
        handleClose={() => setNotificationModal(false)}
      />
      <br />
    </>
  );
};

export default NotificationsTable;
