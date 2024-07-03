import React from "react";
import { Modal, DatePicker } from "antd";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../../component/reusables/button";
import Input from "../../../../component/reusables/input";
import { showToast } from "../../../../component/reusables/toast";
import { CircleLoader } from "react-spinners";
import Select from "../../../../component/reusables/select";
import useApi from "../../../../component/hook/request";
import moment from "moment";

const AddAdmin = ({ visible, handleClose }) => {
  const userToken = localStorage.getItem("token");
  const { makeRequest: addAdmin, loading } = useApi(
    `/admin/create-admin`,
    "POST",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const { handleSubmit, control, reset } = useForm();

  const handleEdit = handleSubmit(async (formData) => {
    const updatedAgent = {
      username: formData.username,
      email: formData.email,
      roles: formData.roles,
      permissions: {
        dashboard: formData.dashboard,
        settings: formData.settings,
      },
    };

    const [response] = await addAdmin(updatedAgent);
    if (response) {
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
        Add User
      </h1>
      <p className="text-left text-[#040821] text-[14px]">
        An invitation email will be sent to the email provided below for the
        client to create a password and get started with the dashboard.
      </p>

      <form className="w-full mt-10" onSubmit={handleEdit}>
        <div className="grid grid-cols-2 gap-6 mx-auto">
          <Controller
            name="firstname"
            control={control}
            rules={{
              required: "Agent's first name is required",
              minLength: {
                value: 3,
                message: "Agent name must be at least 3 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Name"
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
            name="roles"
            control={control}
            rules={{
              required: "Role is required",
            }}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                label="Role"
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
            name="updatedAt"
            control={control}
            defaultValue={null}
            rules={{
              required: "Date is required",
            }}
            render={({ field, fieldState }) => (
              <DatePicker
                {...field}
                value={field.value ? moment(field.value) : null}
                label="Date"
                className="h-[45px] mt-8"
                error={fieldState?.error?.message}
                onChange={(date, dateString) => field.onChange(dateString)}
              />
            )}
          />
          <Controller
            name="dashboard"
            control={control}
            defaultValue={false}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="checkbox"
                label="Dashboard"
                className="w-full"
                error={fieldState?.error?.message}
              />
            )}
          />
          <Controller
            name="settings"
            control={control}
            defaultValue={false}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                type="checkbox"
                label="Settings"
                className="w-full"
                error={fieldState?.error?.message}
              />
            )}
          />
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
    </Modal>
  );
};

export default AddAdmin;
