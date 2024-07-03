import React, { useState } from "react";
import { Modal } from "antd";
import { CircleLoader } from "react-spinners";
import { showToast } from "../../../component/reusables/toast";
import useApi from "../../../component/hook/request";

const DeleteUpdate = ({ visible, handleClose, updates }) => {
  const userToken = localStorage.getItem("token");

  const { makeRequest, loading } = useApi(
    `/admin/update-notification/${updates?._id}`,
    "DELETE",{Authorization: `Bearer ${userToken}`});

  const handleDeactivate = async () => {
      const response = await makeRequest();
      if (response) {
        showToast(response.message, true, {
          position: "top-center",
        });
        handleClose();
      } else {
        showToast("Failed to delete the update", false, {
          position: "top-center",
        });
      }
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      width={790}
      closable={true}
      footer={null}
      className="flex justify-center items-center"
    >
      <p className="text-left text-[#344054] font-semibold mt-4 text-[20px]">
        Are you sure you want to delete this update?
        <span className="text-[16px] font-medium block">
          This action is permanent and cannot be undone
        </span>
      </p>

      <div className="flex gap-8 justify-end items-center">
        <button
          className="w-full bg-[#E00202] text-white h-[40px] rounded-md"
          onClick={handleDeactivate}
          type="submit"
        >
          {loading ? (
            <CircleLoader color="#ffffff" loading={loading} size={20} />
          ) : (
            "Delete"
          )}
        </button>
        <button
          className="border w-full h-[40px] rounded-md"
          onClick={handleClose}
          type="button"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUpdate;
