import React from "react";
import Icon from "../../../../assets/icon";
import Push1 from "./push";

function PushNotification() {
  return (
    <>
      <div className="bg-[#459BDA] h-[80px] flex justify-between px-10 py-7">
        <h3 className="text-[16px] font-semibold text-white">Agents</h3>
        <button>
          <Icon name="bellicon" />
        </button>
      </div>

      <div className="flex justify-between w-full px-10 py-14">
        <h1 className="text-[16px] font-semibold text-[#28292C]"> Message details</h1> 
      </div>

      <Push1 />
    </>
  );
}

export default PushNotification;
