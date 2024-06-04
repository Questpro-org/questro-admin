import React, { useState } from "react";
import Input from "../../components/input";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button";
import useRequest from "../../components/hooks/use-request";
import { CircleLoader } from "react-spinners";
import Logo from "../../assets/Logo Desktop.svg";
import Visible from "../../assets/Eye.svg";
import Invisible from "../../assets/eye-regular.svg";
import { showToast } from "../../components/toast";

const Login = () => {
  const navigate = useNavigate();
  const { loading, makeRequest } = useRequest("/auth/login", "POST");
  const { handleSubmit, control } = useForm();
  const [viewPassword, setViewPassword] = useState("");
  const handleShowPassword = () => {
    setViewPassword((previousValue) => !previousValue);
  };

  const handleMouseDownPassword = (
    event
  ) => {
    event.preventDefault();
  };

  const handleLogin = handleSubmit(async (formData) => {
    const user = {
      email: formData.email,
      password: formData.password,
    };
    const [response] = await makeRequest(user);
    if (response.status) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      showToast(response.message, true, {
        position: "top-center",
      });
      navigate("/")
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
      navigate("/login")
    }
  });

  return (
    <div className="flex flex-col mt-10 lg:w-[40%] px-5 lg:px-0 mx-auto ">
      <img src={Logo} alt="logo" className="h-[27px]" />
      <p className="font-semibold text-md md:text-[26px] text-center mt-3">
        Welcome Back!
      </p>
      <span className="text-[14px] font-light text-center">Sign in as an Admin User</span>
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
                className="w-full "
                label="Email address"
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
                  value={field.value}
                  className="w-full mt-3"
                  error={fieldState?.error?.message}
                  onChange={field.onChange}
                />
                <button
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
                  </button>
              </div>
            )}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-1 md:gap-3 items-center">
            <Controller
              name="rememberMe"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="w-5 h-5 md:h-8 md:w-8 text-green-500 border-2 border-green-500 rounded focus:outline-none focus:border-green-700"
                  {...field}
                />
              )}
            />
            <label className="text-sm md:text-base">Remember me</label>
          </div>

          <button className="text-[#0979A1] font-bold text-sm md:text-base">
            <Link to="/forgot-password">Forgot password?</Link>
          </button>
        </div>

        <div className="flex justify-center items-center mt-10">
          <Button size="md" variant="primary" type="submit">
            {loading ? (
              <CircleLoader color="#ffffff" loading={loading} size={20} />
            ) : (
              "  Sign in"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
