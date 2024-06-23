import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../../component/reusables/button";
import Input from "../../../../component/reusables/input";
import { showToast } from "../../../../component/reusables/toast";
import { CircleLoader } from "react-spinners";
import useRequest from "../../../../component/hook/use-request";
import Select from "../../../../component/reusables/select";
import { DatePicker } from 'antd';
import moment from 'moment'; 

const EditAgent = ({ visible, handleClose, agent }) => {
  const [data, setData] = useState([]);
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/admin/agents", "GET", {
    Authorization: `Bearer ${userToken}`,
  });
  const { makeRequest: editAgent, loading } = useRequest(`/admin/agent/${agent?._id}`, "PATCH", {
    Authorization: `Bearer ${userToken}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await makeRequest();
      setData(response?.data?.data?.docs || []);
    };
    fetchData();
  }, []);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      fullName: agent?.fullName || "",
      email: agent?.email || "",
      status: agent?.status || "",
      isVerified: agent?.isVerified || "",
      plan: agent?.subscription?.plan || "",
      updatedAt: moment(agent?.updatedAt) || null, // Convert to moment object
    },
  });

  useEffect(() => {
    reset({
      fullName: agent?.fullName || "",
      email: agent?.email || "",
      status: agent?.status || "",
      updatedAt: moment(agent?.updatedAt) || null, // Convert to moment object
      isVerified: agent?.isVerified || "",
      plan: agent?.subscription?.plan || "",
    });
  }, [agent, reset]);

  const handleEdit = handleSubmit(async (formData) => {
    const updatedAgent = {
      fullName: formData.fullName,
      email: formData.email,
      status: formData.status,
      isVerified: formData.isVerified,
      plan: formData.plan,
      updatedAt: moment(formData.updatedAt).toISOString(), // Convert back to string if needed
    };
    const [response] = await editAgent(updatedAgent);
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
      <h1 className="font-bold text-left text-[#040821] text-[18px]">
        Edit Agent Details
      </h1>
      <p className="text-left text-[#040821] text-[14px]">
        An invitation email will be sent to the email provided below for the
        client to create a password and get started with the dashboard.
      </p>
      {agent ? (
        <form className="w-full mt-10" onSubmit={handleEdit}>
          <div className="grid grid-cols-2 gap-6 mx-auto">
            <Controller
              name="fullName"
              control={control}
              rules={{
                required: "Agent name is required",
                minLength: {
                  value: 3,
                  message: "Agent name must be at least 3 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Agent name"
                  className="w-full"
                  error={fieldState?.error?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email. E.g., example@gmail.com",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Email"
                  className="w-full"
                  error={fieldState?.error?.message}
                />
              )}
            />
            <Controller
              name="status"
              control={control}
              rules={{
                required: "Status is required",
              }}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  label="Status"
                  className="w-full"
                  error={fieldState?.error?.message}
                  options={[
                    { value: "pending", label: "Pending" },
                    { value: "active", label: "Active" },
                  ]}
                />
              )}
            />
            <Controller
              name="isVerified"
              control={control}
              rules={{
                required: "Verification is required",
              }}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  label="Verification"
                  className="w-full"
                  error={fieldState?.error?.message}
                  options={[
                    { value: "true", label: "Verified" },
                    { value: "false", label: "Unverified" },
                  ]}
                />
              )}
            />
            <Controller
              name="plan"
              control={control}
              rules={{
                required: "Subscription is required",
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Subscription"
                  className="w-full"
                  error={fieldState?.error?.message}
                />
              )}
            />

            <Controller
              name="updatedAt"
              control={control}
              defaultValue={moment(agent?.updatedAt) || null}
              rules={{
                required: "Date is required",
              }}
              render={({ field, fieldState }) => (
                <DatePicker
                  value={field.value} // This should now be a moment object
                  label="Date"
                  className="h-[45px] mt-8"
                  error={fieldState?.error?.message}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="flex gap-8 justify-end items-center mt-8">
            <button className="border w-[84px] h-[40px] rounded-md" onClick={handleClose}>
              Cancel
            </button>
            <Button size="sm" variant="primary" type="submit">
              {loading ? (
                <CircleLoader color="#ffffff" loading={loading} size={20} />
              ) : (
                "Save details"
              )}
            </Button>
          </div>
        </form>
      ) : (
        <p>Loading agent details...</p>
      )}
    </Modal>
  );
};

export default EditAgent;
