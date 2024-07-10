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
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  }, [agent, selectedStatus]);

  const handleUserClick = (_id) => {
    navigate(`/agent/${_id}`);
  };

  return (
    <div className="rounded-md px-10 bg-white border border-[#fff]">
        {loading ? (
        <div className="flex justify-center mt-10">
          <TailSpin color="skyblue" />
        </div>
      ) : 
      filteredData?.length > 0 ? (
        <Table
          columns={columns}
          data={filteredData}
          selectedUserId={null}
          onUserClick={handleUserClick}
        />
      ) : (
        <div className="flex justify-center mt-10">
          <p className="text-gray-500 font-bold">
            No Agent data available
          </p>
        </div>
      )}
    </div>
  );
};

export default AgentTable;
