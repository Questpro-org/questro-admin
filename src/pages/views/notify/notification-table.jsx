import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { capitalizeFirstLetter } from "../../../utilities/function";
import TableNotification from "../../../component/reusables/notification-table";
import NotificationDetails from './notification-details'

const NotificationTable = ({ notification, selectedStatus, userId }) => { // Accept userId as prop
  const userToken = localStorage.getItem("token");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Status", accessor: "status" },
    { header: "Date", accessor: "createdAt" },
    { header: "", accessor: "_id" },
  ];

  useEffect(() => {
    const filtered = notification
      ?.map((user) => {
        if (user?.status) {
          return {
            ...user,
            title: `${capitalizeFirstLetter(user.title)}`,
          };
        }
        return null;
      })
      .filter(Boolean);
    setFilteredData(filtered);
    setLoading(false);
  }, [notification, selectedStatus]);

  const handleUserClick = (_id) => {
    setSelectedUserId(_id);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="rounded-md px-10 bg-white border border-[#fff]">
      {loading ? (
        <div className="flex justify-center mt-10">
          <TailSpin color="skyblue" />
        </div>
      ) : 
      filteredData?.length > 0 ? (
        <TableNotification
          columns={columns}
          data={filteredData.map(item => ({
            ...item,
            readByUser: item.readBy.some(reader => reader.userId === userId)
          }))}
          selectedUserId={null}
          onUserClick={handleUserClick}
          userToken={userToken}
        />
      ) : (
        <div className="flex justify-center mt-10">
          <p className="text-gray-500 font-bold">
            No Notification data available
          </p>
        </div>
      )}

      {selectedUserId && (
        <NotificationDetails
          visible={!!selectedUserId}
          handleClose={handleCloseModal}
          data={selectedUserId}
        />
      )}
    </div>
  );
};

export default NotificationTable;
