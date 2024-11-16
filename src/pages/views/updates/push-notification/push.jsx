import React from "react";
import Input from "../../../../component/reusables/input";
import Textarea from "../../../../component/reusables/textarea";
import PhoneImage from "../../../../assets/images/Frame 626671.svg";
import { useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import SearchSelect from "../../../../component/reusables/search-select";
import states from "../../../../json/data";

function Push1({ control, UpdateProperty, setValue, }) {
  const navigate = useNavigate();
  return (
    <>
      <form onSubmit={UpdateProperty}>
        <div className="border justify-between lg:flex mx-10 rounded-md px-5 py-5">
          <div className=" w-full">
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  label="Message title"
                  placeholder="Enter the title of your message"
                  className="w-full"
                  value={field.value}
                  error={fieldState?.error?.message}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="content"
              control={control}
              defaultValue=""
              rules={{
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Message must be at least 10 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <Textarea
                  type="text"
                  label="Message body"
                  placeholder="Enter your message body"
                  className="w-full mt-6"
                  value={field.value}
                  error={fieldState?.error?.message}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                minLength: {
                  value: 3,
                  message: "Country must be at least 3 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  label="Country"
                  placeholder="Enter your country"
                  className="w-full mt-2"
                  value={field.value}
                  error={fieldState?.error?.message}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="state"
              control={control}
              defaultValue={[]}
              rules={{ required: "Select a State" }}
              render={({ field, fieldState }) => (
                <>
                  <SearchSelect
                    label="State"
                    name="state"
                    options={states.map((state) => ({
                      value: state,
                      label: state,
                    }))}
                    className="w-full mt-3"
                    onChange={(selectedValue) => {
                      field.onChange(selectedValue);
                      setValue("stateCode", selectedValue);
                    }}
                    value={field.value}
                    error={fieldState?.error?.message}
                  />
                </>
              )}
            />

            <Controller
              name="url"
              control={control}
              defaultValue=""
              rules={{
                pattern: {
                  value: /^(https?|ftp):\/\/[^\s]+$/,
                  message: "Invalid URL",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  type="text"
                  label="Custom link"
                  placeholder="https://"
                  className="w-full mt-6"
                  value={field.value}
                  error={fieldState?.error?.message}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <img src={PhoneImage} alt="PhoneImage" />
        </div>

        <div className="flex justify-between px-10 mt-8">
          <button
            className="border w-[84px]  rounded-md"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <button className="border px-5 py-1 flex gap-3 bg-[#459BDA] hover:bg-[#008138] text-[#fff] text-[14px] font-semibold rounded-md border-[#459BDA]">
            Continue
          </button>
        </div>
      </form>
      <br />
    </>
  );
}

export default Push1;
