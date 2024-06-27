import React, { useState } from "react";
import Icon from "../../assets/icon";
import { capitalizeFirstLetter, formatDate } from "../../utilities/function";
import DeleteUpdate from "../../pages/views/updates/update-modal";
import { useNavigate } from "react-router-dom";

const TableUpdate = ({ columns, data, onUserClick, PlaceholderImage }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  const handleDropdownToggle = (rowId) => {
    setDropdownOpen(dropdownOpen === rowId ? null : rowId);
  };

  const handleDelete = (rowId) => {
    const update = data.find((update) => update._id === rowId);
    setDropdownOpen(null);
    setSelectedUpdate(update);
    setDeleteModal(true);
  };

  const handleEdit = (rowId) => {
    const update = data.find((update) => update._id === rowId);
    setSelectedUpdate(update);
    setDropdownOpen(null);
    navigate(`/assets/update/${rowId}`);
  };

  const getStatusColor = (sentStatus) => {
    switch (sentStatus) {
      case "sent":
      case "completed":
        return "#ECFDF3";
      case "confirmed":
        return "#D1FFC9";
      case "pending":
        return "#F2F4F7";
      case "delivered":
        return "#CFF0FC";
      case "failed":
      case "draft":
        return "#FFFAEB";
      case "inactive":
        return "#D9D9D9";
      case "active":
        return "#ECFDF3";
      default:
        return "transparent";
    }
  };

  const getStatusText = (sentStatus) => {
    switch (sentStatus) {
      case "sent":
      case "completed":
        return "#008138";
      case "confirmed":
        return "#D1FFC9";
      case "pending":
        return "#344054";
      case "delivered":
        return "#CFF0FC";
      case "failed":
      case "draft":
        return "#B54708";
      case "inactive":
        return "#D9D9D9";
      case "active":
        return "#008138";
      default:
        return "transparent";
    }
  };

  return (
    <table className="table w-full">
      <thead className="border-b-2 h-10">
        <tr className="text-[16px] text-left">
          {columns?.map((column, index) => (
            <th className="font-medium" key={index}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-[12px]">
        {data?.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100">
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className="h-14 border-b-[2px] relative cursor-pointer"
                onClick={() =>
                  column.accessor === "id" || column.accessor === "_id"
                    ? null
                    : onUserClick(row["_id"])
                }
              >
                {column.accessor === "created_at" ||
                column.accessor === "createdAt" ? (
                  formatDate(row[column.accessor])
                ) : column.accessor === "profilePhoto" ? (
                  <img
                    src={
                      row[column.accessor]
                        ? row[column.accessor]
                        : PlaceholderImage
                    }
                    className="rounded-full w-[40px] h-[40px]"
                    alt="profile"
                  />
                ) : column.accessor === "id" || column.accessor === "_id" ? (
                  <>
                    <button onClick={() => handleDropdownToggle(row["_id"])}>
                      <Icon name="dotIcon" />
                    </button>
                    {dropdownOpen === row["_id"] && (
                      <div className="absolute w-[164px] right-0  bg-white shadow-lg rounded-md mt-2 z-10">
                        {row.sentStatus !== "sent" && (
                          <button
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleEdit(row["_id"])}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          type="button"
                          className="block px-4 py-2 text-[#E52323] hover:bg-gray-100"
                          onClick={() => handleDelete(row["_id"])}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                ) : column.accessor === "phone" && !row[column.accessor] ? (
                  "N/A"
                ) : column.accessor === "sentStatus" ? (
                  <p
                    className="-mt-1 text-[12px] p-1 text-center font-normal w-20 rounded-md cursor-pointer"
                    style={{
                      backgroundColor: getStatusColor(row[column.accessor]),
                      color: getStatusText(row[column.accessor]),
                    }}
                    onClick={() => onUserClick(row["_id"])}
                  >
                    {capitalizeFirstLetter(row[column.accessor])}
                  </p>
                ) : (
                  row[column.accessor]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {deleteModal && (
        <DeleteUpdate
          visible={deleteModal}
          handleClose={() => setDeleteModal(false)}
          updates={selectedUpdate}
        />
      )}
    </table>
  );
};

export default TableUpdate;
