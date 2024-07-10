import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { capitalizeFirstLetter } from "../../../utilities/function";
import TableUpdate from "../../../component/reusables/update-table";

const UpdateTable = ({
  updates,
  selectedStatus,
  currentPage,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
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
          sentStatus: `${capitalizeFirstLetter(update.sentStatus)}`,
        };
      }
      return false;
    });
    setFilteredData(filtered);
    setLoading(false);
  }, [updates, selectedStatus]);

  const handleUserClick = (id) => {
    navigate(`/account/details/${id}`);
  };

  return (
    <div className="rounded-md px-10 bg-white border border-[#fff]">
      {loading ? (
        <div className="flex justify-center mt-10">
          <TailSpin color="skyblue" />
        </div>
      ) : 
      filteredData?.length > 0 ? (
        <TableUpdate
          columns={columns}
          data={filteredData}
          selectedUserId={null}
          currentPage={currentPage}
          onPageChange={onPageChange}
          // onUserClick={handleUserClick}
        />
      ) : (
        <div className="flex justify-center mt-10">
          <p className="text-gray-500 font-bold">
            No Property Update data available
          </p>
        </div>
      )}
    </div>
  );
};

export default UpdateTable;
