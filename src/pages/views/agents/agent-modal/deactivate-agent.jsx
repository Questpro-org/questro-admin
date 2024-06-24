import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { showToast } from "../../../../component/reusables/toast";
import { CircleLoader } from "react-spinners";
import useRequest from "../../../../component/hook/use-request";

const DeactivateAgent = ({ visible, handleClose, agent }) => {
  const userToken = localStorage.getItem("token");
  const { makeRequest: deacticateAgent, loading } = useRequest(
    `/admin/agent/${agent?._id}`,
    "PATCH",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const { handleSubmit, control, reset } = useForm();

  const handleDeactivate = handleSubmit(async (formData) => {
    const updatedAgent = {
      isVerified: formData.isVerified,
    };
    const [response] = await deacticateAgent(updatedAgent);
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
      reset();
      handleClose();
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  });

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
        Are you sure you want to deactivate an agent?
        <span className="text-[16px] font-medium block">
          This action is permanent and cannot be undone
        </span>
      </p>
      {agent ? (
        <form className="w-full mt-10" onSubmit={handleDeactivate}>
          <div className="flex gap-8 justify-end items-center mt-8">
            <button className="w-full bg-[#E00202] text-white h-[40px] rounded-md" type="submit">
              {loading ? (
                <CircleLoader color="#ffffff" loading={loading} size={20} />
              ) : (
                "Deactivate"
              )}
            </button>
            <button
              className="border w-full h-[40px] rounded-md"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p>Loading agent details...</p>
      )}
    </Modal>
  );
};

export default DeactivateAgent;
