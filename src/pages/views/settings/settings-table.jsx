import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { capitalizeFirstLetter } from "../../../utilities/function";
import TableSettings from "../../../component/reusables/table-2";

const SettingsTable = ({ admins, selectedStatus }) => {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    { header: "Name", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Roles", accessor: "roles" },
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
  }, [admins, selectedStatus]);

  const handleUserClick = (id) => {
    navigate(`/account/details/${id}`);
  };

  return (
    <div className="rounded-md px-10 bg-white border border-[#fff]">
      {filteredData?.length > 0 ? (
        <TableSettings
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

export default SettingsTable;
