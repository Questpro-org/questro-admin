import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";

export default function SearchSelect({
  label,
  options,
  className,
  onChange,
  value = [],
  error,
}) {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (option) => {
    if (!selected.includes(option)) {
      const newSelected = [...selected, option];
      setSelected(newSelected);
      onChange(newSelected);
    }
  };

  const handleRemove = (option) => {
    const newSelected = selected.filter((item) => item !== option);
    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div className={`${className}`}>
      <div className="lg:text-[14px] text-[12px] font-normal text-[#040821]">
        <label>{label}</label>
      </div>
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className={`w-full h-[45px] pl-5 flex items-center font-normal justify-between border-2 border-solid rounded-md cursor-pointer ${
            !selected?.length && "text-[#040821]"
          }`}
        >
          {selected.length
            ? selected?.map((item) => (
                <span key={item} className="bg-[#459BDA] hidden text-white px-2 py-1 rounded mr-1">
                  {item} <IoIosClose onClick={() => handleRemove(item)} className="inline cursor-pointer" />
                </span>
              ))
            : "Select"}

          <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
        </div>
        <ul
          className={`bg-[#F8F8F8] mt-2 overflow-y-auto h-[200px] w-full absolute rounded-md ${
            open ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center px-2 sticky top-0 bg-[#F8F8F8] border-b">
            <AiOutlineSearch size={18} className="text-gray-700" />
            <input
              type="text"
              value={inputValue}
              autoFocus={true}
              onChange={(e) => setInputValue(e.target.value?.toLowerCase())}
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
          {options
            ?.filter((option) =>
              option.label.toLowerCase().includes(inputValue)
            )
            .map((option) => (
              <li
                key={option.label}
                className={`p-2 text-sm hover:bg-sky-600 hover:text-white cursor-pointer ${
                  selected.includes(option.label) && "bg-sky-600 text-white"
                }`}
                onClick={() => handleSelect(option.label)}
              >
                {option.label}
              </li>
            ))}
        </ul>
      </div>
      {selected.length > 0 && (
        <div className="mt-3">
          {selected.map((item) => (
            <span key={item} className="bg-[#459BDA] text-white px-2 py-1 rounded mr-1 mb-1 inline-block">
              {item} <IoIosClose onClick={() => handleRemove(item)} className="inline cursor-pointer" />
            </span>
          ))}
        </div>
      )}
      {error && (
        <span className="error-text text-[#FF0101] text-[14px]">{error}</span>
      )}
    </div>
  );
}
