import classNames from "classnames";

export default function Input({
  label,
  placeholder,
  className,
  type,
  onChange,
  name,
  value,
  error,
  readOnly = false,
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={label}>
        {label && (
          <div className="lg:text-[14px] text-[12px] font-normal text-[#040821] mb-">
            {label}
          </div>
        )}
        <input
          id={label}
          placeholder={placeholder}
          className={classNames(
            "text-field w-full h-[45px] border-2 solid pl-5 bg-transparent rounded-md outline-none",
            { error: error }
          )}
          onChange={onChange}
          value={value}
          type={type === "number" ? "text" : type}
          name={name}
          readOnly={readOnly}
        />
      </label>
      {error && (
        <span className="error-text text-[#FF0101] text-[12px]">{error}</span>
      )}
    </div>
  );
}
