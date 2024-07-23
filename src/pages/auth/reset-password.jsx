import React, { useState } from "react";
import Card from "../../component/reusables/cards";
import { Controller, useForm } from "react-hook-form";
import Input from "../../component/reusables/input";
import Button from "../../component/reusables/button";
import { CircleLoader } from "react-spinners";
import { showToast } from "../../component/reusables/toast";
import useRequest from "../../component/hook/use-request";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { id } = useParams();
  const userToken = localStorage.getItem("token");
  const { loading, makeRequest } = useRequest(
    `/admin/reset-password/${id}`,
    "PUT",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );
  const { handleSubmit, control } = useForm();
  const [viewPassword, setViewPassword] = useState("");
  const [confirmViewPassword, setConfirmViewPassword] = useState("");

  const handleSubmitPassword = handleSubmit(async (formData) => {
    const userReset = {
      password: formData.password,
    };
    const [response] = await makeRequest(userReset);
    if (response.status) {
      showToast(response.message, true, {
        position: "top-center",
      });
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
                  value: 13,
                  message: "Password must not be more than 13 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <div className="w-full relative">
                  <Input
                    label="New Password"
                    type={viewPassword ? "text" : "password"}
                    value={field.value}
                    className="w-full mt-3 custom-font"
                    error={fieldState?.error?.message}
                    onChange={field.onChange}
                  />
                  {/* <button
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      className="w-5 h-5 absolute top-1/2 right-2 transform -translate-y-1/2 mt-3 md:mt-4"
                      type="button"
                    >
                      {viewPassword ? (
                        <img src={Invisible} alt="password" />
                      ) : (
                        <img src={Visible} alt="password" />
                      )}
                    </button> */}
                </div>
              )}
            />

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
                  value: 13,
                  message: "Password must not be more than 13 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <div className="w-full relative">
                  <Input
                    label="Confirm Password"
                    type={confirmViewPassword ? "text" : "password"}
                    value={field.value}
                    className="w-full mt-3 custom-font"
                    error={fieldState?.error?.message}
                    onChange={field.onChange}
                  />
                  {/* <button
                      onClick={handleConfirmShowPassword}
                      onMouseDown={handleConfirmMouseDownPassword}
                      className="w-5 h-5 absolute top-1/2 right-2 transform -translate-y-1/2 mt-3 md:mt-4"
                      type="button"
                    >
                      {confirmViewPassword ? (
                        <img src={Invisible} alt="password" />
                      ) : (
                        <img src={Visible} alt="password" />
                      )}
                    </button> */}
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
