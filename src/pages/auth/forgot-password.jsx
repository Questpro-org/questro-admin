import React, { useState } from "react";
import Card from "../../component/reusables/cards";
import { Controller, useForm } from "react-hook-form";
import Input from "../../component/reusables/input";
import { CircleLoader } from "react-spinners";
import useRequest from "../../component/hook/use-request";
import { showToast } from "../../component/reusables/toast";
import Button from "../../component/reusables/button";

function ForgotPassword() {
  const { loading, makeRequest } = useRequest("/admin/forgot-password", "POST");
  const { handleSubmit, control, reset } = useForm();
  const [success, setSuccess] = useState(false);

  const handleSubmitPassword = handleSubmit(async (formData) => {
    const userEmail = {
      email: formData.email,
    };
    const [response, status] = await makeRequest(userEmail);
    if (response?.status) {
      setSuccess(true);
      showToast(response?.message, true, {
        position: "top-center",
      });
      reset()
    } else {
      showToast(response?.message, false, {
        position: "top-center",
      });
    }
  });

  return (
    <Card>
      <div className="flex flex-col mt-5 w-[80%] mx-auto ">
        <p className="custom-font text-md md:text-[30px] text-[#459BDA] text-center mt-3">
          Forgot Password
        </p>
        <span className="text-[14px] text-center">
          Enter your email and we'll send you a reset link
        </span>
        <form onSubmit={handleSubmitPassword} className="mt-6 md:mt-8">
          <div className="gap-4 md:gap-6 mb-5">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email. E.g, example@gmail.com",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  value={field.value}
                  className="w-full custom-font"
                  placeholder="you@questpro.com"
                  label="Email"
                  error={fieldState?.error?.message}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="flex justify-center items-center mt-10">
            <Button
              size="md"
              variant="primary"
              type="submit"
              className="custom-font"
            >
              {loading ? (
                <CircleLoader color="#ffffff" loading={loading} size={20} />
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

export default ForgotPassword;
