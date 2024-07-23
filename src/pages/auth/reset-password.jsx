import React, { useState } from "react";
import Card from "../../component/reusables/cards";
import { Controller, useForm } from "react-hook-form";
import Input from "../../component/reusables/input";
import Button from "../../component/reusables/button";
import { CircleLoader } from "react-spinners";
import { showToast } from "../../component/reusables/toast";
import useRequest from "../../component/hook/use-request";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const { loading, makeRequest } = useRequest(
    `/admin/reset-password/${id}`,
    "POST",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );
  const { handleSubmit, control, reset, getValues } = useForm();

  const handleSubmitPassword = handleSubmit(async (formData) => {
    const userReset = {
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    const [response] = await makeRequest(userReset);
    if (response.status) {
      showToast('A password reset link has been sent to your email address', true, {
        position: "top-center",
      });
      reset();
      navigate("/login");
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  });

  return (
    <Card>
      <div className="flex flex-col mt-10 w-[80%] mx-auto ">
        <p className="custom-font text-md md:text-[30px] text-[#459BDA] text-center mt-3">
          Reset Password
        </p>
        <span className="text-[14px] text-center">
          Create a new password to reset your account.
        </span>
        <form onSubmit={handleSubmitPassword} className="mt-6 md:mt-2">
          <div className="gap-4 md:gap-6 mb-5">
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
          </div>

          <div className="flex justify-center items-center mt-10">
            <Button size="lg" variant="primary" type="submit">
              {loading ? (
                <CircleLoader color="#ffffff" size={20} />
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default ResetPassword;
