import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import Input from "../../component/reusables/input";
import Card from "../../component/reusables/cards";
import useRequest from "../../component/hook/use-request";
import { showToast } from "../../component/reusables/toast";
import Button from "../../component/reusables/button";

const Login = () => {
  const navigate = useNavigate();
  const { loading, makeRequest } = useRequest("/admin/login", "POST");
  const { handleSubmit, control } = useForm();
  const [viewPassword, setViewPassword] = useState("");
  const handleShowPassword = () => {
    setViewPassword((previousValue) => !previousValue);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = handleSubmit(async (formData) => {
    const user = {
      email: formData.email,
      password: formData.password,
    };
    const [response, status] = await makeRequest(user);
    if (status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response?.data?.superAdmin));
      showToast(response?.message, true, {
        position: "top-center",
      });
      navigate("/")
    } else {
      showToast(response?.message, false, {
        position: "top-center",
      });
      navigate("/login")
    }
  });

  return (
    <Card>
      <div className="flex flex-col mt-10 lg:w-[80%] px-5 lg:px-0 mx-auto ">
        <p className="custom-font md:text-[30px] font-black text-center text-[#459BDA] ">
          Welcome to Quest
          <br /> Properties
        </p>
        <form className="mt-6 md:mt-8" onSubmit={handleLogin}>
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
                  label="Company Email"
                  error={fieldState?.error?.message}
                  onChange={field.onChange}
                />
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
                    label="Password"
                    type={viewPassword ? "text" : "password"}
                    placeholder={"*******"}
                    value={field.value}
                    className="w-full mt-3 custom-font"
                    error={fieldState?.error?.message}
                    onChange={field.onChange}
                  />
                  <button
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    className="w-5 h-5 absolute top-1/2 right-2 transform -translate-y-1/2 mt-3 md:mt-4"
                    type="button"
                  >
                  </button>
                </div>
              )}
            />
          </div>
           
            <p className="text-[#459BDA] custom-font text-right text-sm md:text-base">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>

          <div className="flex justify-center items-center mt-5">
            <Button size="lg" variant="primary" type="submit">
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "Enter"
            )}
          </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default Login;
