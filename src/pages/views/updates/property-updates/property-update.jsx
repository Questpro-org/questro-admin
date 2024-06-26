import React from "react";
import Input from "../../../../component/reusables/input";
import Textarea from "../../../../component/reusables/textarea";
import PhoneImage from "../../../../assets/images/Frame 626671.svg";
import ImageUpload from "../../../../component/uploads/file-upload";
import { useNavigate } from "react-router-dom";

function Update1() {
    const navigate = useNavigate();
  return (
    <>
      <div className="border justify-between flex mx-10 rounded-md px-5 py-5">
        <div className=" w-full">
          <Input
            type="text"
            label="Message title"
            placeholder="Enter the title of your message"
            className="w-full"
          />

          <Textarea
            type="text"
            label="Message body"
            placeholder="Enter your message body"
            className="w-full mt-6"
          />

          <ImageUpload />

          <Input
            type="text"
            label="Custom link"
            placeholder="https://"
            className="w-full mt-6"
          />
        </div>
        <img src={PhoneImage} alt="PhoneImage" />
      </div>

      <div className="flex justify-between px-10 mt-8">
        <button className="border w-[84px]  rounded-md"  onClick={() => navigate(-1)}>Back</button>

        <button className="border px-5 py-1 flex gap-3 bg-[#459BDA] text-[#fff] text-[14px] font-semibold rounded-md border-[#459BDA]">
          Continue
        </button>
      </div>
      <br/>
    </>
  );
}

export default Update1;
