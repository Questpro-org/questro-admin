import classNames from "classnames";
import { ChangeEvent } from "react";

export default function Textarea({
  label,
  placeholder,
  className,
  onChange,
  name,
  value,
  error,
  readOnly = false,
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <div className="lg:text-[14px] text-[12px] font-normal text-[#040821] mb-3">
          {label}
        </div>
      )}

      <textarea
        placeholder={placeholder}
        className={classNames(
          "text-field w-full h-[201px] border-2 solid p-5 bg-[#F1F5F9] rounded-md outline-none",
          { error: error }
        )}
        onChange={onChange}
        value={value}
        name={name}
        readOnly={readOnly}
      />

      {error && (
        <span className="error-text text-[#FF0101] text-[14px]">{error}</span>
      )}
    </div>
  );
}
