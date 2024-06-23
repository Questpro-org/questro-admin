import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Table from "../../../component/reusables/table";

const SettingsTable = ({
  data,
  selectedStatus,
  handleStatusChange,
  activeTab,
}) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    { header: "Name", accessor: "title" },
    { header: "Email", accessor: "phone" },
    { header: "Roles", accessor: "phone" },
    { header: "Status", accessor: "status" },
    { header: "Created On", accessor: "created_at" },
    { header: "", accessor: "id" },
  ];

  useEffect(() => {
    const filtered = data?.filter((user) => {
      if (user?.status) {
        return true;
      }
      return false;
    });
    setFilteredData(filtered);
  }, [data, selectedStatus]);

  const handleUserClick = (id) => {
    navigate(`/account/details/${id}`);
  };

  return (
    <div className="rounded-md px-10 bg-white border border-[#fff]">
      {/* {filteredData?.length > 0 ? ( */}
        <Table
          columns={columns}
          data={filteredData}
          selectedUserId={null}
          onUserClick={handleUserClick}
        />
      {/* ) : (
        <div className="opacity-80 mt-10 font-bold w-[4%] mx-auto">
         <TailSpin color="skyblue" />
        </div>
      )} */}
    </div>
  );
};

export default SettingsTable;
