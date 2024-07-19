import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { capitalizeFirstLetter } from "../../../utilities/function";
import TableSettings from "../../../component/reusables/table-2";

const SettingsTable = ({ admins, selectedStatus }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  const columns = [
    { header: "Name", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Roles", accessor: "role" },
    { header: "Status", accessor: "status" },
    { header: "Created On", accessor: "createdAt" },
    { header: "", accessor: "id" },
  ];

  useEffect(() => {
    const filtered = admins
      ?.filter((admin) => admin.status === selectedStatus || !selectedStatus)
      .map((admin) => ({
        ...admin,
        username: capitalizeFirstLetter(admin?.username),
        roles: capitalizeFirstLetter(admin?.roles),
      }));
    setFilteredData(filtered);
    setLoading(false);
  }, [admins, selectedStatus]);


  return (
    <div className="rounded-md px-10 bg-white border border-[#fff]">
       {loading ? (
        <div className="flex justify-center mt-10">
          <TailSpin color="skyblue" />
        </div>
      ) : 
      filteredData?.length > 0 ? (
        <TableSettings
          columns={columns}
          data={filteredData}
          selectedUserId={null}
      
        />
      ) : (
        <div className="flex justify-center mt-10">
        <p className="text-gray-500 font-bold">
          No data available
        </p>
      </div>
      )}
    </div>
  );
};

export default SettingsTable;
