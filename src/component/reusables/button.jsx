import React, { ReactNode } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
const Button = ({
  size = "lg",
  variant,
  children,
  type,
  href,
  onClick,
  className
}) => {
  return (
    <>
      {href ? (
        <Link
          to={href}
          className={classNames(
            "inline-flex items-center justify-center text-center px-5 py-2 gap-2 border-2 border-[#459BDA] rounded-lg font-bold text-sm md:text-sm",
            {
              "w-full": size === "lg",
              "w-[75%]": size === "md",
              "w-[50%]": size === "sm",
              "w-full md:w-[50%]": size === "full-half",
              "text-[#fff] bg-[#459BDA] hover:opacity-75":
                variant === "primary",
              "text-[#459BDA]": variant === "secondary",
            },
            className
          )}>
          {children}
        </Link>
      ) : (
        <button
          className={classNames(
            "inline-flex items-center justify-center text-center px-5 py-2 gap-2 border-2 border-[#459BDA] rounded-lg font-bold text-sm md:text-sm",
            {
              "w-full": size === "lg",
              "w-[75%]": size === "md",
              "w-[50%]": size === "sm",
              "w-full md:w-[50%]": size === "full-half",
              "text-[#fff] bg-[#459BDA] hover:opacity-75":
                variant === "primary",
              "text-[#459BDA]": variant === "secondary",
            },
            className
          )}
          type={type}
          onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
