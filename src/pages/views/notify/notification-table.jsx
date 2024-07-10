import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { capitalizeFirstLetter } from "../../../utilities/function";
import TableNotification from "../../../component/reusables/notification-table";
import NotificationDetails from './notification-details'

const NotificationTable = ({ notification, selectedStatus }) => {
  const userToken = localStorage.getItem("token");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const navigate = useNavigate();
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
  }, [notification, selectedStatus]);

  const handleUserClick = (_id) => {
    setSelectedUserId(_id);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="rounded-md px-10 bg-white border border-[#fff]">
      {filteredData?.length > 0 ? (
        <TableNotification
          columns={columns}
          data={filteredData}
          selectedUserId={null}
          onUserClick={handleUserClick}
          userToken={userToken} // Pass userToken to the table component
        />
      ) : (
        <div className="opacity-80 mt-10 font-bold w-[4%] mx-auto">
          <TailSpin color="skyblue" />
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
