import React from "react";
import PhoneImage from "../../../../assets/images/Frame 626671.svg";
import { useNavigate } from "react-router-dom";
import Icon from "../../../../assets/icon";
import { showToast } from "../../../../component/reusables/toast";
import useApi from "../../../../component/hook/request";

function Launch({ data }) {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useApi(
    `/admin/send-update-notification/${data?.data?.data?._id}`,
    "POST",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );
 
  const sendUpdate = async () => {
    const [response] = await makeRequest();
    if (response) {
      showToast(response.message, true, {
        position: "top-center",
      });
      navigate('/updates')
      setTimeout(() => {
        window.location.reload()
      },2000 );
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <h1 className="text-[16px] mx-10 font-semibold text-[#28292C]">
        {" "}
        Review & Launch
      </h1>
      <div className="border justify-between lg:flex mx-10 rounded-md px-5 py-5">
        <section className="flex gap-3">
          <div className="flex w-full gap-3">
            <Icon name="msgIcon" />
            <h1 className="text-[14px] font-semibold text-[#28292C] ">
              Message name{" "}
              <span className="block font-normal">{data?.data?.data?.title}</span>
            </h1>
          </div>
          <div className="flex w-full gap-3">
            <Icon name="msgIcon" />
            <h1 className="text-[14px] font-semibold text-[#28292C] ">
              Message body{" "}
              <span className="block font-normal">{data?.data?.data?.content}</span>
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
          className="border px-5 py-1 flex gap-3 bg-[#459BDA] hover:bg-[#008138] text-[#fff] text-[14px] font-semibold rounded-md border-[#459BDA]"
          type="button"
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
