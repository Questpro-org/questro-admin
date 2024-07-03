import React from "react";
import Avatar from "../../../../assets/images/an_avatar_image.jpeg";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../../utilities/function";

function UserComments({ comments }) {
  return (
    <div className="mt-6">
      <h4 className="text-[#28292C] text-[16px] font-bold">User comments</h4>

      {comments && comments?.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-black">
          {comments?.map((item, index) => (
            <div key={index} className="">
              <div className="p-4">
                <div className="flex gap-3 items-center">
                  <img
                    src={Avatar}
                    className="w-[40px] h-[40px] rounded-full "
                    alt="Avartar"
                  />
                  <h2 className="text-[16px] text-[#000] font-semibold">
                    {capitalizeFirstLetter(item?.name)}{" "}
                    <span className="text-[12px] block font-normal text-[#2A2A2A]">
                      {formatDate(item?.updatedAt)}
                    </span>
                  </h2>
                </div>
                <h2 className="text-[14px] mt-4 text-[#272727]">
                  {capitalizeFirstLetter(item?.comment)}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-[#28292C] text-[16px] font-bold">
          No properties available
        </div>
      )}
    </div>
  );
}

export default UserComments;
