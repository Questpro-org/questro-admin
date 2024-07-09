import React from "react";
import Icon from "../../assets/icon";
import { capitalizeFirstLetter, formatDate } from "../../utilities/function";
import useRequest from "../hook/use-request";

const TableNotification = ({ columns, data, onUserClick, PlaceholderImage, userToken }) => {
    const { makeRequest: getReadNotifications } = useRequest(`/notifications/admin/${data.map((item) => item._id)}`, "GET", {
        Authorization: `Bearer ${userToken}`,
      });

  const getStatusColor = (status) => {
    switch (status) {
      case "sent":
      case "completed":
        return "#ECFDF3";
      case "confirmed":
        return "#D1FFC9";
      case "pending":
        return "#F2F4F7";
      case "delivered":
        return "#CFF0FC";
      case "failed":
      case "draft":
        return "#FFFAEB";
      case "inactive":
        return "#D9D9D9";
      case "active":
        return "#ECFDF3";
      default:
        return "transparent";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "sent":
      case "completed":
        return "#008138";
      case "confirmed":
        return "#D1FFC9";
      case "pending":
        return "#344054";
      case "delivered":
        return "#CFF0FC";
      case "failed":
      case "draft":
        return "#B54708";
      case "inactive":
        return "#D9D9D9";
      case "active":
        return "#008138";
      default:
        return "transparent";
    }
  };

  const handleUserClick = async (_id) => {
    try {
      await getReadNotifications();
      onUserClick(_id);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <table className="table w-full">
      <thead className="border-b-2 h-10">
        <tr className="text-[16px] text-left">
          {columns?.map((column, index) => (
            <th className="font-medium" key={index}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-[12px]">
        {data?.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className="h-14 border-b-[2px] relative cursor-pointer"
                onClick={() => {
                  if (column.accessor !== "id" && column.accessor !== "_id") {
                    handleUserClick(row);
                  }
                }}
              >
                {column.accessor === "created_at" || column.accessor === "createdAt" ? (
                  formatDate(row[column.accessor])
                ) : column.accessor === "profilePhoto" ? (
                  <img
                    src={row[column.accessor] ? row[column.accessor] : PlaceholderImage}
                    className="rounded-full w-[40px] h-[40px]"
                    alt="profile"
                  />
                ) : column.accessor === "id" || column.accessor === "_id" ? (
                  <>
                    <button onClick={() => handleUserClick(row)}>
                      <Icon name="dotIcon" />
                    </button>
                  </>
                ) : column.accessor === "phone" && !row[column.accessor] ? (
                  "N/A"
                ) : column.accessor === "status" ? (
                  <p
                    className="-mt-1 text-[12px] p-1 text-center font-normal w-20 rounded-md cursor-pointer"
                    style={{
                      backgroundColor: getStatusColor(row[column.accessor]),
                      color: getStatusText(row[column.accessor]),
                    }}
                    onClick={() => handleUserClick(row)}
                  >
                    {capitalizeFirstLetter(row[column.accessor])}
                  </p>
                ) : (
                  row[column.accessor]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableNotification;