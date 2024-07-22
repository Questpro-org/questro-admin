import React from "react";
import { Modal, DatePicker, Switch } from "antd";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../../component/reusables/button";
import Input from "../../../../component/reusables/input";
import { showToast } from "../../../../component/reusables/toast";
import { CircleLoader } from "react-spinners";
import Select from "../../../../component/reusables/select";
import moment from "moment";
import useRequest from "../../../../component/hook/use-request";

const AddAdmin = ({ visible, handleClose }) => {
  const userToken = localStorage.getItem("token");
  const { makeRequest: addAdmin, loading } = useRequest(
    `/admin/create-admin`,
    "POST",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const { handleSubmit, control, reset } = useForm();

  const handleAddAdmin = handleSubmit(async (formData) => {
    const addAdminUser = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
      createdAt: formData.createdAt,
      permissions: {
        agentManagement: formData.agentManagement,
        dashboard: formData.dashboard,
        settings: formData.settings,
        propertyUpdates: formData.propertyUpdates,
        pushNotifications: formData.pushNotifications,
        userManagement: formData.userManagement,
      },
    };

    const [response] = await addAdmin(addAdminUser);
    if (response.status === 201) {
      showToast(response.message, true, {
        position: "top-center",
      });
      reset();
      handleClose();
      setTimeout(() => {
        window.location.reload()
      },2000 );
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

      <form className="w-full mt-10" onSubmit={handleAddAdmin}>
        <div className="grid grid-cols-2 gap-6 mx-auto">
          <Controller
            name="username"
            control={control}
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
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
            name="role"
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
                  { value: "", label: "Select a role" },
                  { value: "admin", label: "Admin" },
                  { value: "superAdmin", label: "Super Admin" },
                ]}
              />
            )}
          />

          <Controller
            name="createdAt"
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
                className="h-[45px] mt-8 w-full"
                error={fieldState?.error?.message}
                onChange={(date, dateString) => field.onChange(dateString)}
              />
            )}
          />
        </div>

        <div className="mt-6">
          <h2 className="text-left text-[#040821] text-[14px] font-semibold">
            Permissions
          </h2>
          <p className="text-left text-[#040821] text-[12px] mb-4">
            Toggle the required permissions for this user
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="agentManagement"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex items-center">
                  <Switch {...field} checked={field.value} />
                  <label className="ml-2">Agent management</label>
                </div>
              )}
            />
            <Controller
              name="dashboard"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex items-center">
                  <Switch {...field} checked={field.value} />
                  <label className="ml-2">Dashboard</label>
                </div>
              )}
            />
            <Controller
              name="settings"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex items-center">
                  <Switch {...field} checked={field.value} />
                  <label className="ml-2">Settings</label>
                </div>
              )}
            />
            <Controller
              name="propertyUpdates"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex items-center">
                  <Switch {...field} checked={field.value} />
                  <label className="ml-2">Property Update</label>
                </div>
              )}
            />
            <Controller
              name="pushNotifications"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex items-center">
                  <Switch {...field} checked={field.value} />
                  <label className="ml-2">Push Notifications</label>
                </div>
              )}
            />
            <Controller
              name="userManagement"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex items-center">
                  <Switch {...field} checked={field.value} />
                  <label className="ml-2">User management</label>
                </div>
              )}
            />
          </div>
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
              "Add user"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAdmin;
