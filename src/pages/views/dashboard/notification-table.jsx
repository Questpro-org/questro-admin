import React, { useState } from "react";
import Icon from "../../../assets/icon";
import { capitalizeFirstLetter, formatDate } from "../../../utilities/function";
import { Link } from "react-router-dom";
import NotificationDetails from "./notification-details";

const NotificationsTable = ({ notification }) => {
  const [notificationModal, setNotificationModal] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  const openNotification = (_id) => {
    setSelectedNotificationId(_id);
    setNotificationModal(true);
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
              notification.slice(0, 5).map((notify) => (
                <tr
                  key={notify._id}
                  className="border-b font-bold border-gray-200"
                >
                  <td className="w-1/2 p-4 text-sm text-gray-700 truncate">
                    {notify.content}
                  </td>
                  <td className="w-1/4 p-4">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-md ${
                        notify.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {capitalizeFirstLetter(notify.status)}
                    </span>
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
              ))
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
