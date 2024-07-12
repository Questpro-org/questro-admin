import { Modal } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import useRequest from "../../../../component/hook/use-request";
import { showToast } from "../../../../component/reusables/toast";
import Input from "../../../../component/reusables/input";
import Button from "../../../../component/reusables/button";
import { CircleLoader } from "react-spinners";

function CreatePassword({ visible, handleClose, admin }) {
  const userToken = localStorage.getItem("token");
  const { makeRequest: addAdmin, loading } = useRequest(
    `/admin/set-password/${admin?._id}`,
    "POST",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const { handleSubmit, control, reset, getValues } = useForm();

  const createPassword = handleSubmit(async (formData) => {
    const setPassword = {
      password: formData.password,
    };

    const [response] = await addAdmin(setPassword);
    if (response.status === 200 || response.status === 201) {
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
      width={390}
      closable={true}
      footer={null}
    >
      <h2 className="font-bold text-center text-[24px]">Set Admin Password</h2>
      <form
        className="mt-5 flex flex-col gap-5 items-center"
        onSubmit={createPassword}
      >
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 70,
              message: "Password must not be more than 70 characters",
            },
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_\W])[A-Za-z\d@$!%*#?&_\W]{6,70}$/,
              message:
                "Password must contain at least one alphabet, one number, and one special character",
            },
          }}
          render={({ field, fieldState }) => (
            <div className="w-full relative">
              <Input
                label="Password"
                type="password"
                value={field.value}
                placeholder="Password"
                className="w-full"
                error={fieldState?.error?.message}
                onChange={field.onChange}
              />
            </div>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: "Confirm Password is required",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          }}
          render={({ field, fieldState }) => (
            <div className="w-full relative">
              <Input
                label="Confirm Password"
                type="password"
                value={field.value}
                placeholder="Confirm Password"
                className="w-full"
                error={fieldState?.error?.message}
                onChange={field.onChange}
              />
            </div>
          )}
        />

        <Button size="full-half" variant="primary" type="submit">
          {loading ? (
            <CircleLoader color="#ffffff" loading={loading} size={20} />
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Modal>
  );
}

export default CreatePassword;
