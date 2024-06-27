import React from "react";
import PhoneImage from "../../../../assets/images/Frame 626671.svg";
import { useNavigate } from "react-router-dom";
import Icon from "../../../../assets/icon";
import useRequest from "../../../../component/hook/use-request";

function Launch({ data }) {
  const navigate = useNavigate();
 
  const sendUpdate = async () => {
      navigate('/updates')
  };

  return (
    <>
      <h1 className="text-[16px] mx-10 font-semibold text-[#28292C]">
        {" "}
        Review & Launch
      </h1>
      <div className="border justify-between lg:flex mx-10 rounded-md px-5 py-5">
        <section className="flex">
          <div className="flex w-full gap-3">
            <Icon name="msgIcon" />
            <h1 className="text-[14px] font-semibold text-[#28292C] ">
              Message name{" "}
              <span className="block font-normal">{data?.data.data.title}</span>
            </h1>
          </div>
          <div className="flex w-full gap-3">
            <Icon name="msgIcon" />
            <h1 className="text-[14px] font-semibold text-[#28292C] ">
              Message body{" "}
              <span className="block font-normal">{data?.data.data.body}</span>
            </h1>
          </div>
        </section>
        <img src={PhoneImage} alt="PhoneImage" />
      </div>

      <div className="flex justify-between px-10 mt-8">
        <button
          className="border w-[84px]  rounded-md"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <button
          className="border px-5 py-1 flex gap-3 bg-[#459BDA] text-[#fff] text-[14px] font-semibold rounded-md border-[#459BDA]"
          onClick={sendUpdate}
        >
          Launch
        </button>
      </div>

      <br />
    </>
  );
}

export default Launch;
