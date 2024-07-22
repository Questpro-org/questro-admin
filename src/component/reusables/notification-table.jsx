import React, { useEffect, useState } from "react";
import Icon from "../../assets/icon";
import { capitalizeFirstLetter, formatDate } from "../../utilities/function";
import useRequest from "../hook/use-request";
import { showToast } from "./toast";

const TableNotification = ({
  columns,
  data,
  onUserClick,
  PlaceholderImage,
}) => {
  const userToken = localStorage.getItem("token");
  const [selectedNotificationStatus, setSelectedNotificationStatus] = useState({
    id: null,
    status: null,
  });

  const { makeRequest: updateStatusPackage } = useRequest(
    `/notifications/update/${selectedNotificationStatus.id}`,
    "PATCH",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );



  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#ECFDF3";
      case "pending":
        return "#FFFAEB";
      default:
        return "transparent";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "#008138";
      case "pending":
        return "#B54708";
      default:
        return "transparent";
    }
  };


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
          <tr
            key={rowIndex}
            className={`border-b cursor-pointer hover:bg-gray-100 ${
              row.readByUser ? "bg-gray-200" : ""
            }`}
          >
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className="h-14 border-b-[2px] relative cursor-pointer"
              >
                {column.accessor === "created_at" ||
                column.accessor === "createdAt" ? (
                  formatDate(row[column.accessor])
                ) : column.accessor === "profilePhoto" ? (
                  <img
                    src={
                      row[column.accessor]
                        ? row[column.accessor]
                        : PlaceholderImage
                    }
                    className="rounded-full w-[40px] h-[40px]"
                    alt="profile"
                  />
                ) : column.accessor === "id" || column.accessor === "_id" ? (
                  <>
                    <button onClick={() => onUserClick(row._id)}>
                      <Icon name="dotIcon" />
                    </button>
                  </>
                ) : column.accessor === "phone" && !row[column.accessor] ? (
                  "N/A"
                ) : column.accessor === "status" ? (
                  <select
                    className={`inline-block px-3 py-2 text-sm font-semibold rounded-md`}
                    style={{
                      backgroundColor: getStatusColor(row[column.accessor]),
                      color: getStatusText(row[column.accessor]),
                    }}
                    value={row[column.accessor]}
                    onChange={(e) =>
                      handleStatusChange(row._id, e.target.value)
                    }
                  >
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
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
