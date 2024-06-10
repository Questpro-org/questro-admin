import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import useRequest from "../../components/hooks/use-request";
import { CircleLoader } from "react-spinners";
// import Logo from "../../assets/Logo Desktop.svg";
// import Visible from "../../assets/Eye.svg";
// import Invisible from "../../assets/eye-regular.svg";
// import { showToast } from "../../components/toast";
import Input from "../../component/input";
import Card from "../../component/cards";
import Button from "../../component/button";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState()
  // const { loading, makeRequest } = useRequest("/auth/login", "POST");
  const { handleSubmit, control } = useForm();
  const [viewPassword, setViewPassword] = useState("");
  const handleShowPassword = () => {
    setViewPassword((previousValue) => !previousValue);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const handleLogin = handleSubmit(async (formData) => {
  //   const user = {
  //     email: formData.email,
  //     password: formData.password,
  //   };
  //   const [response] = await makeRequest(user);
  //   if (response.status) {
  //     localStorage.setItem("token", response.data.token);
  //     localStorage.setItem("user", JSON.stringify(response?.data?.user));
  //     showToast(response.message, true, {
  //       position: "top-center",
  //     });
  //     navigate("/")
  //   } else {
  //     showToast(response.message, false, {
  //       position: "top-center",
  //     });
  //     navigate("/login")
  //   }
  // });

  return (
    <Card>
      <div className="flex flex-col mt-10 lg:w-[80%] px-5 lg:px-0 mx-auto ">
        {/* <img src={Logo} alt="logo" className="h-[27px]" /> */}
        <p className="custom-font md:text-[30px] font-black text-center text-[#459BDA] ">
          Welcome to Quest
          <br /> Properties
        </p>
        <form className="mt-6 md:mt-8">
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
                    {/* {viewPassword ? (
                      <img src={Invisible} alt="password" />
                    ) : (
                      <img src={Visible} alt="password" />
                    )} */}
                  </button>
                </div>
              )}
            />
          </div>
           
            <p className="text-[#459BDA] custom-font text-right text-sm md:text-base">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>

          <div className="flex justify-center items-center mt-5">
            <Button size="lg" variant="primary" type="submit" href='/'>
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
