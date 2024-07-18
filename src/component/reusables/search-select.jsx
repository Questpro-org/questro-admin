import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";

export default function SearchSelect({
  label,
  options,
  className,
  onChange,
  value,
  error,
}) {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(value || "");
  }, [setSelected, value]);

  return (
    <div className={`${className}`}>
      <div className="lg:text-[14px] text-[12px] font-normal text-[#040821]">
        <label>{label}</label>
      </div>
      <div>
        <div className="font-medium relative">
          <div
            onClick={() => setOpen(!open)}
            className={`w-full h-[45px] pl-5 flex items-center font-normal justify-between border-2 border-solid rounded-md ${
              !selected && "text-[#040821]"
            }`}
          >
            {selected
              ? selected?.length > 25
                ? selected?.substring(0, 25) + "..."
                : selected
              : "Select Bank Name"}

            {open ? (
              <IoIosClose
                size={18}
                className="text-gray-700"
                onClick={() => setInputValue("")}
              />
            ) : (
              <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
            )}
          </div>
          <ul
            className={`bg-[#F8F8F8] mt-2 overflow-y-auto h-[485px] md:h-[400px] w-full absolute -top-[500px] md:-top-[415px] rounded-md ${
              open
                ? "max-h-[500px] drop-shadow-lg border-2 border-solid"
                : "max-h-0 border-0"
            } `}
          >
            <div className="flex items-center px-2 sticky top-0 bg-[#F8F8F8] border-b">
              <AiOutlineSearch size={18} className="text-gray-700" />
              <input
                type="text"
                value={inputValue}
                autoFocus={true}
                onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                placeholder={`Search ${label}`}
                className="flex-1 placeholder:text-gray-400 bg-[#F8F8F8] p-2 outline-none"
              />
              <IoIosClose
                size={18}
                className="text-gray-700"
                onClick={() => {
                  if (inputValue === "") {
                    setOpen(!open);
                  } else {
                    setInputValue("");
                  }
                }}
              />
            </div>
            {options?.map((option) => (
              <li
                key={option?.label}
                className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              option?.label?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              option?.label?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
                onClick={() => {
                  if (
                    option?.label?.toLowerCase() !== selected?.toLowerCase()
                  ) {
                    setSelected(option?.label);
                    setOpen(false);
                    setInputValue("");
                    onChange(option?.label);
                  }
                }}
              >
                {option?.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {error && (
        <span className="error-text text-[#FF0101] text-[14px]">{error}</span>
      )}
    </div>
  );
}
