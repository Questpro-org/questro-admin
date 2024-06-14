import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Table from "../../../component/table";

const AgentTable = ({
  agent,
  selectedStatus,
  handleStatusChange,
  activeTab,
}) => {
  const navigate = useNavigate();
  console.log('jhvxdfgvbnm', agent)
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    { header: "Email", accessor: "email" },
    { header: "LGA", accessor: "phone" },
    { header: "Status", accessor: "status" },
    { header: "Joined On", accessor: "createdAt" },
    { header: "", accessor: "_id" },
  ];

  useEffect(() => {
    const filtered = agent?.filter((user) => {
      if (user) {
        return true;
      }
      return false;
    });
    setFilteredData(filtered);
  }, [agent, selectedStatus]);

  // const handleUserClick = (id) => {
  //   navigate(`/account/details/${id}`);
  // };

  return (
    <div className="rounded-md px-10 bg-white border border-[#fff]">
      {filteredData?.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
          selectedUserId={null}
          // onUserClick={handleUserClick}
        />
      ) : (
        <div className="opacity-80 mt-10 font-bold w-[4%] mx-auto">
         <TailSpin color="skyblue" />
        </div>
      )}
    </div>
  );
};

export default AgentTable;
