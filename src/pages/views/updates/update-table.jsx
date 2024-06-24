import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { capitalizeFirstLetter } from "../../../utilities/function";
import TableUpdate from "../../../component/reusables/update-table";

const UpdateTable = ({
  updates,
  selectedStatus,
  handleStatusChange,
}) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    { header: "Message title", accessor: "title" },
    { header: "Type", accessor: "type" },
    { header: "Status", accessor: "sentStatus" },
    { header: "Sent On", accessor: "createdAt" },
    { header: "", accessor: "_id" },
  ];

  useEffect(() => {
    const filtered = updates?.filter((update) => {
      if (update?.sentStatus) {
        return {
          ...update,
          sentStatus: `${capitalizeFirstLetter(update.sentStatus)}`
        };
      }
      return false;
    });
    setFilteredData(filtered);
  }, [updates, selectedStatus]);

  const handleUserClick = (id) => {
    navigate(`/account/details/${id}`);
  };

  return (
    <div className="rounded-md px-10 bg-white border border-[#fff]">
      {filteredData?.length > 0 ? (
        <TableUpdate
          columns={columns}
          data={filteredData}
          selectedUserId={null}
        />
       ) : (
        <div className="opacity-80 mt-10 font-bold w-[4%] mx-auto">
         <TailSpin color="skyblue" />
        </div>
      )} 
    </div>
  );
};

export default UpdateTable;
