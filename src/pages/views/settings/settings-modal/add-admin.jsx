import React from "react";
import { Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../../component/reusables/button";
import Input from "../../../../component/reusables/input";
import { showToast } from "../../../../component/reusables/toast";
import { CircleLoader } from "react-spinners";
import Select from "../../../../component/reusables/select";
import { DatePicker } from "antd";
import moment from "moment";
import useApi from "../../../../component/hook/request";

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
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      status: formData.status,
      isVerified: formData.isVerified,
      plan: formData.plan,
      updatedAt: moment(formData.updatedAt).toISOString(),
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
        Edit Agent Details
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
                required: "Agent's last name is required",
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
              defaultValue={""}
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
