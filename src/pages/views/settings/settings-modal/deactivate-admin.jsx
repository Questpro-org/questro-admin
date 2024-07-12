import React from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { showToast } from "../../../../component/reusables/toast";
import { CircleLoader } from "react-spinners";
import { capitalizeFirstLetter } from "../../../../utilities/function";
import useApi from "../../../../component/hook/request";

const DeactivateAdmin = ({ visible, handleClose, admin }) => {
  const userToken = localStorage.getItem("token");
  const { makeRequest: deacticateAgent, loading } = useApi(
    `/admin/${admin?._id}`,
    "PATCH",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const { handleSubmit } = useForm();

  const handleDeactivate = handleSubmit(async () => {
    const [response] = await deacticateAgent();
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
        Are you sure you want to{" "}
        {admin.status === "active" ? "deactivate" : "activate"} this admin?{" "}
        <span className="block text-center text-[20px] font-extrabold">
          {capitalizeFirstLetter(admin?.username)}
        </span>
      </p>
      {admin ? (
        <form className="w-full mt-10" onSubmit={handleDeactivate}>
          <div className="flex gap-8 justify-end items-center mt-8">
            <button
              className="w-full bg-[#E00202] text-white h-[40px] rounded-md"
              type="submit"
            >
              {loading ? (
                <CircleLoader color="#ffffff" loading={loading} size={20} />
              ) : admin.status === "active" ? (
                "Deactivate"
              ) : (
                "Activate"
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
        <p>Loading admin details...</p>
      )}
    </Modal>
  );
};

export default DeactivateAdmin;
