import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import useRequest from "../../../component/hook/use-request";
import { capitalizeFirstLetter, formatDate } from "../../../utilities/function";

const NotificationDetails = ({ visible, handleClose, notificationId }) => {
  const userToken = localStorage.getItem("token");
  const Details = ({ title, value }) => (
    <div className="grid grid-cols-2 items-center border-b py-3">
      <p className="font-medium text-gray-600">{title}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  );

  const [notificationUpdate, setNotificationUpdate] = useState(null);
  const { makeRequest: getReadNotifications } = useRequest(
    `/notifications/admin/${notificationId}`,
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      if (notificationId) {
        const [response] = await getReadNotifications();
        setNotificationUpdate(response?.data || null);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationId]);

  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      width={600}
      closable={true}
      footer={null}
      className="items-center mt-14"
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Notification Details
        </h2>
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <Details
            title="Recipient"
            value={
              capitalizeFirstLetter(notificationUpdate?.recipientType) || "N/A"
            }
          />
          <Details
            title="Title"
            value={capitalizeFirstLetter(notificationUpdate?.title) || "N/A"}
          />
          <Details
            title="Message"
            value={notificationUpdate?.content || "N/A"}
          />
          <Details
            title="Status"
            value={capitalizeFirstLetter(notificationUpdate?.status) || "N/A"}
          />
          <Details
            title="Created At"
            value={formatDate(notificationUpdate?.createdAt) || "N/A"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default NotificationDetails;
