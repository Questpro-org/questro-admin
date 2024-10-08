import React, { useEffect, useState } from "react";
import { Modal, DatePicker } from "antd";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../../component/reusables/button";
import Input from "../../../../component/reusables/input";
import { showToast } from "../../../../component/reusables/toast";
import { CircleLoader } from "react-spinners";
import useRequest from "../../../../component/hook/use-request";
import Select from "../../../../component/reusables/select";
import moment from "moment";
import useApi from "../../../../component/hook/request";

const EditAgent = ({ visible, handleClose, agent }) => {
  const subscriptionOptions = [
    { value: "", label: "Select your plan" },
    { value: "test-daily", label: "Test-Daily" },
    { value: "test-weekly", label: "Test-Weekly" },
    { value: "test-monthly", label: "Test-Monthly" },
    { value: "test-quarterly", label: "Test-Quarterly" },
    { value: "beta-daily", label: "Beta-Daily" },
    { value: "beta-weekly", label: "Beta-Weekly" },
    { value: "beta-monthly", label: "Beta-Monthly" },
    { value: "beta-quarterly", label: "Beta-Quarterly" },
    { value: "starter-daily", label: "Starter-Daily" },
    { value: "starter-weekly", label: "Starter-Weekly" },
    { value: "starter-monthly", label: "Starter-Monthly" },
    { value: "starter-quarterly", label: "Starter-Quarterly" },
    { value: "max-daily", label: "Max-Daily" },
    { value: "max-weekly", label: "Max-Weekly" },
    { value: "max-monthly", label: "Max-Monthly" },
    { value: "max-quarterly", label: "Max-Quarterly" },
    { value: "premium-daily", label: "Premium-Daily" },
    { value: "premium-weekly", label: "Premium-Weekly" },
    { value: "premium-monthly", label: "Premium-Monthly" },
    { value: "premium-quarterly", label: "Premium-Quarterly" },
  ];

  const [data, setData] = useState([]);
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/admin/agents", "GET", {
    Authorization: `Bearer ${userToken}`,
  });
  const { makeRequest: editAgent, loading } = useApi(
    `/admin/agent/${agent?._id}`,
    "PATCH",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await makeRequest();
      setData(response?.data?.data?.docs || []);
    };
    fetchData();
  }, []);

  const { handleSubmit, control, reset } = useForm();

  // useEffect(() => {
  //   reset({
  //     firstname: agent?.firstname || "",
  //     lastname: agent?.lastname || "",
  //     email: agent?.email || "",
  //     status: agent?.status || "",
  //     isVerified: agent?.isVerified || "",
  //     subscription: agent?.subscription
  //       ? `${agent.subscription.plan}-${agent.subscription.duration}`
  //       : "",
  //     updatedAt: moment(agent?.updatedAt) || null,
  //   });
  // }, [agent, reset]);

  const handleEdit = handleSubmit(async (formData) => {
    let updatedAgent = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      status: formData.status,
      agencyName: formData.agencyName,
      isVerified: formData.isVerified,
    };

    if (formData.subscription) {
      const [plan, duration] = formData.subscription.split("-");
      updatedAgent = {
        ...updatedAgent,
        subscription: {
          plan,
          duration,
        },
      };
    }

    const [response] = await editAgent(updatedAgent);
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
      reset();
      handleClose();
      setTimeout(() => {
        window.location.reload()
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
              name="firstname"
              control={control}
              rules={{
                minLength: {
                  value: 3,
                  message: "Agent name must be at least 3 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="First name"
                  className="w-full"
                  error={fieldState?.error?.message}
                />
              )}
            />

            <Controller
              name="lastname"
              control={control}
              rules={{
                minLength: {
                  value: 3,
                  message: "Agent name must be at least 3 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Last name"
                  className="w-full"
                  error={fieldState?.error?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
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
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  label="Status"
                  className="w-full"
                  error={fieldState?.error?.message}
                  options={[
                    { value: "", label: "Choose Status" },
                    { value: "active", label: "Active" },
                    { value: "pending", label: "Pending" },
                    { value: "deactivate", label: "Deactivate" }
                  ]}
                />
              )}
            />
            <Controller
              name="isVerified"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  label="Verification"
                  className="w-full"
                  error={fieldState?.error?.message}
                  options={[
                    { value: "", label: "Select Verification" },
                    { value: "true", label: "Verified" },
                    { value: "false", label: "Unverified" },
                  ]}
                />
              )}
            />

            <Controller
              name="subscription"
              control={control}
              render={({ field, fieldState }) => (
                <Select
                  {...field}
                  label="Subscription"
                  className="w-full"
                  error={fieldState?.error?.message}
                  options={subscriptionOptions}
                />
              )}
            />

            {/* <Controller
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
            /> */}
          </div>

          <div className="flex gap-8 justify-end items-center mt-8">
            <button
              className="border w-[84px] h-[40px] rounded-md"
              onClick={handleClose}
            >
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
