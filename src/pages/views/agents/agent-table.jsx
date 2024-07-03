import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Table from "../../../component/reusables/table";
import { capitalizeFirstLetter } from "../../../utilities/function";

const AgentTable = ({
  agent,
  selectedStatus,
}) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    { header: "Name", accessor: "fullName" },  
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Status", accessor: "status" },
    { header: "Joined On", accessor: "createdAt" },
    { header: "", accessor: "_id" },
  ];

  useEffect(() => {
    const filtered = agent?.map((user) => {
      if (user?.status) {
        return {
          ...user,
          fullName: `${capitalizeFirstLetter(user.firstname)} ${capitalizeFirstLetter(user.lastname)}`
        };
      }
      return null;
    })
    setFilteredData(filtered);
  }, [agent, selectedStatus]);

  const handleUserClick = (_id) => {
    navigate(`/agent/${_id}`);
  };

  return (
    <div className="rounded-md px-10 bg-white border border-[#fff]">
      {filteredData?.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
          selectedUserId={null}
          onUserClick={handleUserClick}
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
