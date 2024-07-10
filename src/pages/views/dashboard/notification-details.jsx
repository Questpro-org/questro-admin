import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import useRequest from "../../../component/hook/use-request";
import { capitalizeFirstLetter, formatDate } from "../../../utilities/function";

const NotificationDetails = ({ visible, handleClose, notificationId }) => {
  const userToken = localStorage.getItem("token");
  const Details = ({ title, value }) => {
    return (
      <div className="grid grid-cols-2 text-[16px] px-3 mt-4 w-[100%]">
        <p>{title}</p>
        <p className="text-left">{value}</p>
      </div>
    );
  };

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
      <div className="px-10 py-10">
        <p className="text-[16px] font-semibold">Notification Details</p>

        <Details
          title="Recipient"
          value={capitalizeFirstLetter(notificationUpdate?.recipientType) || "N/A"}
        />
        <Details
          title="Title:"
          value={capitalizeFirstLetter(notificationUpdate?.title) || "N/A"}
        />
        <Details
          title="Message:"
          value={notificationUpdate?.content || "N/A"}
        />
        <Details
          title="Status:"
          value={capitalizeFirstLetter(notificationUpdate?.status) || "N/A"}
        />
        <Details
          title="Created At:"
          value={formatDate(notificationUpdate?.createdAt) || "N/A"}
        />
      </div>
    </Modal>
  );
};

export default NotificationDetails;
